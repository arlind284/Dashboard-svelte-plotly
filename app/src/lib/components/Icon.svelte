<script lang="ts">
	import classNames from 'classnames';

	export let className: string = '';
</script>

<div
	class={ classNames( [
		'Icon',
		'flex items-center',
		'mr-[10px]',
		className
	] ) }
>
	<slot/>
</div>
