<script lang="ts">
	// svelte
	import { goto } from '$app/navigation';
	// import { onMount } from "svelte";

	// external
	import classNames from 'classnames';
	import Cookies from 'js-cookie';

	// utils
	import getData from "$lib/utils/getData";

	const getToken = async ( email: string, password: string ) => {
		const data = await getData(
			"POST",
			"/api/users/sign_in",
			{
				email,
				password
			}
		);
		return data;
	};

	const errors={
		email: false,
		password: false
	}

	const handleFormSubmit = async ( event: FormEvent<EventTarget> ) => {
		const formData = new FormData( event.target )
		const data: { email: string | null, password: string | null, } = { email: null, password: null };
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
		const email = data?.email;
		const password = data?.password;

		const lifetimeInHours = ( hours: number ) => {
			return new Date(new Date().getTime() + 1000 * 60 * 60 * hours );
		}

		// validation
		errors.email = false;
		errors.password = false;
		if( !email ){
			errors.email = true;
		}
		if( !password ){
			errors.password = true;
		}
		if( !email || !password ){
			return;
		}

		const res = await getToken( email, password );
		// console.log( res );
		// data
		const access_token = res?.access_token;

		if( res?.access_token ){
			const cookieOptions = {
				expires: lifetimeInHours( 12 ),
			}
			// set token
			Cookies.set( 'access_token', access_token, cookieOptions );
			// set projects
			localStorage.setItem( 'user', JSON.stringify( res ) );

			goto( '/status', {
				noScroll: true,
				keepFocus: true
			})
		} else {
			alert( 'Wrong login or password' );
		}

	}

</script>

<form
	class={ classNames( [
		'FormLogin',
		'text-[#153060]',
		'bg-white rounded-[10px] px-[65px] py-[80px] w-[660px]',
		'flex flex-col gap-[10px] items-flex-start justify-flex-start',
	] ) }
	on:submit|preventDefault={ handleFormSubmit }
>
	<img class="w-[526px]" src="/images/logo.png" alt="logo"/>
	<legend class="text-[45px] mb-[10px]">
		<!-- Welcome Back -->
	</legend>

	<fieldset class="w-full form-control pb-[20px]">
		<label class="mb-[3px] inline-flex" for="email">E-mail*</label>
		<input
			class="bg-[#FAFAFA] rounded-[5px] p-[10px] w-full border-[1px] border-gray-light"
			type="email"
			name="email"
			id="email"
			placeholder="hannah.green@test.com"
		>
		{#if errors?.email }<div class="error text-[12px] absolute text-swatch-2">This field is required</div>{/if}
	</fieldset>

	<fieldset class="w-full form-control pb-[20px]">
		<label class="mb-[3px] inline-flex" for="password">Password*</label>
		<input
			class="bg-[#FAFAFA] rounded-[5px] p-[10px] w-full border-[1px] border-gray-light"
			type="password"
			name="password"
			id="password"
			placeholder="Password123@"
		>
		{#if errors?.password }<div class="error text-[12px] absolute text-swatch-2">This field is required</div>{/if}
	</fieldset>

	<!-- <fieldset class="w-full form-control">
		<label class="mb-[3px] inline-flex" for="security-text">Security Text</label>
		<input
			class="bg-[#FAFAFA] rounded-[5px] p-[10px] w-full border-[1px] border-gray-light"
			type="text"
			name="security"
			id="security"
			placeholder="Enter the shown text"
		>
	</fieldset> -->

	<fieldset class="w-full flex justify-items-start form-control">
		<label for="remember-me" class="flex items-center">
			<input class="mr-[10px] accent-[#1E4178]" type="checkbox" name="remember-me" id="remember-me">
			<span>Remember me on this computer</span>
		</label>
	</fieldset>

	<button type="submit" class="py-[18px] !bg-[#1E4178] w-full text-white uppercase text-center rounded-[5px]">Log in</button>

	<a href="/forgot-password" class="text-[#F2451C] text-center ">Forgot Password?</a>

</form>

<style lang="scss">
	.error{

	}

</style>