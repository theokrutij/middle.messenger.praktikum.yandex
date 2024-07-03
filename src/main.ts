import { LoginPage } from "./pages/login/login.tmpl";
import { SignupPage } from "./pages/signup/signup.tmpl";
import { MainPage } from "./pages/main/main.tmpl";
import { notFoundPage } from "./pages/notFound/notFound.tmpl";
import { serverErrorPage } from "./pages/serverError/serverError.tmpl";
import { ProfilePage } from "./pages/profile/profile.tmpl";
import { Template, User, props } from "./types";

import "./global.css";

const DUMMY_USER: User = {
	username: "JD",
	first_name: "John",
	second_name: "Dorian",
	display_name: null,
	avatar_url: null,
	email: "jd_md@yandex.ru",
	phone: "+7(800)5553535"
};

enum Pages {
	login = "/login",
	signup = "/signup",
	main = "/",
	notFound = "/404",
	serverError = "/500",
	profile = "/profile"
};

const state = {
	currentPage: Pages.login,
	unloadPreviousPage: () => {},
	user: DUMMY_USER
};

const loadTemplate = <T extends props>(page: Template<T>, props: T) => {
	state.unloadPreviousPage();
	const [pageHTML, onLoad, onUnload] = page(props);
	if (onUnload !== undefined) {
		state.unloadPreviousPage = onUnload;
	}
	else {
		state.unloadPreviousPage = () => {}
	}
	document.querySelector<HTMLDivElement>("#app")!.innerHTML = pageHTML;

	if (onLoad !== undefined) {
		onLoad();
	}
}

const renderLogInPage = () => {
	loadTemplate(
		LoginPage, 
		{
			goToSignUp: () => navigateToPage(Pages.signup),
			goToMain: () => navigateToPage(Pages.main)
		}
	);
	// window.location.href = "/login";
};
const renderSignUpPage = () => {
	loadTemplate(
		SignupPage, 
		{
			returnToSignIn: () => navigateToPage(Pages.login),
			confirmCreate: () => navigateToPage(Pages.main)
		}
	);
};
const renderMainPage = () => {
	loadTemplate(
		MainPage,
		{
			goToLogin: () => navigateToPage(Pages.login),
			goToSignUp: () => navigateToPage(Pages.signup),
			goToError404: () => navigateToPage(Pages.notFound),
			goToError500: () => navigateToPage(Pages.serverError),
			goToProfile: () => navigateToPage(Pages.profile)
		}
	);
};
const renderNotFoundPage = () => {
	loadTemplate(
		notFoundPage, 
		{
			returnToMainPage: () => navigateToPage(Pages.main),
		}
	);
};
const renderServerErrorPage = () => {
	loadTemplate(serverErrorPage, {});
};
const renderProfilePage = () => {
	loadTemplate(
		ProfilePage,
		{
			...state.user,
			onClose: () => navigateToPage(Pages.main)
		}
	);
};

const renderPage = (page: string) => {
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
}

const navigateToPage = (page: Pages) => {
	window.history.pushState({page: page}, "", page);
	renderPage(page);
	state.currentPage = page;
};


document.addEventListener(
	"DOMContentLoaded",
	() => {
		const pageInWindowState = window.history.state !== null && "page" in window.history.state;
		const locationPathIsValidPage = Object.values(Pages).includes(window.location.pathname as Pages);

		if (pageInWindowState) {
			state.currentPage = window.history.state["page"];	
		}
		else if (locationPathIsValidPage) {
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
