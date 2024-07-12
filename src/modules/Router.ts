import { DefaultProps } from "../types";
import { Block } from "./Block";



class Route<PropsType extends DefaultProps> {
	private _block: Block<PropsType> | null = null;
	private _blockClass: typeof Block<PropsType>;
	private _props: PropsType;
	private _pathname: string;

	constructor(pathname: string, blockClass: typeof Block<PropsType>, props: PropsType) {
		this._pathname = pathname;
		this._blockClass = blockClass;
		this._props = props;
	}

	match(path: string) {
		return this._pathname === path;
	}


	render() {
		if (this._block === null) {
			this._block = new this._blockClass(this._props);

			if (this._block.render === undefined) {
				throw new Error(`Render not defined for block ${this._blockClass}`);
			}
		}

		return this._block.getContent();
	}

	leave() {
		if (this._block !== null) {
			this._block.hide();
		}
	}
};


export class Router {
	private _routes: Route<DefaultProps>[];
	private _currentRoute: Route<DefaultProps> | null = null; 
	private __instance: Router | null = null;
	private _rootElementQuery: string;

	constructor(rootElementQuery: string) {
		if (this.__instance !== null) {
			this._routes = this.__instance._routes;
			this._rootElementQuery = rootElementQuery;

			return this.__instance;
		}

		this._routes = [];
		this._rootElementQuery = rootElementQuery;
		
		this.__instance = this;
	}

	use<PropsType extends DefaultProps>(pathname: string, blockClass: typeof Block<PropsType>, props: PropsType) {
		const route = new Route<PropsType>(pathname, blockClass, props);

		this._routes.push(route);

		return this;
	}

	go(pathname: string) {
		window.history.pushState(
			{pathname: pathname},
			"",
			pathname
		);

		this._onRoute(pathname);
	}

	start() {
		window.addEventListener(
			"popstate",
			() => this._onRoute(window.location.pathname)
		);

		this._onRoute(window.location.pathname);
	}

	private _getRoute(pathname: string) {
		return this._routes.find(route => route.match(pathname));
	}

	private _onRoute(pathname: string) {
		const route = this._getRoute(pathname);

		if (route === undefined) {
			return;
		}

		if (this._currentRoute !== null) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		this._renderBlock(route.render());
	}

	private _renderBlock(frag: HTMLElement) {
		const rootElement = <HTMLElement>document.querySelector(this._rootElementQuery);

		rootElement.innerHTML = "";
		rootElement.appendChild(frag);
	}
}

