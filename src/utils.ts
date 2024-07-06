type State = {
	onHide: ((event: MouseEvent) => void) | null
} 

const state: State = {
	onHide: null
};

export const showModal = (modalHTML: string, onLoad: () => void, onUnload: () => void) => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modal-layer");
	state.onHide = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			hideModal(onUnload);
		}
	};
	modalLayer.addEventListener(
		"click", 
		state.onHide
	);
	modalLayer.classList.remove("hidden");
	modalLayer.innerHTML = modalHTML;
	onLoad();
};

export const hideModal = (onUnload: () => void) => {
	const modalLayer = <HTMLDivElement>document.querySelector("#modal-layer");
	modalLayer.removeEventListener(
		"click",
		state.onHide as (event: MouseEvent) => void
	);
	modalLayer.classList.add("hidden");
	onUnload();
	modalLayer.innerHTML = "";
};
