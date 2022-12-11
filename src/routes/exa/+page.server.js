/** @type {import('./$types').PageLoad} */
export async function load() {
	const res = await fetch('https://www.exaprint.es/Tarjetas/simple-clasica/');
	const html = await res.text();

	return {
		html
	};
}
