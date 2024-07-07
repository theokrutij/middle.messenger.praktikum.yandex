import { Block } from "../../modules/Block";


import classes from "./notFound.module.css";

type Props = {
	returnToMain: () => void
}


export class NotFoundPage extends Block<Props> {
	static returnButtonId = "returnButton";
	constructor(props: Props) {
		super({...props});
	}

	template() {
		const template = 
		`
		<main class=${classes.page}>
			<h1 class=${classes.h1}>404</h1>
			<h2 class=${classes.h2}>Sorry, this page doesn't exist</h2>
			<div id=${NotFoundPage.returnButtonId}></div>
		</main>
		`;

		return template;
	}

	render() {
		const returnButton = new Block(
			{
				id: NotFoundPage.returnButtonId,
				className: classes.button,
				textContent: "Return to main page",
				events: {
					"click": this.props.returnToMain
				}
			},
			"button",
		);


		return this.compile(this.template(), {[NotFoundPage.returnButtonId]: returnButton});
	}
};

