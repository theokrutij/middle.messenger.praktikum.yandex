import { DefaultProps } from "../types";
import { EventBus } from "./EventBus";


enum EVENTS {
	INIT = "init",
	RENDER = "render",
	COMPONENT_DID_MOUNT = "component-did-mount",
	COMPONENT_DID_UPDATE = "component-did-update",
}


export class Block<Props extends DefaultProps> {
	props: Props;
	tagName: string;
	id?: string;
	template? (props: Props): string;

	private _eventBus: EventBus;
	private _element!: HTMLElement;

	constructor(props: Props, tagName="div") {
		this.tagName = tagName;
		this.props = this._makePropsProxy(props);

		if (props.id !== undefined) {
			this.id = props.id;
		}

		

		this._eventBus = new EventBus();
		this._registerEvents(this._eventBus);

		this._eventBus.emit(EVENTS.INIT);
	}

	render?(): DocumentFragment;

	componentDidMount?(): void;
	componentDidUpdate?(oldProps: Props, newProps: Props): boolean;

	compile(template: string, childrenStubs: {[key: string]: Block<DefaultProps>} = {}) {
		const fragment = document.createElement("template");

		fragment.innerHTML = template;

		Object.entries(childrenStubs).forEach(([stubId, child]) => {
			const stub = <HTMLElement>fragment.content.querySelector(`#${stubId}`);
			stub.replaceWith(child.getContent());
		});


		return fragment.content;
	}

	dispatchComponentDidMount() {
		this._eventBus.emit(EVENTS.COMPONENT_DID_MOUNT);
	}

	getContent() {
		return this._element;
	}

	setProps(newProps: Props) {
		const oldProps = this.props;
		Object.assign(this.props, newProps);

		this._componentDidUpdate(oldProps, newProps);
	}

	show() {
		this._element.style.display = "block";
	}
	  
	hide() {
		this._element.style.display = "none";
	}

	private _makePropsProxy(props: Props) {
		const isPrivate = (name: string) => name[0] === "_";

		return new Proxy(
			props,
			{
				get: (target, prop: string,) => {
					if (isPrivate(prop)) {
						throw new Error(`${prop} is private`);
					}
					else {
						const val: unknown = target[prop as keyof DefaultProps];
						return typeof val === "function" ? val.bind(target) : val;
					}
				},
				set: () => {
					throw new Error("use Block.setProps to update props");
				},
				deleteProperty: () => {
					throw new Error("use Block.setProps to update props");
				}
			}
		);
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(EVENTS.INIT, this._init.bind(this));
		eventBus.on(EVENTS.RENDER, this._render.bind(this));
		eventBus.on(EVENTS.COMPONENT_DID_MOUNT, this._componentDidMount.bind(this));
		eventBus.on(EVENTS.COMPONENT_DID_UPDATE, this._render.bind(this));
	}

	private _init() {
		this._createElement();
		this._eventBus.emit(EVENTS.RENDER);
	}

	private _createElement() {
		this._element = document.createElement(this.tagName);
		if (this.props.id) {
			this._element.id = this.props.id;
		}
		if (this.props.className) {
			this._element.className = this.props.className;
		}
	}

	private _render() {
		this._removeEventListeners();
		if (this.render !== undefined) {
			this._element.innerHTML = "";
			this._element.appendChild(this.render());
		}
		else if (this.props.textContent !== undefined) {
			this._element.textContent = this.props.textContent;
		}
		this._addEventListeners();
	}

	private _addEventListeners() {
		const {events = {}} = this.props;
		Object.entries(events).forEach(
			([event, handler]) => this._element.addEventListener(event, handler)
		);
	}

	private _removeEventListeners() {
		const {events = {}} = this.props;
		Object.entries(events).forEach(
			([event, handler]) => this._element.removeEventListener(event, handler)
		);
	}

	private _componentDidMount() {		
		if (this.componentDidMount !== undefined) {
			this.componentDidMount();
		}
	}

	private _componentDidUpdate(oldProps: Props, newProps: Props) {
		const didUpdate = this.componentDidUpdate === undefined || this.componentDidUpdate(oldProps, newProps);
		if (didUpdate) {
			this._eventBus.emit(EVENTS.COMPONENT_DID_UPDATE);
		}
	}
};

