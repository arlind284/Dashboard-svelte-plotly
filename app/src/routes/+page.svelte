<script lang="ts">
	// svelte
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	if (browser) {
		goto( '/performance', {
			noScroll: true,
			keepFocus: true
		})
	}
</script>

<svelte:head>
  <title>Intertie</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container topC">
	<div class="flex flex-col gap-[20px] items-start mb-[50px]">
		</div>

	<div>

		<!-- <ChartPieGauge
			VALUE={ 60 }
			COLOR="#788AA1"
			className="mb-[120px]"
		/> -->

		<!-- <ChartGauge
			VALUE={ 300 }
			COLOR="#788AA1"
		/> -->

		<!-- <ChartBar
			COLOR="#788AA1"
		/> -->


	</div>

</div>

<style lang="scss">
</style>

