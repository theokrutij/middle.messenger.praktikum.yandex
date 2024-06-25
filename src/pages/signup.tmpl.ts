import { InputField } from "../components/InputField.tmpl"
import { Template } from "../types";


export const SignupPage: Template = () => {
	const inputFields = [
		InputField({inputType: "text", name: "first_name", id: "first_name"}),
		InputField({inputType: "text", name: "last_name", id: "last_name"}),
		InputField({inputType: "email", name: "email", id: "email"}),
		InputField({inputType: "phone", name: "phone", id: "phone"}),
	];

	const template = 
		`
		<div>
			<h1>Create new profile</h1>
			<form action="submit">
				${inputFields.map(([template]) => template).join("\n")}
				<button>Continue</button>
				<button>Return to sign in</button>
			</form>
		</div>
		`
	;
	const onload = () => {
		inputFields.map(([,onload]) => onload());
	};

	return [template, onload];
}