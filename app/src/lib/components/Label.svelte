<script lang="ts">
	import classNames from 'classnames';

	export let className: string;
	export let value: number;
</script>

<span
	class={ classNames( [
		'Label',
		'inline-flex items-center justify-center h-[36px] bg-gray-dark border-[2px] border-[white] px-[8px] rounded-[8px] font-[600]',
		className
	] ) }
>{ value }kW</span>

<style lang="scss">
	.Label{
		position: relative;
		&.label-orange{
			background-color: theme('colors.swatch-2');
			color: theme('colors.text');
		}
		&.label-grey{
			background-color: theme('colors.gray-dark');
			color: theme('colors.white');
		}
		&.label-green{
			background-color: theme('colors.swatch-1');
			color: theme('colors.text');
		}
	}
</style>