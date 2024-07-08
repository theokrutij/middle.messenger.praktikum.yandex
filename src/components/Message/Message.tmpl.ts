import { Block } from "../../modules/Block";
import { DefaultProps } from "../../types";
import classes from "./Message.module.css";


export type props = DefaultProps & {
	text: string,
	datetime: string,
	own?: boolean,
	id: string
}


export class Message extends Block<props> {
	constructor(props: props) {
		const className = `${classes.message} ${props.own ? classes.own: ""}`;
		super({...props, className: className});


	}
	
	template() {
		const template = 
		`
			<span class=${classes.text}>${this.props.text}</span>
			<span class=${classes.datetime}>${this.props.datetime}</span>
		`;

		return template;
	}

	render() {
		return this.compile(this.template());
	}
};
