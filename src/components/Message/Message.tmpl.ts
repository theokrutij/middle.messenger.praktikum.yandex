import { Template } from "../../types";

import classes from "./Message.module.css";


export type props = {
	text: string,
	datetime: string
}

export const Message:Template<props> = ({
	text,
	datetime
}: props) => {
	const template = 
	`
	<div class=${classes.message}>
		<span class=${classes.text}>${text}</span>
		<span class=${classes.datetime}>${datetime}</span>
	</div>
	`
	;
	return [template];
};

