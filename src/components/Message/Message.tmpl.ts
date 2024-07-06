import { Template } from "../../types";

import classes from "./Message.module.css";


export type props = {
	text: string,
	datetime: string,
	own?: boolean
}

export const Message:Template<props> = ({
	text,
	datetime,
	own = false
}: props) => {
	const template = 
	`
	<div class="${classes.message} ${own ? classes.own: ""}">
		<span class=${classes.text}>${text}</span>
		<span class=${classes.datetime}>${datetime}</span>
	</div>
	`
	;
	return [template];
};

