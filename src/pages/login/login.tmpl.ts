import { InputField } from "../../components/InputField/InputField.tmpl";
import { Block } from "../../modules/Block";
import { printFormData } from "../../modules/formActions";
import { DefaultProps } from "../../types";
// import { Template } from "../../types";

import classes from "./login.module.css";


type LoginPageProps = DefaultProps & {
	goToSignUp: () => void,
	goToMain: () => void
}

// export const LoginPage: Template<loginPageProps> = ({
// 	goToSignUp,
// 	goToMain
// }: loginPageProps) =>  {
// 	const inputFieldProps: InputFieldProps[] = [
// 		{
// 				label: "Login", 
// 				inputType: "text", 
// 				name: "login", 
// 				id: "login", 
// 				placeholder: "Enter your login...",
// 				minlength: 3,
// 				maxlength: 20,
// 				pattern: "^[a-zA-Z0-9_\\-]*[a-zA-Z]+[a-zA-Z0-9_\\-]*$",
// 				required: true
// 		},
// 		{
// 				label: "Password", 
// 				inputType: "password", 
// 				name: "password", 
// 				id: "password", 
// 				placeholder: "Enter your password...",
// 				minlength: 8,
// 				maxlength: 40,
// 				pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
// 				required: true
// 		}
// 	];
// 	const inputFields = inputFieldProps.map(props => InputField(props));

// 	const template = 
// 		`
// 		<main class=${classes["login-page"]}>
// 			<h1>Welcome to Chat Noir!</h1>
// 			<form class=${classes.form} id="loginForm">
// 				<div class=${classes.fields}>
// 					${(inputFields.map(([template]) => template)).join("\n")}
// 				</div>
// 				<div class=${classes.controls}>
// 					<button type="submit" class=${classes.button} id="signIn">Sign in</button>
// 					<button class=${classes.button} id="signUp">Create account</button>
// 				</div>
// 			</form>
// 		</main>
// 		`
// 	;

// 	const handleFormSubmission = (event: SubmitEvent) => {
// 		event.preventDefault();
		
// 		if (validateFields(inputFieldProps.map(({id}) => id))) {
// 			printFormData(event.target as HTMLFormElement);
// 			goToMain();
// 		}

// 	};
// 	const handleSignUpClick = (event: MouseEvent) => {
// 		event.preventDefault();
// 		goToSignUp();
// 	};



// 	const onLoad = () => {
// 		inputFields.map(([,onLoad]) => {
// 			if (onLoad !== undefined) {
// 				onLoad();
// 			}
// 		});
		
// 		const signUpButton = <HTMLButtonElement>document.querySelector("#signUp");
// 		signUpButton.addEventListener("click", handleSignUpClick);

// 		const loginForm = <HTMLFormElement>document.querySelector("#loginForm");
// 		loginForm.addEventListener("submit", handleFormSubmission);
		
// 	};

// 	const onUnload = () => {
// 		inputFields.map(([,,onUnload]) => {
// 			if (onUnload !== undefined) {
// 				onUnload();
// 			}
// 		});

// 		const signUpButton = <HTMLButtonElement>document.querySelector("#signUp");
// 		signUpButton.removeEventListener("click", handleSignUpClick);

// 		const loginForm = <HTMLFormElement>document.querySelector("#loginForm");
// 		loginForm.removeEventListener("submit", handleFormSubmission);
// 	};

// 	return [template, onLoad, onUnload];
// };


export class LoginPage extends Block<LoginPageProps> {
	constructor(props: LoginPageProps) {
		super(props, "main");
	}

	template() {
		const template = 
		`
		<main class=${classes["login-page"]}>
			<h1>Welcome to Chat Noir!</h1>
			<form class=${classes.form} id="loginForm">
				<div class=${classes.fields}>
					<div id="loginField"></div>
					<div id="passwordField"></div>
				</div>
				<div class=${classes.controls}>
					<div id="loginButton"></div>
					<div id="signUpButton"></div>
				</div>
			</form>
		</main>
		`;
		return template;
	}

	render() {
		const loginField = new InputField({
			label: "Login", 
			inputType: "text", 
			name: "login", 
			id: "login", 
			placeholder: "Enter your login...",
			minlength: 3,
			maxlength: 20,
			pattern: "^[a-zA-Z0-9_\\-]*[a-zA-Z]+[a-zA-Z0-9_\\-]*$",
			required: true
		});
		const passwordField = new InputField({
			label: "Password", 
			inputType: "password", 
			name: "password", 
			id: "password", 
			placeholder: "Enter your password...",
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
			required: true
		});

		const loginButton = new Block({
			textContent: "Sign in",
			className: classes.button,
			events: {
				"click": (event: Event) => {
			 		if (loginField.validate() && passwordField.validate()) {
						event.preventDefault();
						const loginForm = <HTMLFormElement>document.querySelector("#loginForm");
						printFormData(loginForm as HTMLFormElement);
						this.props.goToMain();
					}
				},
			}
		}, "button");

		const signUpButton = new Block({
			textContent: "Create account",
			className: classes.button,
			events: {
				"click": (event: Event) => {
					event.preventDefault();
					this.props.goToSignUp();
				}
			}
		}, "button");

		return this.compile(
			this.template(), 
			{
				"loginField": loginField, 
				"passwordField": passwordField, 
				"loginButton": loginButton,
				"signUpButton": signUpButton,
			});
	}
};
