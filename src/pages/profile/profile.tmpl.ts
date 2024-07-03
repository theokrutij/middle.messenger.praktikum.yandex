import { InputField, props as inputFieldProps } from "../../components/InputField/InputField.tmpl";
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
	const openEditProfileModal = () => showModal(editProfileTemplate, editProfileOnLoad as () => void);
	const closeEditProfileModal = () => hideModal(EditProfileOnUnload as () => void);
	const openChangeProfilePhotoModal = () => showModal(changeProfilePhotoTemplate, changeProfilePhotoOnLoad as () => void);
	const closeChangeProfilePhotoModal = () => hideModal(changeProfilePhotoOnUnload as () => void);
	const openEditPasswordModal = () => showModal(editPasswordTemplate, editPasswordOnLoad as () => void);
	const closeEditPasswordModal = () => hideModal(editPasswordOnUnload as () => void);


	const [editProfileTemplate, editProfileOnLoad, EditProfileOnUnload] = editProfile({onClose: closeEditProfileModal}); 
	const [changeProfilePhotoTemplate, changeProfilePhotoOnLoad, changeProfilePhotoOnUnload] = changeProfilePhoto({onClose: closeChangeProfilePhotoModal});
	const [editPasswordTemplate, editPasswordOnLoad, editPasswordOnUnload] = editPassword({onClose: closeEditPasswordModal});

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
					<h2 class=${classes.username}>${display_name !== null ? display_name : username}</h2>
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
		<div id="modalLayer" class="${classes.modalLayer} hidden"></div>

	`
	;

	const onLoad = () => {
		const closeButton = <HTMLButtonElement>document.querySelector("#close");
		closeButton.addEventListener("click", onClose);

		const editButton = <HTMLButtonElement>document.querySelector("#editInfo");
		editButton.addEventListener("click", openEditProfileModal);

		const changeProfilePhotoButton = <HTMLButtonElement>document.querySelector("#changeProfilePhoto");
		changeProfilePhotoButton.addEventListener("click", openChangeProfilePhotoModal);

		const changePasswordButton = <HTMLButtonElement>document.querySelector("#changePassword");
		changePasswordButton.addEventListener("click", openEditPasswordModal);
	};

	const onUnload = () => {
		const closeButton = <HTMLButtonElement>document.querySelector("#close");
		closeButton.removeEventListener("click", onClose);

		const editButton = <HTMLButtonElement>document.querySelector("#editInfo");
		editButton.removeEventListener("click", openEditProfileModal);

		const changeProfilePhotoButton = <HTMLButtonElement>document.querySelector("#changeProfilePhoto");
		changeProfilePhotoButton.removeEventListener("click", openChangeProfilePhotoModal);

		const changePasswordButton = <HTMLButtonElement>document.querySelector("#changePassword");
		changePasswordButton.removeEventListener("click", openEditPasswordModal);
	};


	return [template, onLoad, onUnload];
};

const showModal = (modalHTML: string, onLoad: () => void) => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modalLayer");
	modalLayer.classList.toggle("hidden");
	modalLayer.innerHTML = modalHTML;
	onLoad();
};

const hideModal = (onUnload: () => void) => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modalLayer");
	modalLayer.classList.toggle("hidden");
	onUnload();
	modalLayer.innerHTML = "";
};

type editModalProps = {
	title: string,
	inputFieldsAsHTML: string,
	onClose: () => void
};

const editModal: Template<editModalProps> = ({
	title,
	onClose,
	inputFieldsAsHTML
}: editModalProps) => {
	const template = 
	`	
		<div class=${classes.modalWindow}>
			<header class=${classes.header}>${title}</header>
			<form class=${classes.form}>
				${inputFieldsAsHTML}
				<div class=${classes.controls}>
					<button class=${classes.button} id="save">Save</button>
					<button class=${classes.button} id="cancel">Cancel</button>
				</div>
			</form>
		</div>

	`
	;

	const onLoad = () => {
		const saveButton = <HTMLButtonElement>document.querySelector("#save");
		saveButton.addEventListener(
			"click", (event) => {
				event.preventDefault();
				onClose();
		});

		const cancelButton = <HTMLButtonElement>document.querySelector("#cancel");
		cancelButton.addEventListener(
			"click", (event) => {
				event.preventDefault();
				onClose();
		});
	};

	const onUnload = () => {
		const saveButton = <HTMLButtonElement>document.querySelector("#save");
		saveButton.removeEventListener(
			"click", (event) => {
				event.preventDefault();
				onClose();
		});
		const cancelButton = <HTMLButtonElement>document.querySelector("#cancel");
		cancelButton.removeEventListener(
			"click", (event) => {
				event.preventDefault();
				onClose();
		});
	};

	return [template, onLoad, onUnload];
};

const editProfile: Template<{onClose: () => void}> = ({onClose}) => {
	const inputFields = [
		InputField({
			label: "Username", 
			inputType: "text", 
			name: "login", 
			id: "login",
			placeholder: "Enter new username..."
		}),
		InputField({
			label: "Display name", 
			inputType: "text", 
			name: "display_name", 
			id: "display_name",
			placeholder: "Enter new display name..."
		}),
		InputField({
			label: "First name",
			inputType: "text",
			name: "first_name",
			id: "first_name",
			placeholder: "Enter new first name..."
		}),
		InputField({
			label: "Last name",
			inputType: "text", 
			name: "second_name", 
			id: "second_name",
			placeholder: "Enter new last name..."
		}),
		InputField({
			label: "Email",
			inputType: "email", 
			name: "email", 
			id: "email",
			placeholder: "Enter new email address..."		
		}),
		InputField({
			label: "Phone",
			inputType: "phone", 
			name: "phone", 
			id: "phone",
			placeholder: "Enter new phone number..."		
		}),
	];
	const [template, onLoad, onUnload] = editModal({
		title: "Edit profile",
		inputFieldsAsHTML: inputFields.map(([template]) => template).join("\n"), 
		onClose: onClose
	});

	return [template, onLoad, onUnload];
};

const editPassword: Template<{onClose: () => void}> = ({onClose}) => {
	const inputFields = [
		InputField({
			label: "Old password",
			inputType: "password",
			name: "oldPassword",
			id: "oldPassword",
			placeholder: "Enter your current password..."
		}),
		InputField({
			label: "New password",
			inputType: "password",
			name: "newPassword",
			id: "newPassword",
			placeholder: "Enter new password..."
		}),
		InputField({
			label: "New password (repeat)",
			inputType: "password",
			name: "repeatNewPassword",
			id: "repeatNewPassword",
			placeholder: "Repeat new password..."
		})

	];
	const [template, onLoad, onUnload] = editModal({
		title: "Edit password",
		inputFieldsAsHTML: inputFields.map(([template]) => template).join("\n"), 
		onClose: onClose
	});

	return [template, onLoad, onUnload];
};

const changeProfilePhoto: Template<{onClose: () => void}> = ({onClose}) => {
	const inputFields = [
		InputField({
			label: "New avatar URL", 
			inputType: "text", 
			name: "avatar", 
			id: "avatar",
			placeholder: "Paste link to your new avatar..."
		})
	];
	const [template, onLoad, onUnload] = editModal({
		title: "Change profile photo",
		inputFieldsAsHTML: inputFields.map(([template]) => template).join("\n"), 
		onClose: onClose
	});

	return [template, onLoad, onUnload];
};