import { InputField, props as InputFieldProps } from "../../components/InputField/InputField.tmpl";
import { printFormData, validateFields } from "../../modules/formActions";
import { Template } from "../../types";

import classes from "./login.module.css";


type loginPageProps = {
	goToSignUp: () => void,
	goToMain: () => void
}

export const LoginPage: Template<loginPageProps> = ({
	goToSignUp,
	goToMain
}: loginPageProps) =>  {
	const inputFieldProps: InputFieldProps[] = [
		{
				label: "Login", 
				inputType: "text", 
				name: "login", 
				id: "login", 
				placeholder: "Enter your login...",
				minlength: 3,
				maxlength: 20,
				pattern: "^[a-zA-Z0-9_\\-]*[a-zA-Z]+[a-zA-Z0-9_\\-]*$",
				required: true
		},
		{
				label: "Password", 
				inputType: "password", 
				name: "password", 
				id: "password", 
				placeholder: "Enter your password...",
				minlength: 8,
				maxlength: 40,
				pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
				required: true
		}
	];
	const inputFields = inputFieldProps.map(props => InputField(props));

	const template = 
		`
		<main class=${classes["login-page"]}>
			<h1>Welcome to Chat Noir!</h1>
			<form class=${classes.form} id="loginForm">
				<div class=${classes.fields}>
					${(inputFields.map(([template]) => template)).join("\n")}
				</div>
				<div class=${classes.controls}>
					<button type="submit" class=${classes.button} id="signIn">Sign in</button>
					<button class=${classes.button} id="signUp">Create account</button>
				</div>
			</form>
		</main>
		`
	;

	const handleFormSubmission = (event: SubmitEvent) => {
		event.preventDefault();
		
		if (validateFields(inputFieldProps.map(({id}) => id))) {
			printFormData(event.target as HTMLFormElement);
			goToMain();
		}

	};
	const handleSignUpClick = (event: MouseEvent) => {
		event.preventDefault();
		goToSignUp();
	};



	const onLoad = () => {
		inputFields.map(([,onLoad]) => {
			if (onLoad !== undefined) {
				onLoad();
			}
		});
		
		const signUpButton = <HTMLButtonElement>document.querySelector("#signUp");
		signUpButton.addEventListener("click", handleSignUpClick);

		const loginForm = <HTMLFormElement>document.querySelector("#loginForm");
		loginForm.addEventListener("submit", handleFormSubmission);
		
	};

	const onUnload = () => {
		inputFields.map(([,,onUnload]) => {
			if (onUnload !== undefined) {
				onUnload();
			}
		});

		const signUpButton = <HTMLButtonElement>document.querySelector("#signUp");
		signUpButton.removeEventListener("click", handleSignUpClick);

		const loginForm = <HTMLFormElement>document.querySelector("#loginForm");
		loginForm.removeEventListener("submit", handleFormSubmission);
	};

	return [template, onLoad, onUnload];
};




