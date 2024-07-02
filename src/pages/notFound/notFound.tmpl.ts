import { Template } from "../../types";

import classes from "./notFound.module.css";

type props = {
	returnToMainPage: () => void;
}

export const notFoundPage: Template<props> = ({returnToMainPage}: props) => {
	const template = 
	`
		<div class=${classes.page}>
			<h1>404</h1>
			<h2>Sorry, this page doesn't exist</h2>
			<button id="return">Return to main page</button>
		</div>
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