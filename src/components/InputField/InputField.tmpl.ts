import { Template } from "../../types";
import classes from "./InputField.module.css"


type props = {
	label: string,
	inputType: "text" | "password" | "email" | "phone",
	name: string,
	id: string,
	placeholder: string,
	required?: boolean
}

export const InputField: Template<props> = ({label, inputType, name, id, placeholder, required=false}: props)  => {
	const template = 		
		`<div class=${classes.inputField} id=${id + "_field"}>
			<h6>${label}</h6>
			<div class=${classes.inner}>
				<input  
					type="${inputType}" 
					name="${name}" 
					id="${id}" 
					placeholder="${placeholder}" 
					${required ? "required": ""}
				/>
				<button class="hidden" id=${id + "_clear"}><img src="/clear.svg" alt="clearButton"></button>
			</div>
		</div>
		`
	;
	const onload = () => {};

	return [template, onload];
}
