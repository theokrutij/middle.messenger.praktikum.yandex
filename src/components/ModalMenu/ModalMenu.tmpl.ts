import { Template } from "../../types";
import { hideModal } from "../../utils";

import classes from "./ModalMenu.module.css";


type MenuOption = {
	title: string,
	action: () => void,
	critical?: boolean
}
type props = {
	options: MenuOption[]
}

export const ModalMenu: Template<props> = ({options}: props) => {
	const template = 
	`
	<div class=${classes.menu}>
	${options.map(
		(option) => 
			`<button 
				class="${classes.option} ${option.critical ? classes.critical : ""}"
				id="${option.title.replace(/\s/g, '')}_button"
			>
				${option.title}
			</button>`
	).join("\n")}
	</div>
	`
	;

	const onLoad = () => {
		options.forEach(
			(option) => {
				const button = <HTMLButtonElement>document.querySelector(`#${option.title.replace(/\s/g, '')}_button`);
				button.addEventListener("click", 
					() => {
						option.action();
						hideModal(onUnload);
				});
			}
		);

	};
	const onUnload = () => {
		options.forEach(
			(option) => {
				const button = <HTMLButtonElement>document.querySelector(`#${option.title.replace(/\s/g, '')}_button`);
				button.removeEventListener("click", option.action);
			}
		);

	};
	return [template, onLoad, onUnload];
};
