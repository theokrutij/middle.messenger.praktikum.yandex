import { Template } from "../../types"

import classes from "./main.module.css";


type props = {
	goToLogin: () => void,
	goToSignUp: () => void,
	goToError404: () => void,
	goToError500: () => void
}

export const MainPage: Template<props> = ({
	goToLogin,
	goToSignUp,
	goToError404,
	goToError500
}: props) => {
	const template = 
	`
		<main class=${classes.page}>
			<p>Main page will be here</p>
			<nav>
				<button id="login">Login page</button>
				<button id="signup">Signup page</button>
				<button id="error404">404 error page</button>
				<button id="error500">500 error page</button>
			</nav>
		</main>
	`;

	const onLoad = () => {
		const loginButton = <HTMLButtonElement>document.querySelector("#login");
		loginButton.addEventListener("click", goToLogin);

		const signupButton = <HTMLButtonElement>document.querySelector("#signup");
		signupButton.addEventListener("click", goToSignUp);

		const error404Button = <HTMLButtonElement>document.querySelector("#error404");
		error404Button.addEventListener("click", goToError404);

		const error500Button = <HTMLButtonElement>document.querySelector("#error500");
		error500Button.addEventListener("click", goToError500);
	}

	const onUnload = () => {
		const loginButton = <HTMLButtonElement>document.querySelector("#login");
		loginButton.removeEventListener("click", goToLogin);

		const signupButton = <HTMLButtonElement>document.querySelector("#signup");
		signupButton.removeEventListener("click", goToSignUp);

		const error404Button = <HTMLButtonElement>document.querySelector("#error404");
		error404Button.removeEventListener("click", goToError404);

		const error500Button = <HTMLButtonElement>document.querySelector("#error500");
		error500Button.removeEventListener("click", goToError500);
	}

	return [template, onLoad, onUnload];
}