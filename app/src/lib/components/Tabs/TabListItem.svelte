<!-- https://cssgradient.io/ -->

<script>
	import classNames from 'classnames';
	import { getContext } from 'svelte';

	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext( TABS );

	registerTab(tab);
</script>

<li class={ classNames([
	'TabListItem',
	$selectedTab === tab && 'selected'
] ) }>
	<button on:click="{ () => selectTab(tab) }">
		<slot></slot>
	</button>
	<div class={ classNames([	'pseudo',	$selectedTab === tab && 'selected' ] ) }></div>
</li>

<style lang="scss">
	li{
		/* flex: 0 1 25%; */
		/* max-width: calc( 25% - 18px ); */
		aspect-ratio: 1;
		opacity: 0.6;
		font-size: 30px;
		display: flex;
		flex-wrap: wrap;

		&:hover{
			opacity: 0.8;
		}
		/* overflow: hidden; */

		/* &::before{
			content: '';
			position: absolute;
			bottom: -26px;
			left: -1px;
			height: 30px;
			width: calc( 100% + 2px );
			background-color: #24274E;
			border-left: 1px solid #8D91A5;
			border-right: 1px solid #8D91A5;
			display: none;
		} */
		&.selected {
			color: #fff;
			opacity: 1;
			button{
				border-bottom: none;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}
		}
		button {
			overflow: hidden;
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-direction: column;
			font-size: 18px;
			width: 100%;
			height: 100%;
			padding: 18px 25px 0;

			border-radius: 8px;
			border: 1px solid;
			border-color: #8D91A5;
			background-color: #24274E;


			:global( span.heading ) {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
    		font-size: 18px;
				padding-bottom: 10px;
				border-bottom: 1px solid  #4B4F70;
  		}
			:global( .content ) {
				flex-grow: 1;
				display: flex;
				align-items: center;
			}
		}

		.pseudo{
			height: 25px;
			width: 100%;
			background-color: red;
			background-color: #24274E;
			border-left: 1px solid #8D91A5;
			border-right: 1px solid #8D91A5;
			visibility: hidden;
			margin-bottom: -1px;
			&.selected{
				visibility: visible;
			}
		}

	}
</style>

