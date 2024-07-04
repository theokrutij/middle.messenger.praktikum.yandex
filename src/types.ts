export type props = {
	[key: string]: string | number | boolean | (() => void) | props | props[] | null
} | null

export type Template<T extends props = null> = (
	props: T
) => [string, (() => void)?, (() => void)?];

export type User = {
	username: string,
	first_name: string,
	second_name: string,
	display_name: string | null,
	email: string,
	phone: string,
	avatar_url: string | null
}
