import { InputField } from "../../components/InputField/InputField.tmpl";
import { printFormData } from "../../modules/formActions";
import { Template } from "../../types";

import classes from "./signup.module.css";

type signUpProps = {
	returnToSignIn: () => void;
	confirmCreate: () => void;
}

export const SignupPage: Template<signUpProps> = ({returnToSignIn, confirmCreate}: signUpProps) => {
	const inputFields = [
		InputField({
			label: "First name", 
			inputType: "text", 
			name: "first_name", 
			id: "first_name",
			placeholder: "Enter your first name...",
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true
		}),
		InputField({
			label: "Last name",
			inputType: "text", 
			name: "second_name", 
			id: "second_name",
			placeholder: "Enter your last name...",
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true,
		}),
		InputField({
			label: "Email",
			inputType: "email", 
			name: "email", 
			id: "email",
			placeholder: "Enter your email address...",
			required: true
		}),
		InputField({
			label: "Phone",
			inputType: "tel", 
			name: "phone", 
			id: "phone",
			placeholder: "Enter your phone number...",
			minlength: 10,
			maxlength: 15,
			pattern: "^\\+?[0-9]+$",
			required: true
		}),
		InputField({
			label: "Username",
			inputType: "text",
			name: "login",
			id: "login",
			placeholder: "Enter your username...",
			minlength: 3,
			maxlength: 20,
			pattern: "^[a-zA-Z0-9_\\-]*[a-zA-Z]+[a-zA-Z0-9_\\-]*$",
			required: true
		}),
		InputField({
			label: "Password",
			inputType: "password",
			name: "password",
			id: "password",
			placeholder: "Enter your password...",
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
			required: true
		}),
		InputField({
			label: "Repeat password",
			inputType: "password",
			name: "repeat_password",
			id: "repeat_password",
			placeholder: "Repeat your password...",
			required: true
		})
	];

	const infoFieldIds = ["first_name", "second_name", "email", "phone"];
	const credentialFieldIds= ["login", "password", "repeat_password"];


	const template = 
		`
		<main class=${classes.page}>
			<h1>Create new profile</h1>
			<form class=${classes.form} action="submit">
				<div class=${classes.fields}>
						${inputFields.map(([template]) => template).join("\n")}
				</div>
				<div class=${classes.controls}>
					<button class=${classes.button} id="continue">Continue</button>
					<button class="${classes.button} hidden" id="create">Create profile</button>
					<button class=${classes.button} id="return">Return to sign in</button>
				</div>
			</form>
		</main>
		`
	;




	const handleContinueClick = (event: MouseEvent) => {
		event.preventDefault();

		let infoFieldsAreValid = true;
		infoFieldIds.forEach((id) => {
			const inputElement = <HTMLInputElement>document.querySelector(`#${id}`);
			const fieldIsValid = inputElement.reportValidity() ;
			if (!fieldIsValid) {
				infoFieldsAreValid = false;
			}
		});
		if (infoFieldsAreValid) {
			infoFieldIds.forEach((id) => {
				toggleHidden(`${id}_field`);
			});
			credentialFieldIds.forEach((id) => {
				toggleHidden(`${id}_field`);
			});

			toggleHidden("continue");
			toggleHidden("create");
		}
	};

	const handleReturnClick = (event: MouseEvent) => {
		event.preventDefault();
		returnToSignIn();
	};

	const handleCreateClick = (event: MouseEvent) => {
		event.preventDefault();

		let credentialFieldsAreValid = true;
		const usernameField = <HTMLInputElement>document.querySelector(`#login`);
		if (!usernameField.reportValidity()) {
			credentialFieldsAreValid = false;
		}
		const passwordField = <HTMLInputElement>document.querySelector(`#password`);
		if (!passwordField.reportValidity()) {
			credentialFieldsAreValid = false;
		}
		const repeatPasswordField = <HTMLInputElement>document.querySelector(`#repeat_password`);
		if (repeatPasswordField.value !== passwordField.value) {
			passwordField.setCustomValidity("Passwords must match");
			repeatPasswordField.setCustomValidity("Passwords must match");
			credentialFieldsAreValid = false;
		}
		else {
			passwordField.setCustomValidity("");
			repeatPasswordField.setCustomValidity("");
		}
		passwordField.reportValidity();
		repeatPasswordField.reportValidity();

		
		if (credentialFieldsAreValid) {
			printFormData(event.target as HTMLFormElement);
			confirmCreate();
		}
	};


	const onLoad = () => {
		inputFields.map(([,onLoad]) => {
			if (onLoad !== undefined) {
				onLoad();
			}
		});

		const continueButton = <HTMLButtonElement>document.querySelector("#continue");
		continueButton.addEventListener("click", handleContinueClick);

		const returnButton = <HTMLButtonElement>document.querySelector("#return");
		returnButton.addEventListener("click", handleReturnClick);

		const createButton =<HTMLButtonElement>document.querySelector("#create");
		createButton.addEventListener("click", handleCreateClick);

		credentialFieldIds.map((id) => {
			toggleHidden(`${id}_field`);		
		});
	};

	const onUnload = () => {
		inputFields.map(([,,onUnload]) => {
			if (onUnload !== undefined) {
				onUnload();
			}
		});

		const continueButton = <HTMLButtonElement>document.querySelector("#continue");
		continueButton.removeEventListener("click", handleContinueClick);

		const returnButton = <HTMLButtonElement>document.querySelector("#return");
		returnButton.removeEventListener("click", handleReturnClick);

		const createButton =<HTMLButtonElement>document.querySelector("#create");
		createButton.removeEventListener("click", handleCreateClick);
	};	
	return [template, onLoad, onUnload];
};


const toggleHidden = (id: string) => {
	const elem = <HTMLElement>document.querySelector(`#${id}`);
	elem.classList.toggle("hidden");
};
