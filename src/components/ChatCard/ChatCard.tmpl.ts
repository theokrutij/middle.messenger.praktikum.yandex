import { Block } from "../../modules/Block";

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

export class ChatCard extends Block<props> {
	constructor(props: props) {
		super(props);
	}

	template() {
		const template =
		`
		<div class=${classes["chat-card"]}>
			<div class=${classes.avatar}></div>
			<h3 class=${classes.name}>${this.props.name}</h3>
			<p class=${classes.message}>
				${this.props.lastMessage.author}: <span class=${classes.text}>${this.props.lastMessage.text}</span>
			</p>
			<span class=${classes.datetime}>${this.props.lastMessage.datetime}</span>
			${
				this.props.unreadCount > 0 
				? `<div class=${classes['unread-count']}>${this.props.unreadCount}</div>`
				: ""
			}
		</div>
		`;	
		return template;
	}

	render() {
		return this.compile(this.template());
	}
};
