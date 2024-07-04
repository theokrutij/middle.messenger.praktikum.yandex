import { InputField } from "../../components/InputField/InputField.tmpl";
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
			placeholder: "Enter your first name..."
		}),
		InputField({
			label: "Last name",
			inputType: "text", 
			name: "second_name", 
			id: "second_name",
			placeholder: "Enter your last name..."
		}),
		InputField({
			label: "Email",
			inputType: "email", 
			name: "email", 
			id: "email",
			placeholder: "Enter your email address..."		
		}),
		InputField({
			label: "Phone",
			inputType: "phone", 
			name: "phone", 
			id: "phone",
			placeholder: "Enter your phone number..."		
		}),
		InputField({
			label: "Username",
			inputType: "text",
			name: "login",
			id: "login",
			placeholder: "Enter your username..."
		}),
		InputField({
			label: "Password",
			inputType: "password",
			name: "password",
			id: "password",
			placeholder: "Enter your password..."
		}),
		InputField({
			label: "Repeat password",
			inputType: "password",
			name: "repeat_password",
			id: "repeat_password",
			placeholder: "Repeat your password..."
		})
	];

	const infoFields = ["first_name", "second_name", "email", "phone"];
	const credentialFields= ["login", "password", "repeat_password"];


	const template = 
		`
		<main class=${classes.signupPage}>
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

		infoFields.map((id) => {
			toggleHidden(`${id}_field`);
		});
		credentialFields.map((id) => {
			toggleHidden(`${id}_field`);
		});

		toggleHidden("continue");
		toggleHidden("create");
	};

	const handleReturnClick = (event: MouseEvent) => {
		event.preventDefault();
		returnToSignIn();
	};

	const handleCreateClick = (event: MouseEvent) => {
		event.preventDefault();
		confirmCreate();
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

		credentialFields.map((id) => {
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
	}	
	return [template, onLoad, onUnload];
}


const toggleHidden = (id: string) => {
	const elem = <HTMLElement>document.querySelector(`#${id}`);
	elem.classList.toggle("hidden");
}
