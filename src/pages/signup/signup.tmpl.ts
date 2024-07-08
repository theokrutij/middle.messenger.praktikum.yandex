import { ButtonProps, Form } from "../../components/Form/Form.tmpl";
import { InputField } from "../../components/InputField/InputField.tmpl";
import { Block } from "../../modules/Block";
import { printFormData } from "../../modules/formActions";
import { DefaultProps } from "../../types";

import classes from "./signup.module.css";
import formClasses from "../../components/Form/Form.module.css";


type SignUpProps = DefaultProps & {
	returnToSignIn: () => void;
	confirmCreate: () => void;
}


export class SignupPage extends Block<SignUpProps> {
	constructor(props: SignUpProps) {
		super(props);
	}

	template() {
		const template = 
		`
		<main class=${classes.page}>
			<h1>Create new profile</h1>
			<div id="signupForm"></div>
		</main>
		`;

		return template;
	}

	render() {
		const firstNameInputField = new InputField({
			label: "First name", 
			inputType: "text", 
			name: "first_name", 
			id: "first_name",
			placeholder: "Enter your first name...",
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true
		});
		const secondNameInputField = new InputField({
			label: "Last name",
			inputType: "text", 
			name: "second_name", 
			id: "second_name",
			placeholder: "Enter your last name...",
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true,
		});
		const emailInputField = new InputField({
			label: "Email",
			inputType: "email", 
			name: "email", 
			id: "email",
			placeholder: "Enter your email address...",
			required: true
		});
		const phoneInputField = new InputField({
			label: "Phone",
			inputType: "tel", 
			name: "phone", 
			id: "phone",
			placeholder: "Enter your phone number...",
			minlength: 10,
			maxlength: 15,
			pattern: "^\\+?[0-9]+$",
			required: true
		});
		const usernameInputField = new InputField({
			label: "Username",
			inputType: "text",
			name: "login",
			id: "login",
			placeholder: "Enter your username...",
			minlength: 3,
			maxlength: 20,
			pattern: "^[a-zA-Z0-9_\\-]*[a-zA-Z]+[a-zA-Z0-9_\\-]*$",
			required: true
		});
		usernameInputField.hide();
		const passwordInputField = new InputField({
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
		passwordInputField.hide();
		const repeatPasswordInputField = new InputField({
			label: "Repeat password",
			inputType: "password",
			name: "repeat_password",
			id: "repeat_password",
			placeholder: "Repeat your password...",
			required: true
		});
		repeatPasswordInputField.hide();
		const userInfoFields = [
			firstNameInputField,
			secondNameInputField,
			emailInputField, 
			phoneInputField
		];
		const credentialFields = [
			usernameInputField,
			passwordInputField,
			repeatPasswordInputField
		];

		const continueButton = new Block<ButtonProps>({
			id: "continueButton",
			textContent: "Continue",
			className: formClasses.button,
			events: {
				"click": (event: Event) => {
					event.preventDefault();

					const userInfoFieldsValid = userInfoFields.reduce(
						(flag, curr) => curr.validate() && flag,
						true
					);

					if (userInfoFieldsValid) {
						userInfoFields.forEach((f) => f.hide());
						credentialFields.forEach((f) => f.show());
						continueButton.hide();
						createProfileButton.show();
					}
				}
			}
		}, "button");

		const returnButton = new Block<ButtonProps>({
			id: "returnButton",
			textContent: "Return to sign in",
			className: formClasses.button,
			events: {
				"click": (event: Event) => {
					event.preventDefault();
					this.props.returnToSignIn();
				}
			}
		}, "button");

		const createProfileButton = new Block<ButtonProps>({
			id: "createProfileButton",
			textContent: "Create profile",
			className: formClasses.button,
			events: {"click": () => {}}
		}, "button");
		createProfileButton.hide();

		const signupForm = new Form({
			inputFields: [
				firstNameInputField, 
				secondNameInputField,
				emailInputField,
				phoneInputField,
				usernameInputField,
				passwordInputField,
				repeatPasswordInputField
			],
			controls: [continueButton, createProfileButton, returnButton],
			events: {
				"submit": (event: Event) => {
					event.preventDefault(); 

					const passwordInput = <HTMLInputElement>passwordInputField.getContent().querySelector("input");
					const repeatedPasswordInput = <HTMLInputElement>repeatPasswordInputField.getContent().querySelector("input");

					const passwordsMatch = passwordInput.value === repeatedPasswordInput.value;
					if (!passwordsMatch) {
						passwordInput.setCustomValidity("Passwords must match");
						repeatedPasswordInput.setCustomValidity("Password must match");
					}
					else {
						passwordInput.setCustomValidity("");
						repeatedPasswordInput.setCustomValidity("");
					}
					passwordInputField.validate();
					repeatPasswordInputField.validate();
					
					const credentialFieldsAreValid = (
						usernameInputField.validate() &&
						passwordInputField.validate() &&
						passwordsMatch
					);

					if (credentialFieldsAreValid) {
						printFormData(<HTMLFormElement>event.target);

						this.props.confirmCreate();
					}
				}
			}

		});

		return this.compile(
			this.template(), 
			{
				"signupForm": signupForm
			}
		);
	}
};
