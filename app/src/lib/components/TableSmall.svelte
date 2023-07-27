<script lang="ts">
	export let title: string = '';
	export let label1: string = '';
	export let val1: string = '';
	export let label2: string = '';
	export let val2: string = '';

</script>

<div class="DataItem flex flex-col text-[13px] shrink">
	<span class="w-full shrink-1 text-center mb-[8px]">{ title }</span>
	<div class="flex">
		<div class="grow flex flex-col with-divider">
			<span class="text-center">{ label1 }</span>
			<span class="text-center text-[15px]"><b>{ val1 }</b></span>
		</div>
		<div class="divider w-[1px] bg-[#4A4D70] mx-[10px]"></div>
		<div class="grow flex flex-col">
			<span class="text-center">{ label2 }</span>
			<span class="text-center text-[15px]"><b>{ val2 }</b></span>
		</div>
	</div>
</div>