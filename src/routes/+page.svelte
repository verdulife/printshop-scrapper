<script>
	import { onMount } from 'svelte';

	export let data;
	let doc, srcdoc;

	onMount(() => {
		doc = document.createElement('html');
		const base = document.createElement('base');
		doc.innerHTML = data.html;

		const head = doc.querySelector('head');
		base.href = 'https://selfprinting.es/';
		head.appendChild(base);

		doc.querySelector('#left_column').remove();
		doc.querySelector('#navbar-full').remove();
		doc.querySelector('.mibreadcrumb').remove();
		doc.querySelector('.pb-left-column').remove();
		doc
			.querySelector(
				'#buy_block > div > div.misplugins.clearfix > div.pro_plg_titulo.row.encabezado'
			)
			.remove();
		doc.querySelector('#revision').remove();
		doc.querySelector('#refproducto').remove();
		doc.querySelector('#peris > div:nth-child(25) > div.pro_plg_titulo.izq.conicono').remove();
		doc.querySelector('#presupuesto').remove();
		doc.querySelector('#precio_relax').remove();
		doc.querySelector('#precio_semirelax').remove();
		doc.querySelector('.footer-container').remove();
		doc.querySelector('#logo-pie').remove();
		doc.querySelector('#page > div:nth-child(2) > img').remove();
		doc.querySelector('#page > div:nth-child(2) > div').remove();

		const calculator = doc.querySelector('#buy_block');
		doc.querySelector('.columns-container').remove();
		doc.querySelector('#page').prepend(calculator);

		const styles = document.createElement('style');
		styles.innerHTML = /* css */ `
			.pb-right-column {
				width: 100%;
			}

			.owl-item img {
				width: 100px !important;
				margin: 0 auto;
			}

			#formatopre {
				display: none !important;
			}

			.tachado {
				text-decoration: none;
			}

			.linea_izquierda {
				width: 100% !important;
			}
			
			#sel_entrega {
				pointer-events: none
			}
		`;

		head.appendChild(styles);
		srcdoc = doc.innerHTML;

		const iframe = document.querySelector('iframe');

		function calculate() {
			console.log('calc');
			const { contentDocument } = iframe;
			const precios = contentDocument.querySelectorAll('span[id*="precio"]');

			precios.forEach((precio) => {
				const { textContent } = precio;
				const active = contentDocument.querySelector('.activo');
				let rawPrice;

				if (active) active.classList.remove('activo');

				rawPrice = textContent.replace(',', '.');
				rawPrice = rawPrice.replace(' €', '');
				rawPrice = rawPrice * 1.21;
				rawPrice = rawPrice * 2.5;

				console.log(rawPrice);
				if (rawPrice === NaN) setTimeout(calculate, 200);
				else {
					const calculatedPrice = new Intl.NumberFormat('es-ES', {
						style: 'currency',
						currency: 'EUR'
					}).format(rawPrice);

					precio.textContent = `${calculatedPrice} /PVP`;
				}
			});
		}

		iframe.addEventListener('load', () => {
			const { contentDocument } = iframe;
			const inputs = contentDocument.querySelectorAll('input');
			const selects = contentDocument.querySelectorAll('select');

			calculate();

			inputs.forEach((input) => {
				input.addEventListener('change', () => {
					setTimeout(calculate);
				});
			});

			selects.forEach((select) => {
				select.addEventListener('change', () => {
					setTimeout(calculate);
				});
			});
		});
	});
</script>

<section class="viewport row fcenter">
	<iframe class="fill" {srcdoc} frameborder="0" title="web" />
</section>

<style lang="scss">
</style>
