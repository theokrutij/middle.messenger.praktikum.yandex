import { InputField, props as InputFieldProps } from "../../components/InputField/InputField.tmpl";
import { printFormData, validateFields } from "../../modules/formActions";
import { Template, User } from "../../types";
import { hideModal, showModal } from "../../utils";

import classes from "./profile.module.css";


type props = User & {
	onClose: () => void
}

export const ProfilePage: Template<props> = ({
	avatarUrl,
	username,
	displayName,
	firstName,
	secondName,
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


	const [editProfileTemplate, editProfileOnLoad, EditProfileOnUnload] = editProfile({
		currentUsername: username,
		currentDisplayName: displayName,
		currentFirstName: firstName,
		currentSecondName: secondName,
		currentEmail: email,
		currentPhone: phone,
		onClose: closeEditProfileModal
	}); 
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
				<div class=${classes["username-avatar"]}>
					<div class=${classes.avatar}>
						<img class=${classes["avatar-image"]} src=${avatarUrl} alt="User avatar">
						<button class=${classes.button} id="changeProfilePhoto">Change photo</button>		
					</div>
					<h2 class=${classes.username}>${displayName !== null ? displayName : username}</h2>
				</div>
				<div class=${classes.info}>
					<div class=${classes.field}>
						<h3 class=${classes["field-name"]}>Name</h3><p class=${classes["field-value"]}>${firstName + " " + secondName}</p>
					</div>
					<div class=${classes.delimiter}></div>
					<div class=${classes.field}>
						<h3 class=${classes["field-name"]}>Email</h3><p class=${classes["field-value"]}>${email}</p>
					</div>
					<div class=${classes.delimiter}></div>
					<div class=${classes.field}>
						<h3 class=${classes["field-name"]}>Phone</h3><p class=${classes["field-value"]}>${phone}</p>
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

type editModalProps = {
	title: string,
	inputFieldProps: InputFieldProps[],
	onClose: () => void
};

const editModal: Template<editModalProps> = ({
	title,
	onClose,
	inputFieldProps
}: editModalProps) => {
	const inputFields = inputFieldProps.map(
		(props) => InputField(props)
	);
	const formId = title.replace(/\s/g, '') + "_form";
	const template = 
	`	
		<div class=${classes["modal-window"]}>
			<header class=${classes.header}>${title}</header>
			<form class=${classes.form} id=${formId}>
				<div class=${classes.fields}>
					${inputFields.map(([template]) => template).join("\n")}
				</div> 
				<div class=${classes.controls}>
					<button type="submit" class=${classes.button} id="save">Save</button>
					<button class=${classes.button} id="cancel">Cancel</button>
				</div>
			</form>
		</div>

	`
	;
	const handleFormSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		if (validateFields(inputFieldProps.map(({id}) => id))) {
			printFormData(event.target as HTMLFormElement);
			onClose();
		}
	};

	const onLoad = () => {
		inputFields.forEach(
			([,onLoad]) => (onLoad as () => void)()
		);

		const cancelButton = <HTMLButtonElement>document.querySelector("#cancel");
		cancelButton.addEventListener("click", onClose);

		const form = <HTMLFormElement>document.querySelector(`#${formId}`);
		form.addEventListener("submit", handleFormSubmit);
	};

	const onUnload = () => {
		const cancelButton = <HTMLButtonElement>document.querySelector("#cancel");
		cancelButton.removeEventListener("click", onClose);

		const form = <HTMLFormElement>document.querySelector(`#${formId}`);
		form.removeEventListener("submit", handleFormSubmit);
	};

	return [template, onLoad, onUnload];
};

type editProfileProps = {
	currentUsername: string,
	currentDisplayName: string | null,
	currentFirstName: string,
	currentSecondName: string,
	currentEmail: string,
	currentPhone: string,
	onClose: () => void
};

const editProfile: Template<editProfileProps> = ({
	currentUsername,
	currentDisplayName,
	currentFirstName,
	currentSecondName,
	currentEmail,
	currentPhone,
	onClose
}: editProfileProps) => {
	const inputFieldProps: InputFieldProps[] = [
		{
			label: "Username", 
			inputType: "text", 
			name: "login", 
			id: "login",
			placeholder: "Enter new username...",
			initialValue: currentUsername,
			minlength: 3,
			maxlength: 20,
			pattern: "^[a-zA-Z0-9_\\-]*[a-zA-Z]+[a-zA-Z0-9_\\-]*$",
			required: true
		},
		{
			label: "Display name", 
			inputType: "text", 
			name: "display_name", 
			id: "display_name",
			placeholder: "Enter new display name...",
			initialValue: currentDisplayName ? currentDisplayName : undefined
		},
		{
			label: "First name",
			inputType: "text",
			name: "first_name",
			id: "first_name",
			placeholder: "Enter new first name...",
			initialValue: currentFirstName,
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true
		},
		{
			label: "Last name",
			inputType: "text", 
			name: "second_name", 
			id: "second_name",
			placeholder: "Enter new last name...",
			initialValue: currentSecondName,
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true
		},
		{
			label: "Email",
			inputType: "email", 
			name: "email", 
			id: "email",
			placeholder: "Enter new email address...",
			initialValue: currentEmail,
			required: true
		},
		{
			label: "Phone",
			inputType: "tel", 
			name: "phone", 
			id: "phone",
			placeholder: "Enter new phone number...",
			initialValue: currentPhone,
			minlength: 10,
			maxlength: 15,
			pattern: "^\\+?[0-9]+$",
			required: true
		},
	];
	const [template, onLoad, onUnload] = editModal({
		title: "Edit profile",
		inputFieldProps: inputFieldProps, 
		onClose: onClose
	});

	return [template, onLoad, onUnload];
};

const editPassword: Template<{onClose: () => void}> = ({onClose}) => {
	const inputFieldProps: InputFieldProps[] = [
		{
			label: "Old password",
			inputType: "password",
			name: "oldPassword",
			id: "oldPassword",
			placeholder: "Enter your current password...",
			required: true
		},
		{
			label: "New password",
			inputType: "password",
			name: "newPassword",
			id: "newPassword",
			placeholder: "Enter new password...",
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
			required: true
		},
		{
			label: "New password (repeat)",
			inputType: "password",
			name: "repeatNewPassword",
			id: "repeatNewPassword",
			placeholder: "Repeat new password...",
			required: true
		}
	];
	const [template, onLoad, onUnload] = editModal({
		title: "Edit password",
		inputFieldProps: inputFieldProps, 
		onClose: onClose
	});

	return [template, onLoad, onUnload];
};

const changeProfilePhoto: Template<{onClose: () => void}> = ({onClose}) => {
	const inputFieldProps: InputFieldProps[] = [
		{
			label: "New avatar URL", 
			inputType: "text", 
			name: "avatar", 
			id: "avatar",
			placeholder: "Paste link to your new avatar..."
		}
	];
	const [template, onLoad, onUnload] = editModal({
		title: "Change profile photo",
		inputFieldProps: inputFieldProps, 
		onClose: onClose
	});

	return [template, onLoad, onUnload];
};
