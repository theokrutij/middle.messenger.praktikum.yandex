import { Block } from "../../modules/Block";
import { props } from "../../types";
// import { Template } from "../../types";
import classes from "./InputField.module.css";


type InputProps = props & {
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

// export const InputField: Template<InputFieldProps> = ({ 
// 	label,
// 	inputType, 
// 	name, 
// 	id, 
// 	placeholder, 
// 	initialValue: initialValue,
// 	required = false,
// 	minlength,
// 	maxlength,
// 	pattern
// }: InputFieldProps) => {
// 	const template =
// 		`<div class=${classes["input-field"]} id=${id + "_field"}>
// 			${label ? `<h6 class=${classes.h6}>` + label + "</h6>" : ""}
// 			<div class=${classes.outer}>
// 				<div class=${classes.inner}>
// 					<input 
// 						class=${classes.input} 
// 						type="${inputType}" 
// 						name="${name}" 
// 						id="${id}" 
// 						placeholder="${placeholder}" 
// 						${required ? "required" : ""}
// 						${minlength ? "minlength=" + minlength : ""}
// 						${maxlength ? "maxlength=" + maxlength : ""}
// 						${pattern ? "pattern=" + pattern : ""}
// 					/>
// 					<button class="${classes.button} hidden"" id=${id + "_clear"}><img src="/clear.svg" alt="clearButton"></button>
// 				</div>
// 				<span class=${classes["error-message"]} id="${id}_errorMessage"></span>
// 			</div>
// 		</div>
// 		`
// 		;
// 	const onload = () => {
// 		const inputField = <HTMLDivElement>document.querySelector(`#${id}_field`);
// 		const inputElement = <HTMLInputElement>document.querySelector(`#${id}`);
// 		const errorMessage = <HTMLSpanElement>document.querySelector(`#${id}_errorMessage`);

// 		if (initialValue !== undefined) {
// 			inputElement.value = initialValue;
// 		}

// 		inputElement.addEventListener(
// 			"invalid", 
// 			(event) => {
// 				event.preventDefault();

// 				errorMessage.textContent = inputElement.validationMessage;	
// 				inputField.classList.add(`${classes.invalid}`);				
// 			}
// 		);
// 		inputElement.addEventListener(
// 			"blur", () => {
// 				inputField.classList.remove(`${classes.invalid}`);
// 				errorMessage.textContent = "";
// 				inputElement.reportValidity();
// 			}
// 		);
// 	};

// 	return [template, onload];
// };


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
	}
};
