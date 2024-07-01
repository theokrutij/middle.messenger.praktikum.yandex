import { InputField } from "../../components/InputField/InputField.tmpl"
import { Template } from "../../types";

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
			name: "last_name", 
			id: "last_name",
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
		})
	];

	const template = 
		`
		<div>
			<h1>Create new profile</h1>
			<form action="submit">
				${inputFields.map(([template]) => template).join("\n")}
				<button id="continue">Continue</button>
				<button id="return">Return to sign in</button>
			</form>
		</div>
		`
	;

	const handleContinueClick = (event: MouseEvent) => {
		event.preventDefault();
		confirmCreate();

	}



	const handleReturnClick = (event: MouseEvent) => {
		event.preventDefault();
		returnToSignIn();
	}


	const onLoad = () => {
		inputFields.map(([,onLoad]) => {
			if (onLoad !== undefined) {
				onLoad();
			}
		});

		const continueButton = <HTMLButtonElement>document.querySelector("#continue");
		continueButton.addEventListener("click", handleContinueClick)

		const returnButton = <HTMLButtonElement>document.querySelector("#return");
		returnButton.addEventListener("click", handleReturnClick);
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
	}
	return [template, onLoad, onUnload];
}