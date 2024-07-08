import { Block } from "../../modules/Block";
import { DefaultProps } from "../../types";
import classes from "./InputField.module.css";


type InputProps = DefaultProps & {
	inputType: "text" | "password" | "email" | "tel",
	name: string,
	id: string,
	placeholder: string,
	initialValue?: string, 
	required?: boolean,
	minlength?: number,
	maxlength?: number,
	pattern?: string,
}

export type InputFieldProps = InputProps & {
	label?: string,	
}


export class InputField extends Block<InputFieldProps> {
	constructor(props: InputFieldProps) {
		super(props);
	}

	template() {
		const template =
		`<div class=${classes["input-field"]} id=${this.props.id + "_field"}>
			${this.props.label ? `<h6 class=${classes.h6}>` + this.props.label + "</h6>" : ""}
			<div class=${classes.outer}>
				<div class=${classes.inner}>
					<div id="input"></div>
					<button class="${classes.button} hidden"" id=${this.props.id + "_clear"}><img src="/clear.svg" alt="clearButton"></button>
				</div>
				<span class=${classes["error-message"]} id="${this.props.id}_errorMessage"></span>
			</div>
		</div>
		`;

		return template;
	}

	render() {
		const inputElement = new Input({
			...this.props,
			className: classes.input,
			events: {
				"invalid": (event: Event) => {
					event.preventDefault();
					
					const errorMessage = <HTMLSpanElement>document.querySelector(`#${this.props.id}_errorMessage`);
					errorMessage.textContent = (<HTMLInputElement>event.target).validationMessage;	
					this.getContent().classList.add(`${classes.invalid}`);				
				},
				"blur": (event: Event) => {
					this.getContent().classList.remove(`${classes.invalid}`);	
					const errorMessage = <HTMLSpanElement>document.querySelector(`#${this.props.id}_errorMessage`);
					errorMessage.textContent = "";

					(<HTMLInputElement>event.target).reportValidity();
				}
			}
		});

		return this.compile(this.template(), {"input": inputElement});
	}

	validate() {
		const inputElement = <HTMLInputElement>this.getContent().querySelector("input");
		return inputElement.reportValidity();
	}
};


class Input extends Block<InputProps> {
	constructor(props: InputProps) {
		super(props, "input");

		const elem = <HTMLInputElement>this.getContent();
		elem.type = this.props.inputType;
		elem.name = this.props.name;
		elem.id = this.props.id + "_input";
		elem.placeholder = this.props.placeholder;

		if (this.props.required !== undefined) {
			elem.required = this.props.required;
		}
		if (this.props.minlength !== undefined) {
			elem.minLength = this.props.minlength;
		}
		if (this.props.maxlength !== undefined) {
			elem.maxLength = this.props.maxlength;
		}
		if (this.props.pattern !== undefined) {
			elem.pattern = this.props.pattern;
		}
		if (this.props.initialValue !== undefined) {
			elem.value = this.props.initialValue;
		}
	}
};
