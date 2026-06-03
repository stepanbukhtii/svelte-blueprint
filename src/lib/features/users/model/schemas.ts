import { z } from 'zod';

const baseUserSchema = z.object({
	name: z.string().min(1, 'Required'),
	username: z
		.string()
		.min(2, 'At least 2 characters')
		.regex(/^[a-z0-9_]+$/, 'Lowercase letters, numbers and underscores only'),
	publicName: z.string(),
	userType: z.string(),
	description: z.string(),
	age: z.number().int('Must be a whole number').min(0, 'Cannot be negative').max(150, 'Max 150'),
	initialAge: z.number().int('Must be a whole number').min(0, 'Cannot be negative').max(150, 'Max 150'),
	rate: z.number().min(0, 'Cannot be negative'),
	lastRate: z.number().min(0, 'Cannot be negative'),
	balance: z.number(),
	lockBalance: z.number(),
	isActive: z.boolean(),
	readMessage: z.boolean()
});

export const createUserSchema = baseUserSchema.extend({
	password: z.string().min(6, 'At least 6 characters')
});

export const editUserSchema = baseUserSchema.extend({
	password: z.union([z.string().min(6, 'At least 6 characters'), z.literal('')])
});

export type UserFormErrors = Partial<Record<string, string>>;
