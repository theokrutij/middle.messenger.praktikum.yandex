import { Template } from "../../types";

import classes from "./ChatCard.module.css";


export const ChatCard: Template = () => {
	const template = 
	`
	<div class=${classes["chat-card"]}>
		<div class=${classes.avatar}></div>
		<h3 class=${classes.name}>Chat name</h3>
		<p class=${classes.message}>Cicero: <span class=${classes.text}>Lorem ipsum dolor sit</span></p>
		<span class=${classes.datetime}>Today, 12:00</span>
		<div class=${classes["unread-count"]}>3</div>
	</div>
	`
	;	

	return [template];
};
