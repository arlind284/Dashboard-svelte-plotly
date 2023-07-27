<script lang="ts">
	import classNames from 'classnames';


	export let handleProgress: (stepIncrement: number) => void;

</script>

<form
	class={ classNames( [
		'FormForgotPassword',
		'text-[#153060]',
		'bg-white rounded-[5px] px-[65px] py-[80px] w-[660px]',
		'flex flex-col items-flex-start justify-flex-start gap-[25px]',
	] ) }
	action=""
>
	<img class="w-[526px]" src="/images/logo.png" alt="logo"/>
	<legend class="text-[45px] mb-[10px]">Forgot password</legend>

	<p>Enter your email address for the verification process. We will send a 4-digit code to your email.</p>

	<fieldset class="w-full form-control">
		<label for="email">E-mail</label>
		<input
			class="bg-[#FAFAFA] rounded-[5px] p-[10px] w-full border-[1px] border-gray-light"
			type="email"
			name="email"
			id="email"
			placeholder="hannah.green@test.com"
		>
	</fieldset>

	<button
		on:click={ () => handleProgress(+1) }
		disabled={ false }
		class="py-[18px] bg-[#1E4178] w-full text-white uppercase text-center rounded-[5px]"
	>Continue</button>

</form>