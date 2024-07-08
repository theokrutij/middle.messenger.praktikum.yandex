const enum HTTPMethods {
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete"
}


export const customFetch = (
	url: string, 
	options: {
		method: HTTPMethods,
		headers?: {
			[key: string]: string
		},
		timeout?: number,
		body?: object,
		queryParams?: {
			[key: string]: queryParamValue
		}
} = {method: HTTPMethods.GET}) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		
		if (options.method === HTTPMethods.GET && options.queryParams !== undefined) {
			url = `${url}?${stringifyQuery(options.queryParams)}`;
		}
		xhr.open(options.method, url);

		if (options.headers !== undefined) {
			Object.entries(options.headers).forEach(
				([k, v]) => xhr.setRequestHeader(k, v)
			);
		}

		xhr.onload = () => resolve(xhr);

		xhr.onabort = reject;
		xhr.onerror = reject;

		if (options.timeout) {
			xhr.timeout = options.timeout;
		}
		xhr.ontimeout = reject;

		if (options.method === HTTPMethods.GET) {
			xhr.send();
		}
		else {
			xhr.send(JSON.stringify(options.body));
		}
	});
};


type queryParamValue = string | number | boolean | queryParamValue[] | {[key: string]: queryParamValue}
const stringifyQuery = (queryParams: {
	[key: string]: queryParamValue
}) => {
	const res = [];
	for (const key in queryParams) {
		if (Array.isArray(queryParams[key])) {
			res.push([key, `
				[
				${queryParams[key].toString()}
				]`
			]);
		}
		else {
			res.push([key, queryParams[key].toString()]);
		}
	}
	return res.map(
		([k, v]) => `${k}=${v}`
	).join("&");
};
