import { Block } from "./modules/Block";

type NamedProps = {
	events?: {
		[key: string]: (<T extends Event>(event: T) => unknown);
	},
	id?: string,
	className?: string,
	textContent?: string
}

export type props = NamedProps & {
	[key: string]: string | number | boolean | ((event: Event | MouseEvent) => void) | props | props[] | null | Block<props>
}

export type Template<T extends props> = (
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
