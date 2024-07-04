import { ChatCard } from "../../components/ChatCard/ChatCard.tmpl";
import { InputField } from "../../components/InputField/InputField.tmpl";
import { Message, props as MessageProps } from "../../components/Message/Message.tmpl";
import { Template } from "../../types";

import classes from "./main.module.css";


type props = {
	messageProps: MessageProps[]
}

export const MainPage: Template<props> = ({
	messageProps
}: props) => {
	const chatCards = [
		ChatCard(null),
		ChatCard(null)
	];
	const searchField = InputField({
		inputType: "text",
		name: "search",
		id: "searchField",
		placeholder: "Search..."
	});
	const newMessageField = InputField({
		inputType: "text",
		name: "newMessage",
		id: "newMessage",
		placeholder: "Message..."
	});
	const messages = messageProps.map(
		(props) => Message(props)
	);

	const template = 
	`
		<main class=${classes.page}>
			<div class=${classes.sidebar}>
				<header class=${classes.header}>
					<button class=${classes["icon-button"]}><img class=${classes["burger-icon"]} src="/burger.svg" alt="optionsButton"></button>
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
					<button class=${classes["icon-button"]}><img class=${classes["dots-icon"]} src="/chatMenu.svg" alt="chatMenuButton"></button>
				</header>
				<div class=${classes.messages}>
					${messages.map(([template]) => template).join("\n")}
				</div>
				<div class=${classes.controls}>
					<div class=${classes["new-message-wrap"]}>
						${newMessageField[0]}
					</div>
					<button class=${classes["icon-button"]}><img class=${classes["send-button-icon"]} src="/send.svg" alt="sendButton"></button>
				</div>
			</div>
		</main>
	`;

	const onLoad = () => {

	};

	const onUnload = () => {

	};

	return [template, onLoad, onUnload];
};
