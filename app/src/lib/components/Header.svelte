<script lang="ts">
	// external
	import Cookies from 'js-cookie';
	import classNames from 'classnames';

	// svelte
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// state
	// import { appState } from '$lib/stores';

	// components
	import IconLogo from "$lib/icons/logo.svelte"
	import IconLogout from "$lib/icons/logout.svelte"
	import IconProfile from "$lib/icons/profile.svelte"
	import Dropdown from "$lib/components/Dropdown.svelte";
	import Icon from "$lib/components/Icon.svelte";

	export let className: string = '';

	type TProject = {
		id: number,
		name: string
	};

	let projects: TProject[] = [];
	let userEmail: string | undefined;
	if (browser) {
		const userObj =  localStorage.getItem( 'user' );
		projects = userObj ? JSON.parse( userObj )?.projects : [];
		userEmail = userObj ? JSON.parse( userObj )?.name : undefined;
	}
	const handleLogoutClick = () => {
		Cookies.remove( 'access_token');
		localStorage.removeItem( 'user' );
		goto( '/login', {	noScroll: true,	keepFocus: true})
	}

	// appState.subscribe( store  => {
	// 	console.log( store );
	// });

</script>

<header
	class={ classNames( [
		'Header',
		"flex",
		"py-[25px]",
		className
	] )
}>
	<!-- <img class="Logo" src={img} alt="logo"/> -->
	<a class="Logo mr-[40px] flex items-center" href="/"><IconLogo/></a>
	<Dropdown selectItems={ projects }/>

	<ul class="flex gap-[25px] ml-auto mr-0">
		<li class="flex items-center"><Icon><IconProfile/></Icon>{ userEmail }</li>
		<li><button class="flex items-center" on:click={ handleLogoutClick }><Icon><IconLogout/></Icon>Log Out</button></li>
	</ul>

</header>

<style>

</style>

