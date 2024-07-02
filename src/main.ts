import { LoginPage } from "./pages/login/login.tmpl";
import { SignupPage } from "./pages/signup/signup.tmpl";
import { MainPage } from "./pages/main/main.tmpl";
import { notFoundPage } from "./pages/notFound/notFound.tmpl";
import { serverErrorPage } from "./pages/serverError/serverError.tmpl";
import { Template, props } from "./types";

import "./global.css";


const state = {
	onUnload: () => {}
};

const renderPage = <T extends props>(page: Template<T>, props: T) => {
	state.onUnload();
	const [pageHTML, onLoad, onUnload] = page(props);
	if (onUnload !== undefined) {
		state.onUnload = onUnload;
	}
	else {
		state.onUnload = () => {}
	}
	document.querySelector<HTMLDivElement>("#app")!.innerHTML = pageHTML;

	if (onLoad !== undefined) {
		onLoad();
	}
}


const renderLogInPage = () => {
	window.history.pushState({page: "login"}, "", "/login");
	renderPage(
		LoginPage, 
		{
			goToSignUp: renderSignUpPage,
			goToMain: renderMainPage
		}
	);
	// window.location.href = "/login";
};
const renderSignUpPage = () => {
	window.history.pushState({page: "signup"}, "", "/signup");
	renderPage(
		SignupPage, 
		{
			returnToSignIn: renderLogInPage, 
			confirmCreate: renderMainPage
		}
	);
};
const renderMainPage = () => {
	window.history.pushState({page: "main"}, "", "/");
	renderPage(
		MainPage,
		{
			goToLogin: renderLogInPage,
			goToSignUp: renderSignUpPage,
			goToError404: renderNotFoundPage,
			goToError500: renderServerErrorPage
		}
	);
};
const renderNotFoundPage = () => {
	window.history.pushState({page: "error404"}, "", "/404");
	renderPage(
		notFoundPage, 
		{
			returnToMainPage: renderMainPage
		}
	);
};
const renderServerErrorPage = () => {
	window.history.pushState({page: "error500"}, "", "/500");
	renderPage(serverErrorPage, {});
};
 
document.addEventListener(
	"DOMContentLoaded", 
	() => {
		if (window.history.state !== null && "page" in window.history.state) {
			switch (window.history.state["page"]) {
				case "main":
					renderMainPage();
					break;
				case "signup":
					renderSignUpPage();
					break;
				default:
					renderLogInPage();
			}
		}
		else {
			renderLogInPage();
		}
	}
);

window.addEventListener(
	"popstate",
	(event) => {
		if (event.state && "page" in event.state) {
			switch (event.state["page"]) {
				case "main":
					renderMainPage();
					break;
				case "signup":
					renderSignUpPage();
					break;
				default:
					renderLogInPage();
			}
		}
		else {
			renderLogInPage();
		}
	}
);
