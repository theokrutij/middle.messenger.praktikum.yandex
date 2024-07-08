import { Block } from "../../modules/Block";
import { DefaultProps, User } from "../../types";
import { IconButton } from "../../components/IconButton/IconButton.tmpl";
import classes from "./profile.module.css";
import { InputField } from "../../components/InputField/InputField.tmpl";
import { hideModal, showModal } from "../../utils";
import { printFormData } from "../../modules/formActions";


type ProfilePageProps = DefaultProps & {
	user: User,
	onClose: () => void
}


export class ProfilePage extends Block<ProfilePageProps> {
	constructor(props: ProfilePageProps) {
		super(props);
	}

	template() {
		const {username, avatarUrl, displayName, firstName, secondName, email, phone} = this.props.user;
		const template = 
		`	
		<div class=${classes.wrapper}>
			<header class=${classes.header}>
				<div id="editInfoButton"></div>
				<h1 class=${classes.title}>Your profile</h1>
				<div id="closeButton"></div>
			</header>
			<main class=${classes.main}>
				<div class=${classes["username-avatar"]}>
					<div class=${classes.avatar}>
						<img class=${classes["avatar-image"]} src=${avatarUrl} alt="User avatar">
						<div id="changePhotoButton"></div>
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
				<div id="changePasswordButton"></div>
			</main>
		</div>
		`;
		return template;
	}

	render() {
		const editInfoButton = new IconButton({
			url: "/edit.svg",
			alt: "editInfoButton",
			events: {
				"click": () => showModal(editInfoModal)
			}
		});
		const closeButton = new IconButton({
			url: "/close.svg",
			alt: "closeButton",
			events: {
				"click": this.props.onClose
			}
		});
		const changePhotoButton = new Block({
			textContent: "Change photo",
			className: classes.button,
			events: {
				"click": () => showModal(changeAvatarModal)
			}
		}, "button");
		const changePasswordButton = new Block({
			textContent: "Change password",
			className: classes.button,
			events: {
				"click": () => showModal(changePasswordModal)
			}

		}, "button");
		const editInfoModal = new EditInfoModal({
			user: this.props.user,
			onSave: hideModal,
			className: classes["modal-window"]
		});
		const changeAvatarModal = new ChangeAvatarModal({
			onSave: hideModal,
			className: classes["modal-window"]
		});
		const changePasswordModal = new ChangePasswordModal({
			onSave: hideModal,
			className: classes["modal-window"]
		});
		return this.compile(
			this.template(),
			{
				"editInfoButton": editInfoButton,
				"closeButton": closeButton,
				"changePhotoButton": changePhotoButton,
				"changePasswordButton": changePasswordButton
			}

		);
	}
};


type EditModalProps = DefaultProps & {
	user: User,
	onSave: (...args: unknown[]) => unknown,
}

class EditInfoModal extends Block<EditModalProps> {
	constructor(props: EditModalProps) {
		super({...props});
	}

	template () {
		const template = 
		`
		<header class=${classes.header}>Edit profile</header>
		<form class=${classes.form} id="editInfoForm">
			<div class=${classes.fields}>
				<div id="displayName"></div>
				<div id="username"></div>
				<div id="firstName"></div>
				<div id="secondName"></div>
				<div id="email"></div>
				<div id="phone"></div>
			</div> 
			<div class=${classes.controls}>
				<div id="saveButton"></div>
				<div id="cancelButton"></div>
			</div>
		</form>
		`;
		
		return template;
	}

	render() {
		const displayNameInputField = new InputField({
			label: "Display name", 
			inputType: "text", 
			name: "display_name", 
			id: "display_name",
			placeholder: "Enter new display name...",
			initialValue: this.props.user.displayName ? this.props.user.displayName : ""
		});
		const usernameInputField = new InputField({
			label: "Username",
			inputType: "text",
			name: "login",
			id: "login",
			placeholder: "Enter your username...",
			minlength: 3,
			maxlength: 20,
			pattern: "^[a-zA-Z0-9_\\-]*[a-zA-Z]+[a-zA-Z0-9_\\-]*$",
			required: true,
			initialValue: this.props.user.username
		});
		const firstNameInputField = new InputField({
			label: "First name", 
			inputType: "text", 
			name: "first_name", 
			id: "first_name",
			placeholder: "Enter your first name...",
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true,
			initialValue: this.props.user.firstName
		});
		const secondNameInputField = new InputField({
			label: "Last name",
			inputType: "text", 
			name: "second_name", 
			id: "second_name",
			placeholder: "Enter your last name...",
			pattern: "^[A-ZА-Я][a-zA-Zа-яА-Я\\-]*$",
			required: true,
			initialValue: this.props.user.secondName
		});
		const emailInputField = new InputField({
			label: "Email",
			inputType: "email", 
			name: "email", 
			id: "email",
			placeholder: "Enter your email address...",
			required: true,
			initialValue: this.props.user.email
		});
		const phoneInputField = new InputField({
			label: "Phone",
			inputType: "tel", 
			name: "phone", 
			id: "phone",
			placeholder: "Enter your phone number...",
			minlength: 10,
			maxlength: 15,
			pattern: "^\\+?[0-9]+$",
			required: true,
			initialValue: this.props.user.phone
		});

		const saveButton = new Block({
			className: classes.button,
			textContent: "Confirm",
			events: {
				"click": (event) => {
					event.preventDefault();

					const fieldsAreValid = (
						displayNameInputField.validate() &&
						usernameInputField.validate() &&
						firstNameInputField.validate() &&
						secondNameInputField.validate() &&
						emailInputField.validate() &&
						phoneInputField.validate()
					);

					if (fieldsAreValid) {
						const form = <HTMLFormElement>document.querySelector("#editInfoForm");
						printFormData(form);

						this.props.onSave(event);
					}
				}
				}
		}, "button");
		const cancelButton = new Block({
			className: classes.button,
			textContent: "Cancel",
			events: {"click": () => hideModal()}
		}, "button");

		return this.compile(
			this.template(),
			{
				"displayName": displayNameInputField,
				"username": usernameInputField,
				"firstName": firstNameInputField,
				"secondName": secondNameInputField,
				"email": emailInputField,
				"phone": phoneInputField,
				"saveButton": saveButton,
				"cancelButton": cancelButton
			}
		);
	}
};


type ChangePasswordModalProps = DefaultProps & {
	onSave: () => void;
}
class ChangePasswordModal extends Block<ChangePasswordModalProps> {
	constructor(props: ChangePasswordModalProps) {
		super(props);
	}

	template() {
		const template = 
		`
		<header class=${classes.header}>Change password</header>
		<form class=${classes.form} id="changePasswordForm">
			<div class=${classes.fields}>
				<div id="passwordField"></div>
				<div id="repeatPasswordField"></div>
			</div> 
			<div class=${classes.controls}>
				<div id="saveButton"></div>
				<div id="cancelButton"></div>
			</div>
		</form>
		`;

		return template;
	}

	render() {
		const passwordInputField = new InputField({
			label: "Password",
			inputType: "password",
			name: "password",
			id: "password",
			placeholder: "Enter new password...",
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
			required: true
		});
		const repeatPasswordInputField = new InputField({
			label: "Repeat password",
			inputType: "password",
			name: "repeat_password",
			id: "repeat_password",
			placeholder: "Repeat new password...",
			required: true
		});

		const saveButton = new Block({
			className: classes.button,
			textContent: "Confirm",
			events: {
				"click": (event: Event) => {
					event.preventDefault();
					const passwordInput = <HTMLInputElement>passwordInputField.getContent().querySelector("input");
					const repeatPasswordInput = <HTMLInputElement>repeatPasswordInputField.getContent().querySelector("input");

					const passwordsMatch = passwordInput.value === repeatPasswordInput.value;
					if (!passwordsMatch) {
						passwordInput.setCustomValidity("Passwords must match");
						repeatPasswordInput.setCustomValidity("Passwords must match");
					}
					else {
						passwordInput.setCustomValidity("");
						repeatPasswordInput.setCustomValidity("");
					}
					passwordInput.reportValidity();
					repeatPasswordInput.reportValidity();

					const fieldsAreValid =(
						passwordInputField.validate() &&
						repeatPasswordInputField.validate() &&
						passwordsMatch
					);

					if (fieldsAreValid) {
						const form = <HTMLFormElement>document.querySelector("#changePasswordForm");
						printFormData(form);

						this.props.onSave();
					}
				}
			}
		}, "button");
		const cancelButton = new Block({
			className: classes.button,
			textContent: "Cancel",
			events: {"click": () => hideModal()}
		}, "button");

		return this.compile(
			this.template(),
			{
				"passwordField": passwordInputField,
				"repeatPasswordField": repeatPasswordInputField,
				"saveButton": saveButton,
				"cancelButton": cancelButton
			}
		);
	}
}


type ChangeAvatarModalProps = DefaultProps & {
	onSave: () => void
}
class ChangeAvatarModal extends Block<ChangeAvatarModalProps> {
	constructor(props: ChangeAvatarModalProps) {
		super(props);
	}

	template() {
		const template = 
		`
		<header class=${classes.header}>Change avatar</header>
		<form class=${classes.form} id="changeAvatarForm">
			<div class=${classes.fields}>
				<div id="newAvatarUrl"></div>
			</div> 
			<div class=${classes.controls}>
				<div id="saveButton"></div>
				<div id="cancelButton"></div>
			</div>
		</form>
		`;
	
		return template;
	}

	render() {
		const newAvatarUrlInputField = new InputField({
			label: "New avatar URL", 
			inputType: "text", 
			name: "avatar", 
			id: "avatar",
			placeholder: "Paste link to your new avatar..."
		});

		const saveButton = new Block({
			className: classes.button,
			textContent: "Confirm",
			events: {
				"click": () => {
					const form = <HTMLFormElement>document.querySelector("#changeAvatarForm");
					printFormData(form);

					this.props.onSave();
				} 
			}
		}, "button");
		const cancelButton = new Block({
			className: classes.button,
			textContent: "Cancel",
			events: {"click": () => hideModal()}
		}, "button");

		return this.compile(
			this.template(),
			{
				"newAvatarUrl": newAvatarUrlInputField,
				"saveButton": saveButton,
				"cancelButton": cancelButton
			}
		);
	}

};
