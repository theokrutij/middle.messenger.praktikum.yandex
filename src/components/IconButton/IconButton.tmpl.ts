import { Block } from "../../modules/Block";
import { DefaultProps} from "../../types";

import classes from "./IconButton.module.css";

type IconButtonProps = DefaultProps & {
	url: string;
	alt: string;
	iconClassName?: string;
};
export class IconButton extends Block<IconButtonProps> {
	constructor(props: IconButtonProps) {
		super({...props, className: classes["icon-button"]}, "button");
	}

	template() {
		const template = `
		<img 
			src="${this.props.url}" 
			alt="${this.props.alt}"
			class=${this.props.iconClassName}
		>
		`;

		return template;
	}

	render() {
		return this.compile(this.template());
	}
}
