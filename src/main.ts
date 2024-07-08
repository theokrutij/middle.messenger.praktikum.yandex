import { LoginPage } from "./pages/login/login.tmpl";
import { SignupPage } from "./pages/signup/signup.tmpl";
import { MainPage } from "./pages/main/main.tmpl";
import { NotFoundPage } from "./pages/notFound/notFound.tmpl";
import { ServerErrorPage } from "./pages/serverError/serverError.tmpl";
import { ProfilePage } from "./pages/profile/profile.tmpl";
import { User } from "./types";

import "./global.css";
import { renderBlock } from "./utils";

const DUMMY_USER: User = {
	username: "JD",
	firstName: "John",
	secondName: "Dorian",
	displayName: null,
	avatarUrl: null,
	email: "jd_md@yandex.ru",
	phone: "+7(800)5553535"
};

enum Pages {
	login = "/",
	signup = "/sign-up",
	main = "/messenger",
	profile = "/settings",
	notFound = "/404",
	serverError = "/500",
};

const isValidPage = (page: string) =>  Object.values(Pages).includes(page as Pages);

const state = {
	currentPage: Pages.login,
	unloadPreviousPage: () => {},
	user: DUMMY_USER
};



const loginPage = new LoginPage({
	goToSignUp: () => navigateToPage(Pages.signup),
	goToMain: () => navigateToPage(Pages.main)
});
const renderLogInPage = () => {
	renderBlock("#app", loginPage);
};

const signupPage = new SignupPage({
	returnToSignIn: () => navigateToPage(Pages.login),
	confirmCreate: () => navigateToPage(Pages.main)
});
const renderSignUpPage = () => {
	renderBlock("#app", signupPage);
};

const mainPage = new MainPage({
	goToProfile: () => navigateToPage(Pages.profile),
	logOut: () => navigateToPage(Pages.login),
	chats: [
		{
			name: "Real talk",
			lastMessage: {
				author: "You",
				text: "Hey",
				datetime: "Today, 12:04"
			},
			unreadCount: 3
		},
	],
	currenChatMessages: [
		{
			text: "heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeey",
			datetime: "Today, 12:03",
			id: "lkaiqurq12123"	
		},
		{
			text: "hey",
			datetime: "Today, 16:20",
			id: "ut3asd",
			own: true
		}

	]
});
const renderMainPage = () => {
	renderBlock("#app", mainPage);
};
const notFoundPage = new NotFoundPage({returnToMain: () => {console.log("return to main"); navigateToPage(Pages.main);}});
const renderNotFoundPage = () => {
	renderBlock("#app", notFoundPage);
};

const serverErrorPage = new ServerErrorPage({});
const renderServerErrorPage = () => {
	renderBlock("#app", serverErrorPage);
};

const profilePage = new ProfilePage({
	user: state.user,
	onClose: () => navigateToPage(Pages.main)
});
const renderProfilePage = () => {
	renderBlock("#app", profilePage);
};

const renderPage = (page: string) => {
	state.currentPage = isValidPage(page) ? page as Pages : Pages.notFound;
	switch (page) {
		case Pages.login:
			renderLogInPage();
			break;
		case Pages.signup:
			renderSignUpPage();
			break;
		case Pages.main:
			renderMainPage();
			break;
		case Pages.notFound:
			renderNotFoundPage();
			break;
		case Pages.serverError:
			renderServerErrorPage();
			break;
		case Pages.profile:
			renderProfilePage();
			break;
		default:
			renderNotFoundPage();
	}
};

const navigateToPage = (page: Pages) => {
	window.history.pushState({page: page}, "", page);
	renderPage(page);
};


document.addEventListener(
	"DOMContentLoaded",
	() => {
		const modalLayer = <HTMLElement>document.querySelector("#modal-layer");
		modalLayer.addEventListener("click", (event) => {
			if (event.target === event.currentTarget) {
				modalLayer.innerHTML = "";
				modalLayer.classList.add("hidden");
			} 
		});
		const pageInWindowState = window.history.state !== null && "page" in window.history.state;

		if (pageInWindowState) {
			state.currentPage = window.history.state["page"];	
		}
		else if (isValidPage(window.location.pathname)) {
			state.currentPage = window.location.pathname as Pages;
		}
		else {
			state.currentPage = Pages.notFound;
		}

		navigateToPage(state.currentPage);
	}
);

window.addEventListener(
	"popstate", 
	(event) => {
		if (event.state && "page" in event.state) {
			renderPage(event.state["page"]);
		}
		else {
			renderPage(Pages.notFound);
		}
	}
);
