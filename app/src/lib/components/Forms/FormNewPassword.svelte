<script lang="ts">
	import classNames from 'classnames';

	export let handleProgress: (stepIncrement: number) => void;

	const handleBtnClick = () =>{
		handleProgress(+1);
	}
</script>

<form
	class={ classNames( [
		'FormNewPassword',
		'text-[#153060]',
		'bg-white rounded-[10px] px-[65px] py-[80px] w-[660px]',
		'flex flex-col items-flex-start justify-flex-start gap-[25px]',
	] ) }
	action=""
	>
	<img class="w-[526px]" src="/images/logo.png" alt="logo"/>
	<legend class="text-[45px]">New Password</legend>

	<p class="text-[#828282]">Set a new password for your account to log in and access all features.</p>

	<fieldset class="w-full form-control">
		<label class="mb-[3px] inline-flex" for="password">Enter new password</label>
		<input
			class="bg-[#FAFAFA] rounded-[5px] p-[10px] w-full border-[1px] border-gray-light"
			type="password"
			name="password"
			id="password"
			placeholder="Must be at least 8 characters"
		>
	</fieldset>

	<fieldset class="w-full form-control">
		<label class="mb-[3px] inline-flex" for="password">Confirm password</label>
		<input
			class="bg-[#FAFAFA] rounded-[5px] p-[10px] w-full border-[1px] border-gray-light"
			type="password"
			name="password"
			id="password"
			placeholder="Re-type new password"
		>
	</fieldset>

	<button
		on:click={ (e) => handleBtnClick(e) }
		class="py-[18px] bg-[#1E4178] w-full text-white uppercase text-center rounded-[5px]"
	>Update password</button>
</form>