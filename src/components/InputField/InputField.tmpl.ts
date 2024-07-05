import { Template } from "../../types";
import classes from "./InputField.module.css";

export type props = {
	label?: string,
	inputType: "text" | "password" | "email" | "tel",
	name: string,
	id: string,
	placeholder: string,
	initialValue?: string, 
	required?: boolean,
	minlength?: number,
	maxlength?: number,
	pattern?: string
}

export const InputField: Template<props> = ({ 
	label,
	inputType, 
	name, 
	id, 
	placeholder, 
	initialValue: initialValue,
	required = false,
	minlength,
	maxlength,
	pattern
}: props) => {
	const template =
		`<div class=${classes["input-field"]} id=${id + "_field"}>
			${label ? `<h6 class=${classes.h6}>` + label + "</h6>" : ""}
			<div class=${classes.outer}>
				<div class=${classes.inner}>
					<input 
						class=${classes.input} 
						type="${inputType}" 
						name="${name}" 
						id="${id}" 
						placeholder="${placeholder}" 
						${required ? "required" : ""}
						${minlength ? "minlength=" + minlength : ""}
						${maxlength ? "maxlength=" + maxlength : ""}
						${pattern ? "pattern=" + pattern : ""}
					/>
					<button class="${classes.button} hidden"" id=${id + "_clear"}><img src="/clear.svg" alt="clearButton"></button>
				</div>
				<span class=${classes["error-message"]} id="${id}_errorMessage"></span>
			</div>
		</div>
		`
		;
	const onload = () => {
		const inputField = <HTMLDivElement>document.querySelector(`#${id}_field`);
		const inputElement = <HTMLInputElement>document.querySelector(`#${id}`);
		const errorMessage = <HTMLSpanElement>document.querySelector(`#${id}_errorMessage`);

		if (initialValue !== undefined) {
			inputElement.value = initialValue;
		}

		inputElement.addEventListener(
			"invalid", 
			(event) => {
				event.preventDefault();

				errorMessage.textContent = inputElement.validationMessage;	
				inputField.classList.add(`${classes.invalid}`);				
			}
		);
		inputElement.addEventListener(
			"blur", () => {
				inputField.classList.remove(`${classes.invalid}`);
				errorMessage.textContent = "";
				inputElement.reportValidity();
			}
		);
	};

	return [template, onload];
};
