/** @type {import('./$types').PageLoad} */
export async function load() {
	const res = await fetch('https://selfprinting.es/materiales-rigidos/impresion-forex.html');
	const html = await res.text();

	return {
		html
	};
}
