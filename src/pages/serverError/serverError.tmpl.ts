import { Block } from "../../modules/Block";
import { DefaultProps } from "../../types";

import classes from "./serverError.module.css";

export class ServerErrorPage extends Block<DefaultProps> {
	constructor(props: DefaultProps) {
		super(props);
	}

	template() {
		const template = 
		`	
		<main class=${classes.page}>
			<h1 class=${classes.h1}>500</h1>
			<h2 class=${classes.h2}>Something went wrong</h2>
			<p>Please refresh the page or \n
			<a id="contactLink" href="">contact us</a> if the issue persists</p>
		</main>

		`;

		return template;
	}

	render() {
		return this.compile(this.template());
	}
};
