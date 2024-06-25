import { LoginPage } from "./pages/login.tmpl";
import { Template } from "./types";
import "./style.css"


function renderPage(page: Template): void {
	const [pageHTML, onLoad] = page();
	document.querySelector<HTMLDivElement>("#app")!.innerHTML = pageHTML;
	onLoad();
}


document.addEventListener(
	"DOMContentLoaded", 
	() => renderPage(LoginPage)
);