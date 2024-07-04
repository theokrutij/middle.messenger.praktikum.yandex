export type props = {
	[key: string]: string | number | boolean | (() => void) | props | props[] | null
} | null

export type Template<T extends props = null> = (
	props: T
) => [string, (() => void)?, (() => void)?];

export type User = {
	username: string,
	firstName: string,
	secondName: string,
	displayName: string | null,
	email: string,
	phone: string,
	avatarUrl: string | null
}
