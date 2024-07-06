import { Template } from "../../types";

import classes from "./ChatCard.module.css";


type props = {
	name: string,
	lastMessage: {
		author: string,
		text: string,
		datetime: string
	},
	unreadCount: number,
}

export const ChatCard: Template<props> = ({
	name,
	lastMessage,
	unreadCount,
}: props) => {
	const template = 
	`
	<div class=${classes["chat-card"]}>
		<div class=${classes.avatar}></div>
		<h3 class=${classes.name}>${name}</h3>
		<p class=${classes.message}>
			${lastMessage.author}: <span class=${classes.text}>${lastMessage.text}</span>
		</p>
		<span class=${classes.datetime}>${lastMessage.datetime}</span>
		${
			unreadCount > 0 
			? `<div class=${classes['unread-count']}>${unreadCount}</div>`
			: ""
		}
	</div>
	`
	;	

	return [template];
};
