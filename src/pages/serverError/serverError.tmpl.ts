import { Template } from "../../types";

import classes from "./serverError.module.css";


export const serverErrorPage: Template<{}> = () => {
	const template = 
	`	
		<main class=${classes.page}>
			<h1 class=${classes.h1}>500</h1>
			<h2 class=${classes.h2}>Something went wrong</h2>
			<p>Please refresh the page or \n
			<a id="contactLink" href="">contact us</a> if the issue persists</p>
		</main>

	`
	;

	const onLoad = () => {
		const contactLink = <HTMLAnchorElement>document.querySelector("#contactLink");
		contactLink.addEventListener("click", (event) => event.preventDefault());
	};

	return [template, onLoad]
}
