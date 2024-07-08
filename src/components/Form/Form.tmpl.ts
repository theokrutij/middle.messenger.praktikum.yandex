import { Block } from "../../modules/Block";
import { DefaultProps } from "../../types";
import { IconButton } from "../IconButton/IconButton.tmpl";
import { InputField } from "../InputField/InputField.tmpl";

import classes from "./Form.module.css";


export type ButtonProps = Omit<DefaultProps, "id"> & {
	id: string,
	events: {
		"click": (event: MouseEvent) => unknown
	}
}



type FormProps = DefaultProps & {
	inputFields: InputField[],
	controls: (Block<ButtonProps> | IconButton)[],
	events: {
		"submit": (event: Event) => unknown
	},
}

export class Form extends Block<FormProps> {
	constructor(props: FormProps) {
		if (props.className === undefined) {
			props.className = classes.form;
		}
		super(props, "form");
	}

	template() {
		const template = 
		`
		<div class=${classes.fields}>
		${this.props.inputFields.map((field) => `<div id=${field.id}></div>`).join("\n")}
		</div>
		<div class=${classes.controls}>
			${this.props.controls.map((control) => `<div id=${control.id}></div>`).join("\n")}
		</div>	
		`;

		return template;
	}

	render() {
		const stubIdsToComponents = {};

		this.props.inputFields.forEach((field) => Object.assign(stubIdsToComponents, {[field.id!]: field}));
		this.props.controls.forEach((control) => Object.assign(stubIdsToComponents, {[control.id!]: control}));
		return this.compile(this.template(), stubIdsToComponents);
	}
};

