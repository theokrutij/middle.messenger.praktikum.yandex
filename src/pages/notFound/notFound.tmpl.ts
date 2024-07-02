import { Template } from "../../types";

import classes from "./notFound.module.css";

type props = {
	returnToMainPage: () => void;
}

export const notFoundPage: Template<props> = ({returnToMainPage}: props) => {
	const template = 
	`
		<main class=${classes.page}>
			<h1>404</h1>
			<h2>Sorry, this page doesn't exist</h2>
			<button id="return">Return to main page</button>
		</main>
	`
	;

	const onLoad = () => {
		const returnButton = <HTMLButtonElement>document.querySelector("#return");
		returnButton.addEventListener(
			"click",
			returnToMainPage
		);
	}

	return [template, onLoad]
}