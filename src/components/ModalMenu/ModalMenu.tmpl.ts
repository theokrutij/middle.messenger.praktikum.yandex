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

// export const ModalMenu: Template<props> = ({options}: props) => {
// 	const template = 
// 	`
// 	<div class=${classes.menu}>
// 	${options.map(
// 		(option) => 
// 			`<button 
// 				class="${classes.option} ${option.critical ? classes.critical : ""}"
// 				id="${option.title.replace(/\s/g, '')}_button"
// 			>
// 				${option.title}
// 			</button>`
// 	).join("\n")}
// 	</div>
// 	`
// 	;

// 	const onLoad = () => {
// 		options.forEach(
// 			(option) => {
// 				const button = <HTMLButtonElement>document.querySelector(`#${option.title.replace(/\s/g, '')}_button`);
// 				button.addEventListener("click", 
// 					() => {
// 						option.action();
// 						hideModal(onUnload);
// 				});
// 			}
// 		);

// 	};
// 	const onUnload = () => {
// 		options.forEach(
// 			(option) => {
// 				const button = <HTMLButtonElement>document.querySelector(`#${option.title.replace(/\s/g, '')}_button`);
// 				button.removeEventListener("click", option.action);
// 			}
// 		);

// 	};
// 	return [template, onLoad, onUnload];
// };


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
