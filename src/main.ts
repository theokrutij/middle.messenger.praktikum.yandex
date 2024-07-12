import { LoginPage } from "./pages/login/login.tmpl";
import { SignupPage } from "./pages/signup/signup.tmpl";
import { MainPage } from "./pages/main/main.tmpl";
// import { NotFoundPage } from "./pages/notFound/notFound.tmpl";
// import { ServerErrorPage } from "./pages/serverError/serverError.tmpl";
import { ProfilePage } from "./pages/profile/profile.tmpl";
import { User } from "./types";

import { Router } from "./modules/Router";


import "./global.css";
import { NotFoundPage } from "./pages/notFound/notFound.tmpl";

const DUMMY_USER: User = {
	username: "JD",
	firstName: "John",
	secondName: "Dorian",
	displayName: null,
	avatarUrl: null,
	email: "jd_md@yandex.ru",
	phone: "+7(800)5553535"
};

const state = {
	user: DUMMY_USER
};

enum ROUTES {
	LOGIN = "/",
	SIGNUP = "/sign-up",
	MAIN = "/messenger",
	PROFILE = "/settings",
	NOT_FOUND = "/404"
};

const router = new Router("#app");
router
.use(
	ROUTES.LOGIN, 
	LoginPage, 
	{
		goToSignUp: () => router.go(ROUTES.SIGNUP),
		goToMain: () => router.go(ROUTES.MAIN)
	}
)
.use(
	ROUTES.SIGNUP,
	SignupPage,
	{
		returnToSignIn: () => router.go(ROUTES.LOGIN),
		confirmCreate: () => router.go(ROUTES.MAIN)
	}
)
.use(
	ROUTES.MAIN,
	MainPage,
	{
		goToProfile: () => router.go(ROUTES.PROFILE),
		logOut: () => router.go(ROUTES.LOGIN),
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
	}
)
.use(
	ROUTES.PROFILE,
	ProfilePage,
	{
		user: state.user,
		onClose: () => router.go(ROUTES.MAIN)
	}
)
.useAsNotFoundPage(
	NotFoundPage,
	{
		returnToMain: () => router.go(ROUTES.MAIN)
	}
);


document.addEventListener(
	"DOMContentLoaded",
	() => router.start()
);
