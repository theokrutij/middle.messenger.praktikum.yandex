export const showModal = (modalHTML: string, onLoad: () => void) => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modal-layer");
	modalLayer.classList.remove("hidden");
	modalLayer.innerHTML = modalHTML;
	onLoad();
};

export const hideModal = (onUnload: () => void) => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modal-layer");
	modalLayer.classList.add("hidden");
	onUnload();
	modalLayer.innerHTML = "";
};

