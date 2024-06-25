type props = {
	inputType: "text" | "password" | "email" | "phone",
	name: string,
	id: string

}

export const InputField = ({inputType, name, id}: props): [string, () => void] => {
	const template = 		
		`
		<input type=${inputType} name=${name} id=${id}>
		`
	;
	const onload = () => {};

	return [template, onload];
}