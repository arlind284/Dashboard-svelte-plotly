<script lang="ts">
	import classNames from 'classnames';
	export let className: string = '';

	export let icon: any = null;
	export let onClick: any;
</script>

<button
	class={ classNames( [
		'ButtonRounded',
		'bg-white rounded-[40px] text-text flex items-center',
		'hover:bg-gray-light',
		className
	] ) }
	 on:click={ onClick }
>
	<div class="icon-wrapper">
		<svelte:component this={ icon } />
	</div>
	<slot></slot>
</button>

<style lang="scss">
	.ButtonRounded{
		cursor: pointer;
		font-weight: 700;

		@apply px-[16px] h-[49px];
		.icon-wrapper{
			margin-right: 10px;
		}

		&.ButtonSmall{
			@apply px-[11px] h-[32px] text-[13px];
		}


	}
	.ButtonDark{
		@apply bg-[#2D3258] text-white;
		&:hover{
			background-color: theme('colors.gray-dark');
		}
	}
	.ButtonLight{
		@apply bg-white text-text;
		&:hover{
			background-color: theme('colors.gray-light');
		}
	}
</style>