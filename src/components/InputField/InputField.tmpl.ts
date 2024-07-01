import { Template } from "../../types";
import classes from "./InputField.module.css"


type props = {
	inputType: "text" | "password" | "email" | "phone",
	name: string,
	id: string

}

export const InputField: Template<props> = ({label, inputType, name, id, placeholder, required=false}: props)  => {
	const clearButtonId = id + "_clear";
	const template = 		
		`
		<input type=${inputType} name=${name} id=${id}>
		`
	;
	const onload = () => {};

	return [template, onload];
}