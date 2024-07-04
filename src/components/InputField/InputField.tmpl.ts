import { Template } from "../../types";
import classes from "./InputField.module.css";


export type props = {
	label?: string,
	inputType: "text" | "password" | "email" | "phone",
	name: string,
	id: string,
	placeholder: string,
	initialValue?: string, 
	required?: boolean
}

export const InputField: Template<props> = ({ 
	label,
	inputType, 
	name, 
	id, 
	placeholder, 
	initialValue: initialValue,
	required = false 
}: props) => {
	const template =
		`<div class=${classes["input-field"]} id=${id + "_field"}>
			${label ? `<h6 class=${classes.h6}>` + label + "</h6>" : ""}
			<div class=${classes.inner}>
				<input 
					class=${classes.input} 
					type="${inputType}" 
					name="${name}" 
					id="${id}" 
					placeholder="${placeholder}" 
					${required ? "required" : ""}
				/>
				<button class="${classes.button} hidden"" id=${id + "_clear"}><img src="/clear.svg" alt="clearButton"></button>
			</div>
		</div>
		`
		;
	const onload = () => {
		const inputElement = <HTMLInputElement>document.querySelector(`#${id}`);
		if (initialValue !== undefined) {
			inputElement.value = initialValue;
		}
	};

	return [template, onload];
};
