<script>
	import { onMount } from 'svelte';

	export let data;
	let doc, srcdoc;

	onMount(() => {
		doc = document.createElement('html');
		const base = document.createElement('base');
		doc.innerHTML = data.html;

		const head = doc.querySelector('head');
		base.href = 'https://www.exaprint.es/';
		head.appendChild(base);

		const styles = document.createElement('style');
		styles.innerHTML = /* css */ `
		`;

		head.appendChild(styles);
		srcdoc = doc.innerHTML;

		const iframe = document.querySelector('iframe');

		function calculate() {
			console.log('calc');
		}

		iframe.addEventListener('load', () => {
			const { contentDocument } = iframe;
			calculate();
		});
	});
</script>

<section class="viewport row fcenter">
	<iframe class="fill" {srcdoc} frameborder="0" title="web" />
</section>

<style lang="scss">
</style>
