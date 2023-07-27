<script lang="ts">
	import classNames from 'classnames';
	export let className: string = '';

	export let items = [];
	export let activeTabValue = 0;
	const handleClick = ( tabValue: number ) => {
		return () => ( activeTabValue = tabValue) ;
	};
</script>


<ul
	class={ classNames( [
		"TabsUnderlined",
		"inline-flex rounded-[40px] bg-[#1D2146] p-[7px] gap-[7px] border-[2px] b-color-[#526073]",
		className
	] ) }
>
	{ #each items as item }
	<li class={ classNames( [ activeTabValue === item.value && 'active'] ) }>
		<button on:click={ handleClick( item.value )}>{item.label}</button>
	</li>
	{/each}
</ul>

{ #each items as item }
	{#if activeTabValue == item.value}
	<div class="box flex grow w-full flex-col">
		<svelte:component this={item.component}/>
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