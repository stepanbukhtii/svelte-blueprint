# CLAUDE.md

## Stack

- **SvelteKit 5** — framework (SSR disabled, prerender off)
- **Svelte 5** — reactive UI with runes (`$state`, `$derived`, `$effect`, `$props`)
- **TypeScript** — strict mode, bundler module resolution
- **Tailwind CSS 4** — via Vite plugin
- **TanStack Svelte Query 5** — server state (queries, mutations, caching)
- **Axios** — HTTP client with interceptors
- **Zod** — schema validation at API boundaries

## Architecture: Feature-Sliced Design

```
src/
├── routes/                  # SvelteKit pages + API routes
└── lib/
    ├── shared/              # Cross-feature primitives
    │   ├── api/             # HTTP client, error types, response wrappers
    │   ├── config/          # Environment variables
    │   ├── lib/             # Pure utilities (no UI, no state)
    │   ├── provider/        # Context providers (wrap 3rd-party)
    │   └── ui/              # Generic, stateless UI components
    └── features/            # One folder per domain feature
        └── <feature>/
            ├── api/         # types · mapper · queries/mutations
            ├── model/       # state classes + domain types + schemas
            └── ui/          # feature components (.svelte)
```

Import direction is strictly top-down: `routes` → `features` → `shared`. A layer must never import from a layer above it.

Each feature exposes a public API through `index.ts`. Internal files (model classes, api hooks, mappers) are not imported directly from outside the feature — only what `index.ts` re-exports.

## Model Layer

Models are **classes** in `.svelte.ts` files.

```ts
class FeatureModel {
    field = $state<Type>(initial)
    isPending = $state(false)
    isError = $state(false)
    errorMessage = $state<string | undefined>()

    private mutation = createSomeMutation()

    constructor(initial?: Type) {
        if (initial) this.field = initial

        $effect(() => {
            this.isPending = this.mutation.isPending
            this.isError = this.mutation.isError
            this.errorMessage = this.mutation.error?.message
        })
    }

    async handleSubmit(onSuccess?: () => void) {
        await this.mutation.mutateAsync(this.field)
        onSuccess?.()
    }
}
```

- Use `$state` class fields for reactive state — never `writable()` stores
- Use `$derived` class fields for computed values
- Use `$effect` inside the class to sync mutation/query state (isPending, isError, etc.) into local fields
- Never use factory functions returning getter/setter objects
- One class per concern (form state, detail view state, delete confirmation, etc.)
- Domain types live in `model/types.ts`; Zod validation schemas live in `model/schemas.ts`
- Domain types include an `EmptyEntity` constant (zero-value object) for initializing new forms

### Instantiating models in components

Wrap model construction in `untrack()` to prevent re-instantiation when props change reactively:

```svelte
<script lang="ts">
    import { untrack } from 'svelte'

    let { entity } = $props()

    const model = untrack(() => new FeatureModel(entity))
</script>
```

### Feature-level singletons (context pattern)

For state that must be shared across a subtree (e.g., session state), use `setContext`/`getContext` with a `Symbol` key. Expose two functions from the model file — one to initialize, one to read:

```ts
const FEATURE_KEY = Symbol('feature')

class FeatureSession {
    value = $state<string | null>(null)
    // ...
}

export function initFeature() {
    return setContext(FEATURE_KEY, new FeatureSession())
}

export function useFeature() {
    return getContext<FeatureSession>(FEATURE_KEY)
}
```

Call `initFeature()` once in the layout or parent component. Call `useFeature()` anywhere in the subtree that needs it.

## API Layer

Each feature's `api/` folder has exactly three files:

| File        | Responsibility                                                           |
| ----------- | ------------------------------------------------------------------------ |
| `types.ts`  | Raw API shapes (request & response) — snake_case field names             |
| `mapper.ts` | Transforms API ↔ domain: snake_case → camelCase, normalization, trimming |
| `api.ts`    | TanStack Query hooks — `createQuery`, `createMutation`, query key factories |

Rules:

- Domain types (used in the app) live in `model/types.ts`, not in the API layer
- Mappers are pure functions — no side effects, no imports from `$app`
- Query keys follow a factory pattern:
  ```ts
  const featureKeys = {
      all: () => ['feature'] as const,
      list: (params?: Params) => ['feature', 'list', params] as const,
      detail: (id: string) => ['feature', 'detail', id] as const
  }
  ```
- Use the `select` option in `createQuery` to run the mapper inline — do not call mappers outside the query hook:
  ```ts
  createQuery(() => ({
      queryKey: featureKeys.detail(id),
      queryFn: () => httpClient.get<ApiResponse<RawType>>(`/endpoint/${id}`).then(r => r.data),
      select: (response) => mapEntity(response.data)
  }))
  ```
- Mutations that modify a list invalidate the parent query key (`featureKeys.all()`) in `onSuccess`
- Mutations that modify a single item use optimistic updates: cancel in-flight queries, snapshot previous data, apply the update, roll back in `onError`, and revalidate in `onSettled`

## HTTP Client (`shared/api/base.ts`)

- Single Axios instance exported from `shared/api`
- Request interceptor: attach Authorization header from localStorage
- Response interceptor: handle 401 → redirect to login
- Errors thrown as a typed `ApiError` class (with `status: number`), not raw Axios errors
- API responses are wrapped in a shared `ApiResponse<T>` type: `{ status, data, error?, meta? }`

## Svelte 5 Component Conventions

```svelte
<script lang="ts">
    import type { Snippet } from 'svelte'

    interface Props {
        value: string
        class?: string
        children?: Snippet
        onchange?: (v: string) => void
    }

    let { value = $bindable(), class: className, children, onchange }: Props = $props()
</script>
```

- Always declare a typed `Props` interface
- Use `$bindable()` for two-way bound props
- Use `Snippet` type for slot-like content
- Spread extra attributes onto the root element when building shared UI primitives
- Use `cn()` (from `shared/lib`) to merge Tailwind classes with consumer overrides

### Shared UI component pattern

Shared UI components accept a `variant` and/or `size` prop resolved via a lookup object, never a chain of conditionals:

```ts
const variants = {
    primary: 'bg-… text-…',
    secondary: 'bg-… text-…',
    danger: 'bg-… text-…'
}
const sizes = { sm: 'px-… py-…', md: 'px-… py-…' }
```

## Route pages

Route pages (`+page.svelte`) are thin: they receive `data` from `+page.ts` and pass it directly as props to a feature component. Business logic and query calls belong in the feature layer, not in routes.

```svelte
<!-- +page.svelte -->
<script lang="ts">
    import { FeatureView } from '$lib/features/feature'
    let { data } = $props()
</script>

<FeatureView id={data.id} />
```

## Styling

- Tailwind utility classes only — no CSS modules, no scoped `<style>` blocks (unless a CSS variable is unavoidable)
- Class merging via `cn()` = `clsx` + `tailwind-merge`
- Color tokens: primary = indigo-600, danger = red-600, success = green-\*, muted = gray-400/500
- Typography default: gray-900 foreground, antialiased, border-box sizing

## Formatting & Linting

`.prettierrc` rules (enforced, do not override):

- Indentation: **tabs** (width 4)
- Quotes: **single**
- Trailing commas: **none**
- Print width: **120**
- Plugins: `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`

ESLint:

- `typescript-eslint` with type-aware rules enabled
- `eslint-plugin-svelte` (prettier variant)
- Unused variables are allowed when prefixed with `_`

Run before committing:

```
npm run format   # auto-fix
npm run lint     # check
npm run check    # tsc + svelte-check
```

## File & Naming Conventions

| Thing               | Convention             |
| ------------------- | ---------------------- |
| Svelte components   | `PascalCase.svelte`    |
| State classes       | `PascalCase.svelte.ts` |
| Pure TS modules     | `camelCase.ts`         |
| API response fields | `snake_case`           |
| App domain fields   | `camelCase`            |
| Route params        | `[paramName]`          |

## Rules to Always Follow

1. **No factory functions for state** — use classes with `$state` fields.
2. **Mapper at the boundary** — API data must pass through a mapper before entering the app; never use raw API types in components or models.
3. **Server state via TanStack Query** — do not manage fetched data in `$state` manually; use `createQuery`/`createMutation`.
4. **Import direction** — never import from a higher layer; `shared` must not import from `features`.
5. **Feature public API via index.ts** — outside code imports only from the feature's `index.ts`, never from internal paths.
6. **`untrack()` on model construction** — always wrap `new ModelClass(...)` in `untrack()` inside components.
7. **`select` for mapping** — run the mapper in the query's `select` option, not in the component or model.
8. **No comments explaining what code does** — only add a comment when the _why_ is non-obvious (hidden constraint, workaround, invariant). Self-documenting names preferred.
9. **No unnecessary abstractions** — implement only what the current task requires; no speculative generalization.
