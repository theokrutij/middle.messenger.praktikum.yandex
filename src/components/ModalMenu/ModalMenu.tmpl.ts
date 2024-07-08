import { Block } from "../../modules/Block";
import { hideModal } from "../../utils";
import { DefaultProps } from "../../types";

import classes from "./ModalMenu.module.css";


type MenuOption = {
	title: string,
	action: () => void,
	critical?: boolean
}
type props = DefaultProps & {
	options: MenuOption[]
}


export class ModalMenu extends Block<props> {
	constructor(props: props) {
		super(props);
	}

	
	template() {
		const template = 
		`
		<div class=${classes.menu}>
		${this.props.options.map(({title}) => `<div id=${this._optionTitleToStubId(title)}></div>`).join("\n")}
		</div>
		`;
		return template;
	}

	render() {
		const stubIdToOption = this.props.options.reduce((acc, option: MenuOption) => {
			const stubId = this._optionTitleToStubId(option.title);
			acc[stubId] = new Block({
				textContent: option.title,
				className: `${classes.option} ${option.critical ? " " + classes.critical : ""}`,
				events: {
					"click": () => {
						hideModal();
						option.action();
					}
				}
			}, "button");
			return acc;

		}, {} as {[key: string]: Block<{events: {"click": () => void}}>});
		return this.compile(this.template(), stubIdToOption);
	}

	private _optionTitleToStubId(title: string) {
		return title.replace(/\s/g, '') + "_button";
	}
};
