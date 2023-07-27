<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";


	export let handleProgress: (stepIncrement: number) => void;

	let handleBtnClick: (e: Event) => void;
	onMount( () => {
		const inputElements = [...document.querySelectorAll( 'input.code-input') ] as HTMLInputElement[];

		inputElements.forEach((el,index)=>{
			el.addEventListener('keydown',(e: KeyboardEvent )=>{
				const target  = e?.target as HTMLInputElement;
				if(e.key  === 'Backspace' && target?.value ==='') inputElements[ Math.max(0,index-1) ].focus();
			})
			el.addEventListener('input',(e)=>{
				const target = e?.target as HTMLInputElement;
				const [first,...rest] = target?.value
				target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
				const lastInputBox = index===inputElements.length-1
				const didInsertContent = first!==undefined
				if(didInsertContent && !lastInputBox) {
					inputElements[index+1].focus()
					inputElements[index+1].value = rest.join('')
					inputElements[index+1].dispatchEvent(new Event('input'))
				}
			})
		})

		handleBtnClick = () =>{
			const code = inputElements.map(({value})=>value).join('');
			if( code.length === 4){
				handleProgress(+1);
			} else {
				alert('Please enter a valid code');
			}
		}

	});

</script>

<form
	class={ classNames( [
		'FormVerification',
		'text-[#153060]',
		'bg-white rounded-[5px] px-[65px] py-[80px] w-[660px]',
		'flex flex-col items-flex-start justify-flex-start gap-[25px]',
	] ) }
>
	<legend class="text-[45px] mb-[15px]">Verification</legend>
	<p class="mb-[10px]">Enter the 4-digit code that you received in your email.</p>
	<fieldset class="w-full form-control">
		<input name='code' class='code-input' autocomplete="off" required/>
		<input name='code' class='code-input' autocomplete="off" required/>
		<input name='code' class='code-input' autocomplete="off" required/>
		<input name='code' class='code-input' autocomplete="off" required/>
	</fieldset>

 	<span class="text-[#F2451C] text-center my-[10px]">00:30</span>

	<button
		on:click={ (e) => handleBtnClick(e) }
		disabled={ false }
		class="py-[18px] bg-[#1E4178] w-full text-white uppercase text-center rounded-[5px]"
	>Continue</button>
 
	<span class="text-center">I didn’t receive a code! <button class="text-[#F2451C]">Resend</button></span>

</form>

<style lang="scss">
	.FormVerification {
		.form-control{
			display: flex;
			gap: 24px;
			input{
				background-color: #FAFAFA;
				border: 1px solid #1E4178;
				border-radius: 5px;
				width: 25%;
				text-align: center;
				font-size: 30px;
				aspect-ratio: 1;
				&:invalid {
					box-shadow: none;
				}
				&:focus{
					outline: none;
					border: 1px solid #F2451C;
				}
			}
		}
	}

</style>