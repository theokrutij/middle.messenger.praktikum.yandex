import { Template, User } from "../../types";

import classes from "./profile.module.css";


type props = User & {
	onClose: () => void
}

export const ProfilePage: Template<props> = ({
	avatar_url,
	username,
	display_name,
	first_name,
	second_name,
	email,
	phone,
	onClose
}: props) => {
	const template = 
	`	
		<div class=${classes.wrapper}>
			<header class=${classes.header}>
				<button class=${classes.button} id="editInfo"><img src="/edit.svg" alt="editButton"></button>
				<h1 class=${classes.title}>Your profile</h1>
				<button class=${classes.button} id="close"><img src="/close.svg" alt="closeButton"></button>
			</header>
			<main class=${classes.main}>
				<div class=${classes.usernameAvatar}>
					<div class=${classes.avatar}>
						<img class=${classes.avatarImage} src=${avatar_url} alt="User avatar">
						<button class=${classes.button} id="changeProfilePhoto">Change photo</button>		
					</div>
					<h2 class=${classes.username}>${username}</h2>
				</div>
				<div class=${classes.userInfo}>
					<div class=${classes.userInfoField}>
						<h3 class=${classes.fieldName}>Name</h3><p class=${classes.fieldValue}>${first_name + " " + second_name}</p>
					</div>
					<div class=${classes.delimiter}></div>
					<div class=${classes.userInfoField}>
						<h3 class=${classes.fieldName}>Email</h3><p class=${classes.fieldValue}>${email}</p>
					</div>
					<div class=${classes.delimiter}></div>
					<div class=${classes.userInfoField}>
						<h3 class=${classes.fieldName}>Phone</h3><p class=${classes.fieldValue}>${phone}</p>
					</div>
				</div>
				<button class=${classes.button} id="changePassword">Change password</button>
			</main>
		</div>

	`
	;

	const onLoad = () => {
		const closeButton = <HTMLButtonElement>document.querySelector("#close");
		closeButton.addEventListener("click", onClose);
	};

	const onUnload = () => {
		const closeButton = <HTMLButtonElement>document.querySelector("#close");
		closeButton.removeEventListener("click", onClose);
	};


	return [template, onLoad, onUnload];
}

