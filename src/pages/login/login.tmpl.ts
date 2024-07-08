import { ButtonProps, Form } from "../../components/Form/Form.tmpl";
import { InputField } from "../../components/InputField/InputField.tmpl";
import { Block } from "../../modules/Block";
import { printFormData } from "../../modules/formActions";
import { DefaultProps } from "../../types";

import classes from "./login.module.css";
import formClasses from "../../components/Form/Form.module.css";


type LoginPageProps = DefaultProps & {
	goToSignUp: () => void,
	goToMain: () => void
}


export class LoginPage extends Block<LoginPageProps> {
	constructor(props: LoginPageProps) {
		super(props, "main");
	}

	template() {
		const template = 
		`
		<main class=${classes["login-page"]}>
			<h1>Welcome to Chat Noir!</h1>
			<div id="loginForm"></div>
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

		const loginButton = new Block<ButtonProps>({
			id: "loginButton",
			textContent: "Sign in",
			className: formClasses.button,
			events: {
				"click": () => {}
			}
		}, "button");

		const signUpButton = new Block<ButtonProps>({
			id: "signupButton",
			textContent: "Create account",
			className: formClasses.button,
			events: {
				"click": (event: Event) => {
					event.preventDefault();
					this.props.goToSignUp();
				}
			}
		}, "button");

		const loginForm = new Form({
			inputFields: [loginField, passwordField],
			controls: [loginButton, signUpButton],
			events: {
				"submit": (event: Event) => {
					event.preventDefault();
					if (loginField.validate() && passwordField.validate()) {
						printFormData(<HTMLFormElement>event.target);
						this.props.goToMain();
					}
				}
			}
		});

		return this.compile(
			this.template(), 
			{
				"loginForm": loginForm
			}
		);
	}
};
