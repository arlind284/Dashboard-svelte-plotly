<script lang="ts">
	import classNames from 'classnames';
	import FormForgotPassword from "$lib/components/Forms/FormForgotPassword.svelte";
	import FormVerification from "$lib/components/Forms/FormVerification.svelte";
	import FormNewPassword from "$lib/components/Forms/FormNewPassword.svelte";
	import IconSuccess from "$lib/icons/success.svelte"

	const steps = ['email', 'verification', 'newPassword', 'success' ];
	let currentStep: number = 0;

	const handleProgress = (stepIncrement: number ) => {
		currentStep += stepIncrement;
	}

</script>

<svelte:head>
  <title>Intertie - Forgot password</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container">
	<div class="row">
		{#if steps[currentStep] === 'email'}
			<FormForgotPassword handleProgress={ handleProgress }/>
			{:else if steps[currentStep] === 'verification'}
			<FormVerification handleProgress={ handleProgress }/>
			{:else if steps[currentStep] === 'newPassword'}
			<FormNewPassword handleProgress={ handleProgress }/>
			{ :else if steps[currentStep] === 'success' }
			<div
				class={ classNames( [
					'text-[#153060]',
					'bg-white rounded-[5px] px-[65px] py-[80px] w-[660px]',
					'flex flex-col items-center justify-flex-start gap-[25px]',
				] ) }
			>
				<IconSuccess/>
				<h2 class="text-[45px] mb-[10px]">Success</h2>
				<p class="text-[#828282]">Your password has successfully been reset</p>

				<a
					href="/login"
					class="py-[18px] bg-[#1E4178] w-full text-white uppercase text-center rounded-[5px]"
				>Continue</a>

			</div>
		{/if}

		<!-- <div class="testing buttons">
			<button class="btn" on:click={() => handleProgress(-1)} disabled={currentStep === 0}>Prev</button>
			<button class="btn" on:click={() => handleProgress(+1)} disabled={currentStep === steps.length}>Next</button>
		</div> -->

	</div>

	<a
		class="fixed top-[20px] right-[20px] bg-[#1E4178] h-[52px] w-[158px] flex items-center justify-center text-white rounded-[5px]"
		href="/login"
	>Log in</a>

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