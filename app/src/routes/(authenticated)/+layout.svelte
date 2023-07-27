<script>
  import "../../app.scss";
	import Fonts from "$lib/components/Fonts.svelte";
	import Header from "$lib/components/Header.svelte";
	import Nav from "$lib/components/Nav.svelte";
</script>

<div class="container">
	<Header />

	<Nav
		heading="Intertie Microgrid is in Cost-Savings Mode."
		className="mb-[30px]"
	/>
</div>

	<main>
		<slot />
	</main>

<!-- { @html '<script src="js/plotly-2.20.0.min.js" />' } -->