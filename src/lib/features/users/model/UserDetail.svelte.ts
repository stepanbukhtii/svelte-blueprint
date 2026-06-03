export class UserDetailModel {
	mode = $state<'view' | 'edit'>('view');

	setMode(m: 'view' | 'edit') {
		this.mode = m;
	}
}
