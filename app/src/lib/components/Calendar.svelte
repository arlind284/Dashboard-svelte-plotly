<!-- https://easepick.com/ -->
<!-- https://litepicker.com/docs/options -->

<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import ButtonRounded from "$lib/components/ButtonRounded.svelte";
	import IconCalendar from "$lib/icons/calendar.svelte"

	export let className: string = '';
	let toggle = true
	let picker;

	onMount( () => {
		const script = document.createElement('script');
		script.src = "https://cdn.jsdelivr.net/npm/litepicker/dist/nocss/litepicker.js"
		document.head.append(script);

		script.onload = () => {
			picker = new Litepicker({
    		element: document.getElementById('calendar'),
				singleMode: false,
				showTooltip: false
  		});
			// picker.show();
			picker.on('selected', (date1, date2) => {
				console.log( date1, date2 )
  		});
		}

	} );
</script>

<div class="Calendar">
	<ButtonRounded onClick={ ()=> { picker.show() } } className="ButtonLight mr-[12px]" icon={ IconCalendar }>Custom Date Range</ButtonRounded>
	<div class={ classNames( "Calendar", className ) } id="calendar"></div>
</div>

<style lang="scss">
	.Calendar {
		height: 100%;
	}
</style>