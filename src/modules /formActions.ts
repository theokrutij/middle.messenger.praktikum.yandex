export const printFormData = (form: HTMLFormElement) => {
	const fd = new FormData(form);
	const fdAsString = [...fd.entries()].map(
		([k, v]) => `${k}=${v}`
	).join("\n");
	console.log(fdAsString);
};

export const validateFields = (fieldIds: string[]) => {
	let fieldsAreValid = true;
	fieldIds.forEach((id) => {
		const inputElement = <HTMLInputElement>document.querySelector(`#${id}`);
		const fieldIsValid = inputElement.reportValidity() ;
		if (!fieldIsValid) {
			fieldsAreValid = false;
		}
	});

	return fieldsAreValid;
};
