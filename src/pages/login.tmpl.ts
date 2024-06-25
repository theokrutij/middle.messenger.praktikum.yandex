import { InputField } from "../components/InputField.tmpl"
import { Template } from "../types";


export const LoginPage: Template = () =>  {
	const inputFields = [
		InputField({inputType: "text", name: "login", id: "loginField"}),
		InputField({inputType: "password", name: "password", id: "passwordField"})
	];

	const template = 
		`
		<div>
			<h1>Welcome to Chat Noir!</h1>
			<form action="submit">
				${(inputFields.map(([template]) => template)).join("\n")}
				<button>Sign in</button>
				<button>Create account</button>
			</form>
		</div>
		`
	;

	const onLoad = () => {
		inputFields.map(([,onload]) => onload());
		(<HTMLInputElement>document.querySelector("#loginField")).focus()
	};

	return [template, onLoad];
}




