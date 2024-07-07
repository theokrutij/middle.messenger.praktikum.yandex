import { ChatCard } from "../../components/ChatCard/ChatCard.tmpl";
import { InputField } from "../../components/InputField/InputField.tmpl";
import { Message, props as MessageProps } from "../../components/Message/Message.tmpl";
import { ModalMenu } from "../../components/ModalMenu/ModalMenu.tmpl";
import { Block } from "../../modules/Block";
import { DefaultProps } from "../../types";
import { showModal } from "../../utils";
import { IconButton } from "../../components/IconButton/IconButton.tmpl";

import classes from "./main.module.css";


type MainPageProps = DefaultProps & {
	goToProfile: () => void,
	logOut: () => void,
	chats: {
		name: string,
		lastMessage: {
			author: string,
			text: string,
			datetime: string
		},
		unreadCount: 3
	}[],
	currenChatMessages: MessageProps[]
}

const sendMessage = (message: string) => {
	console.log(`New message sent: ${message}`);
};


export class MainPage extends Block<MainPageProps> {
	constructor(props: MainPageProps) {
		super({...props, className: classes.page}, "main");
	}

	template() {
		const template = 
		`
			<div class=${classes.sidebar}>
				<header class=${classes.header}>
					<div id="optionsButton"></div>
					<div class=${classes["search-field-wrap"]}>
						<div id="searchField"></div>
					</div>
				</header>
				<div>
					${
						this.props.chats.map(
							() => `<div id="ChatCard"></div>`
						).join("\n")
					}
				</div>
			</div>
			<div class=${classes.chat}>
				<header class=${classes.header}>
					<h2 class=${classes.title}>Chat name</h2>
					<div id="chatOptionsButton"></div>
				</header>
				<div class=${classes.messages}>
					${
						this.props.currenChatMessages.map(
							({id}) => `<div id=${id}></div>`
						).join("\n")
					}
				</div>
				<div class=${classes.controls}>
					<form class=${classes.form}>
						<div id="messageField"></div>
						<div id="sendButton"></div>
					</form>
				</div>
			</div>
		`;
		return template;
	}

	render() {
		const optionsMenu = new ModalMenu({
			className: classes.options,
			options: [
				{title: "Profile", action: this.props.goToProfile, critical: false},
				{title: "Log out", action: this.props.logOut, critical: true}
			],

		});
		const burgerButton = new IconButton({
			url: "/burger.svg",
			alt: "optionsButton",
			iconClassName: classes["burget-icon"],
			events: {
				"click": () => showModal(optionsMenu)
			},
			className: classes["icon-button"]
		});
		const searchField = new InputField({
			inputType: "text",
			name: "search",
			id: "searchField",
			placeholder: "Search..."
		});
		const chatOptionsMenu = new ModalMenu({
			className: classes["chat-options"],
			options: [
				{title: "Archive chat", action: () => {}, critical: true}
			]
		});
		const chatOptionsButton = new IconButton({
			url: "/chatMenu.svg",
			alt: "chatOptionsButton",
			iconClassName: classes["dots-icon"],
			events: {
				"click": () => showModal(chatOptionsMenu)
			},
			className: classes["icon-button"]
		});
		const chatCards = this.props.chats.map(
			(chatCardProps) => new ChatCard(chatCardProps)
		);

		const currentChatMessages = this.props.currenChatMessages.map(
			(messageProps) => new Message({
				...messageProps,
			})
		);
		const messageField = new InputField({
			inputType: "text",
			name: "message",
			id: "message",
			placeholder: "Message...",
			className: classes.message
		});
		const sendButton = new IconButton({
			url: "/send.svg",
			alt: "sendButton",
			iconClassName: classes["send-button-icon"],
			events: {
				"click": (event: Event) => {
					event.preventDefault();
					const messageInput = <HTMLInputElement>messageField.getContent().querySelector("input");
					if (messageInput.value !== "") {
						sendMessage(messageInput.value);
						messageInput.value = "";
					}
				}
			},
			className: classes["icon-button"]
		});
		
		const stubIdsToComponents = {
			"optionsButton": burgerButton,
			"searchField": searchField,
			"chatOptionsButton": chatOptionsButton,
			"messageField": messageField,
			"sendButton": sendButton
		};
		chatCards.forEach((chatCard) => {
			Object.assign(stubIdsToComponents, {"ChatCard": chatCard});
		});
		
		currentChatMessages.forEach((message) => {
			const messageId = message.props.id;
			Object.assign(stubIdsToComponents, {[messageId]: message});
		});


		return this.compile(
			this.template(),
			stubIdsToComponents
		);	
	}
};


