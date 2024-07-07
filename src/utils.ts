import { Block } from "./modules/Block";
import { props } from "./types";


export const renderBlock = <Props extends props>(query: string, block: Block<Props>) => {
	const root = <HTMLElement>document.querySelector<HTMLDivElement>(query);
	root.innerHTML = "";

	root.appendChild(block.getContent());

	block.dispatchComponentDidMount();
};



export const showModal = (block: Block<props>) => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modal-layer");
	modalLayer.classList.remove("hidden");

	renderBlock("#modal-layer", block);
};

export const hideModal = () => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modal-layer");
	modalLayer.classList.add("hidden");
	modalLayer.innerHTML = "";
};
