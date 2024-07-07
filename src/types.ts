export type DefaultProps = {
	events?: {
		[key: string]: (<T extends Event>(event: T) => unknown);
	},
	id?: string,
	className?: string,
	textContent?: string
}

export type User = {
	username: string,
	firstName: string,
	secondName: string,
	displayName: string | null,
	email: string,
	phone: string,
	avatarUrl: string | null
}
