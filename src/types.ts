import { Block } from "./modules/Block";

type miscProps = {
	[key: string]: string | number | boolean | (() => void) | props | props[] | null | Block<props>
};

export type props = miscProps & {
	events?: {
		[key: string]: (event: Event) => unknown;
	},
	id?: string,
	className?: string,
	textContent?: string
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
