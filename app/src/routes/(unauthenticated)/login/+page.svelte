<script lang="ts">
	import classNames from 'classnames';
	import FormLogin from "$lib/components/Forms/FormLogin.svelte";
</script>

<svelte:head>
  <title>Intertie - Login</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container">
	<div class="row">

		<FormLogin/>

	</div>

</div>

<style lang="scss">
	.row{
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	label{
		@apply select-none;
	}
</style>