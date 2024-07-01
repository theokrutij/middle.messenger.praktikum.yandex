export type props = {
	[key: string]: string | number | boolean | (() => void)
}

export type Template<T extends props> = (
	props: T
) => [string, (() => void)?, (() => void)?];
