<script lang="ts">
	import classNames from 'classnames';
	export let className: string = '';

	type TTabItem = {
		label: string
		value: number
		component?: any
		clickAction?: ( tabIndex: number ) => void
	}

	export let items:TTabItem[] = [];
	export let activeTabValue = 0;

	const handleClick = ( item:TTabItem ) => {
		item.clickAction && item.clickAction( item.value );
		return () => ( activeTabValue = item.value ) ;
	};
</script>


<ul
	class={ classNames( [
		"TabsRounded",
		"inline-flex rounded-[40px] p-[7px] gap-[7px] border-[2px] b-color-[#526073]",
		// "bg-[#1D2146]"
		className
	] ) }
>
	{#each items as item}
	<li class={ classNames( [ activeTabValue === item.value && 'active'] ) }>
		<button on:click={ handleClick( item ) }>{item.label}</button>
	</li>
	{/each}
</ul>

{#each items as item}
	{#if activeTabValue == item.value && item?.component }
	<div class="box flex grow w-full flex-col items-center justify-center">
		<svelte:component this={item?.component}/>
		<!-- {item.component} -->
	</div>
	{/if}
{/each}

<style lang="scss">
	ul{
		li{
			border-radius: 100px;
			cursor: pointer;
			&.active{
				color: theme( 'colors.black' );
				background-color: theme( 'colors.white' );
			}
			button{
				padding: 5px 15px;
			}
		}
	}
</style>