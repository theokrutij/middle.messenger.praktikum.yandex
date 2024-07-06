import { ChatCard } from "../../components/ChatCard/ChatCard.tmpl";
import { InputField } from "../../components/InputField/InputField.tmpl";
import { Message, props as MessageProps } from "../../components/Message/Message.tmpl";
import { ModalMenu } from "../../components/ModalMenu/ModalMenu.tmpl";
import { Template } from "../../types";
import { showModal } from "../../utils";

import classes from "./main.module.css";


type props = {
	messageProps: MessageProps[],
	goToProfile: () => void,
	logOut: () => void
}

export const MainPage: Template<props> = ({
	messageProps,
	goToProfile,
	logOut
}: props) => {
	const chatCards = [
		ChatCard({
			name: "Real talk",
			lastMessage: {
				author: "Cicero",
				text: "Lorem ipsum dolor sit aaaaaaaaaaaaaaaaaaaamet",
				datetime: "Today, 12:00"
			},
			unreadCount: 3
		}),
	];
	const searchField = InputField({
		inputType: "text",
		name: "search",
		id: "searchField",
		placeholder: "Search..."
	});
	const messages = messageProps.map(
		(props) => Message(props)
	);
	const options = ModalMenu({options: [
		{title: "Profile", action: goToProfile, critical: false},
		{title: "Log out", action: logOut, critical: true}
	]});
	const chatOptions = ModalMenu({options: [
		{title: "Archive chat", action: () => {}, critical: true}
	]});


	const template = 
	`
		<main class=${classes.page}>
			<div class=${classes.sidebar}>
				<header class=${classes.header}>
					<button class=${classes["icon-button"]} id="optionsButton">
						<img class=${classes["burger-icon"]} src="/burger.svg" alt="optionsButton">
					</button>
					<div class=${classes["search-field-wrap"]}>
						${searchField[0]}
					</div>
				</header>
				<div>
					${chatCards.map(([template]) => template).join("\n")}
				</div>
			</div>
			<div class=${classes.chat}>
				<header class=${classes.header}>
					<h2 class=${classes.title}>Chat name</h2>
					<button class=${classes["icon-button"]} id="chatOptionsButton"><img class=${classes["dots-icon"]} src="/chatMenu.svg" alt="chatMenuButton"></button>
				</header>
				<div class=${classes.messages}>
					${messages.map(([template]) => template).join("\n")}
				</div>
				<div class=${classes.controls}>
					<form class=${classes.form}>
						<input 
							type="text" 
							name="message" 
							id="message" 
							placeholder="Message..."
							class=${classes.message}
						>
						<button class=${classes["icon-button"]} id="sendMessage"><img class=${classes["send-button-icon"]} src="/send.svg" alt="sendButton"></button>
					</form>
				</div>
			</div>
		</main>
	`;
	
	const showOptionsMenu = () => {
		showModal(
			`
			<div class=${classes.options}>
				${options[0]}
			</div>
			`
			, 
			options[1] as () => void,
			options[2] as () => void
		);
	};
	const showChatOptionsMenu = () => {
		showModal(
			`
			<div class=${classes["chat-options"]}>
				${chatOptions[0]}
			</div>
			`
			,
			chatOptions[1] as () => void,
			chatOptions[2] as () => void
		);
	};
	const handleSendMessage = (event: MouseEvent) => {
		event.preventDefault();
;		const messageField = <HTMLInputElement>document.querySelector("#message");
		if (messageField.value !== "") {
			sendMessage(messageField.value);
			messageField.value = "";
		} 
	};
	const onLoad = () => {
		const sendMessageButton = <HTMLButtonElement>document.querySelector("#sendMessage");
		sendMessageButton.addEventListener("click", handleSendMessage);

		const optionsButton = <HTMLButtonElement>document.querySelector("#optionsButton");
		optionsButton.addEventListener("click", showOptionsMenu);

		const chatOptionsButton = <HTMLButtonElement>document.querySelector("#chatOptionsButton");
		chatOptionsButton.addEventListener("click", showChatOptionsMenu);
	};

	const onUnload = () => {
		const sendMessageButton = <HTMLButtonElement>document.querySelector("#sendMessage");
		sendMessageButton.removeEventListener("click", handleSendMessage);

		const optionsButton = <HTMLButtonElement>document.querySelector("#optionsButton");
		optionsButton.removeEventListener("click", showOptionsMenu);

		const chatOptionsButton = <HTMLButtonElement>document.querySelector("#chatOptionsButton");
		chatOptionsButton.removeEventListener("click", showChatOptionsMenu);
	};

	return [template, onLoad, onUnload];
};

const sendMessage = (message: string) => {
	console.log(`New message sent: ${message}`);
};
