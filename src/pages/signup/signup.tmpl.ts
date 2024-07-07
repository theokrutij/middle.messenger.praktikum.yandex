import { InputField } from "../../components/InputField/InputField.tmpl";
import { Block } from "../../modules/Block";
import { printFormData } from "../../modules/formActions";
import { DefaultProps } from "../../types";

import classes from "./signup.module.css";

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
			<form class=${classes.form} id="signupForm">
				<div class=${classes.fields}>
					<div id="firstNameField"></div>
					<div id="secondNameField"></div>
					<div id="emailField"></div>
					<div id="phoneField"></div>
					<div id="loginField"></div>
					<div id="passwordField"></div>
					<div id="repeatPasswordField"></div>
				</div>
				<div class=${classes.controls}>
					<div id="continueButton"></div>
					<div id="createProfileButton"></div>
					<div id="returnButton"></div>
				</div>
			</form>
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

		const continueButton = new Block({
			textContent: "Continue",
			className: classes.button,
			events: {
				"click": (event) => {
					event.preventDefault();

					const userInfoFieldsValid = (
						firstNameInputField.validate() &&
						secondNameInputField.validate() &&
						emailInputField.validate() &&
						phoneInputField.validate()
					);

					if (userInfoFieldsValid) {
						firstNameInputField.hide();
						secondNameInputField.hide();
						emailInputField.hide();
						phoneInputField.hide();

						usernameInputField.show();
						passwordInputField.show();
						repeatPasswordInputField.show();

						continueButton.hide();
						createProfileButton.show();
					}
				}
			}
		}, "button");
		const returnButton = new Block({
			textContent: "Return to sign in",
			className: classes.button,
			events: {
				"click": (event) => {
					event.preventDefault();
					this.props.returnToSignIn();
				}
			}
		}, "button");

		const createProfileButton = new Block({
			textContent: "Create profile",
			className: classes.button,
			events: {
				"click": (event: Event) => {
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
						const signupForm = <HTMLFormElement>document.querySelector("#signupForm");
						printFormData(signupForm as HTMLFormElement);

						this.props.confirmCreate();
					}
				}
			}
		}, "button");
		createProfileButton.hide();

		return this.compile(
			this.template(), 
			{
				"firstNameField": firstNameInputField,
				"secondNameField": secondNameInputField,
				"emailField": emailInputField,
				"phoneField": phoneInputField,
				"loginField": usernameInputField,
				"passwordField": passwordInputField,
				"repeatPasswordField": repeatPasswordInputField,
				"continueButton": continueButton,
				"returnButton": returnButton,
				"createProfileButton": createProfileButton
			}
		);
	}
};
