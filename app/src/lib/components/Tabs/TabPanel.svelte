<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	import classNames from 'classnames';
	export let className: string = '';

	const panel = {};
	const { registerPanel, selectedPanel }: { registerPanel: any, selectedPanel: any } = getContext(TABS);
	registerPanel( panel );
</script>

{#if $selectedPanel === panel}
	<div
		class={ classNames( [
			"TabPanel",
			className
		] ) }
	>
		<slot></slot>
	</div>
{/if}

<style lang="scss">
	.TabPanel {
		flex: 100% 1 0;
		border-radius: 8px;
		border: 1px solid;
		border-color: #8D91A5;
		padding: 30px;
		background: rgb(36,39,78);
		background: linear-gradient(180deg, rgba(36,39,78,1) 0%, rgba(3,8,49,1) 100%);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		&.Panel-1{
			border-top-left-radius: 0;
		}
		&.Panel-4{
			border-top-right-radius: 0;
		}
	}
</style>