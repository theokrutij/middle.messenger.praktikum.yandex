import { InputField } from "../../components/InputField/InputField.tmpl";
import { Template } from "../../types";

import classes from "./login.module.css";


type loginPageProps = {
	goToMain: () => void,
	goToSignUp: () => void
}

export const LoginPage: Template<loginPageProps> = ({goToMain, goToSignUp}: loginPageProps) =>  {
	const inputFields = [
		InputField({
				label: "Login", 
				inputType: "text", 
				name: "login", 
				id: "login", 
				placeholder: "Enter your login..."
		}),
		InputField({
				label: "Password", 
				inputType: "password", 
				name: "password", 
				id: "password", 
				placeholder: "Enter your password..."
		})
	];

	const template = 
		`
		<main class=${classes["login-page"]}>
			<h1>Welcome to Chat Noir!</h1>
			<form class=${classes.form} action="submit">
				<div class=${classes.fields}>
					${(inputFields.map(([template]) => template)).join("\n")}
				</div>
				<div class=${classes.controls}>
					<button class=${classes.button} id="signIn">Sign in</button>
					<button class=${classes.button} id="signUp">Create account</button>
				</div>
			</form>
		</main>
		`
	;

	const handleSignInClick = (event: MouseEvent) => {
		event.preventDefault();
		goToMain();
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

		const signInButton = <HTMLButtonElement>document.querySelector("#signIn");
		signInButton.addEventListener("click", handleSignInClick);
		
		const signUpButton = <HTMLButtonElement>document.querySelector("#signUp");
		signUpButton.addEventListener("click", handleSignUpClick);
		
		(<HTMLInputElement>document.querySelector("#login")).focus();
	};

	const onUnload = () => {
		inputFields.map(([,,onUnload]) => {
			if (onUnload !== undefined) {
				onUnload();
			}
		});

		const signInButton = <HTMLButtonElement>document.querySelector("#signIn");
		signInButton.removeEventListener("click", handleSignInClick);

		const signUpButton = <HTMLButtonElement>document.querySelector("#signUp");
		signUpButton.removeEventListener("click", handleSignUpClick);
	};

	return [template, onLoad, onUnload];
};




