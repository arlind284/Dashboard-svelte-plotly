<script lang="ts">
	import classNames from 'classnames';
	export let className: string = '';
</script>

<div
	class={ classNames( [
		"Panel",
		className
	] ) }
>
	<slot></slot>
</div>

<style lang="scss">
	.Panel {
		flex: 100% 1 0;
		border-radius: 8px;
		border: 1px solid;
		border-color: #8D91A5;
		padding: 30px;
		display: flex;
		flex-direction: column;

		&.with-hover{
			&:hover{
				outline: 2px solid theme('colors.swatch-4');
				/* border-color: theme('colors.swatch-4'); */
			}
		}
	}
</style>