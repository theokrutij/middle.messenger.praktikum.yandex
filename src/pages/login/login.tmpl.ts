import { InputField, props as InputFieldProps } from "../../components/InputField/InputField.tmpl";
import { Template } from "../../types";
// import { handleFormSubmission } from "../../modules/formActions";

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

	// const handleSignInClick = (event: MouseEvent) => {
	// 	event.preventDefault();
	// 	goToMain();
	// }; 
	const handleFormSubmission = (event: SubmitEvent) => {
		event.preventDefault();
		let formIsValid = true;
		inputFieldProps.forEach(({id}) => {
			const inputElement = <HTMLInputElement>document.querySelector(`#${id}`);
			const fieldIsValid = inputElement.reportValidity() ;
			if (!fieldIsValid) {
				formIsValid = false;
			}
		});
		if (formIsValid) {
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
		
		(<HTMLInputElement>document.querySelector("#login")).focus();
	};

	const onUnload = () => {
		inputFields.map(([,,onUnload]) => {
			if (onUnload !== undefined) {
				onUnload();
			}
		});

		// const signInButton = <HTMLButtonElement>document.querySelector("#signIn");
		// signInButton.removeEventListener("click", handleSignInClick);

		const signUpButton = <HTMLButtonElement>document.querySelector("#signUp");
		signUpButton.removeEventListener("click", handleSignUpClick);

		const loginForm = <HTMLFormElement>document.querySelector("#loginForm");
		loginForm.removeEventListener("submit", handleFormSubmission);
	};

	return [template, onLoad, onUnload];
};




