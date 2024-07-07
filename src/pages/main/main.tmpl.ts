import { ChatCard } from "../../components/ChatCard/ChatCard.tmpl";
import { InputField } from "../../components/InputField/InputField.tmpl";
import { Message, props as MessageProps } from "../../components/Message/Message.tmpl";
import { ModalMenu } from "../../components/ModalMenu/ModalMenu.tmpl";
import { Block } from "../../modules/Block";
import { props as propType } from "../../types";
import { showModal } from "../../utils";
import { IconButton } from "../../components/IconButton/IconButton.tmpl";

import classes from "./main.module.css";


type MainPageProps = propType & {
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

// export const MainPage: Template<MainPageProps> = ({
// 	messageProps,
// 	goToProfile,
// 	logOut
// }: MainPageProps) => {
// 	const chatCards = [
// 		ChatCard({
// 			name: "Real talk",
// 			lastMessage: {
// 				author: "Cicero",
// 				text: "Lorem ipsum dolor sit aaaaaaaaaaaaaaaaaaaamet",
// 				datetime: "Today, 12:00"
// 			},
// 			unreadCount: 3
// 		}),
// 	];
// 	const searchField = InputField({
// 		inputType: "text",
// 		name: "search",
// 		id: "searchField",
// 		placeholder: "Search..."
// 	});
// 	const messages = messageProps.map(
// 		(props) => Message(props)
// 	);
// 	const options = ModalMenu({options: [
// 		{title: "Profile", action: goToProfile, critical: false},
// 		{title: "Log out", action: logOut, critical: true}
// 	]});
// 	const chatOptions = ModalMenu({options: [
// 		{title: "Archive chat", action: () => {}, critical: true}
// 	]});


// 	const template = 
// 	`
// 		<main class=${classes.page}>
// 			<div class=${classes.sidebar}>
// 				<header class=${classes.header}>
// 					<button class=${classes["icon-button"]} id="optionsButton">
// 						<img class=${classes["burger-icon"]} src="/burger.svg" alt="optionsButton">
// 					</button>
// 					<div class=${classes["search-field-wrap"]}>
// 						${searchField[0]}
// 					</div>
// 				</header>
// 				<div>
// 					${chatCards.map(([template]) => template).join("\n")}
// 				</div>
// 			</div>
// 			<div class=${classes.chat}>
// 				<header class=${classes.header}>
// 					<h2 class=${classes.title}>Chat name</h2>
// 					<button class=${classes["icon-button"]} id="chatOptionsButton"><img class=${classes["dots-icon"]} src="/chatMenu.svg" alt="chatMenuButton"></button>
// 				</header>
// 				<div class=${classes.messages}>
// 					${messages.map(([template]) => template).join("\n")}
// 				</div>
// 				<div class=${classes.controls}>
// 					<form class=${classes.form}>
// 						<input 
// 							type="text" 
// 							name="message" 
// 							id="message" 
// 							placeholder="Message..."
// 							class=${classes.message}
// 						>
// 						<button class=${classes["icon-button"]} id="sendMessage"><img class=${classes["send-button-icon"]} src="/send.svg" alt="sendButton"></button>
// 					</form>
// 				</div>
// 			</div>
// 		</main>
// 	`;
	
// 	const showOptionsMenu = () => {
// 		showModal(
// 			`
// 			<div class=${classes.options}>
// 				${options[0]}
// 			</div>
// 			`
// 			, 
// 			options[1] as () => void,
// 			options[2] as () => void
// 		);
// 	};
// 	const showChatOptionsMenu = () => {
// 		showModal(
// 			`
// 			<div class=${classes["chat-options"]}>
// 				${chatOptions[0]}
// 			</div>
// 			`
// 			,
// 			chatOptions[1] as () => void,
// 			chatOptions[2] as () => void
// 		);
// 	};
// 	const handleSendMessage = (event: MouseEvent) => {
// 		event.preventDefault();
// ;		const messageField = <HTMLInputElement>document.querySelector("#message");
// 		if (messageField.value !== "") {
// 			sendMessage(messageField.value);
// 			messageField.value = "";
// 		} 
// 	};
// 	const onLoad = () => {
// 		const sendMessageButton = <HTMLButtonElement>document.querySelector("#sendMessage");
// 		sendMessageButton.addEventListener("click", handleSendMessage);

// 		const optionsButton = <HTMLButtonElement>document.querySelector("#optionsButton");
// 		optionsButton.addEventListener("click", showOptionsMenu);

// 		const chatOptionsButton = <HTMLButtonElement>document.querySelector("#chatOptionsButton");
// 		chatOptionsButton.addEventListener("click", showChatOptionsMenu);
// 	};

// 	const onUnload = () => {
// 		const sendMessageButton = <HTMLButtonElement>document.querySelector("#sendMessage");
// 		sendMessageButton.removeEventListener("click", handleSendMessage);

// 		const optionsButton = <HTMLButtonElement>document.querySelector("#optionsButton");
// 		optionsButton.removeEventListener("click", showOptionsMenu);

// 		const chatOptionsButton = <HTMLButtonElement>document.querySelector("#chatOptionsButton");
// 		chatOptionsButton.removeEventListener("click", showChatOptionsMenu);
// 	};

// 	return [template, onLoad, onUnload];
// };

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
				"click": (event) => {
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
		
		const stubIdsToComponents: {[key: string]: Block<propType>} = {
			"optionsButton": burgerButton,
			"searchField": searchField,
			"chatOptionsButton": chatOptionsButton,
			"messageField": messageField,
			"sendButton": sendButton
		};
		chatCards.forEach((chatCard) => {
			stubIdsToComponents["ChatCard"] = chatCard;
		});

		currentChatMessages.forEach((message) => {
			stubIdsToComponents[message.props.id] = message;
		});

		return this.compile(
			this.template(),
			stubIdsToComponents
		);	
	}
};


