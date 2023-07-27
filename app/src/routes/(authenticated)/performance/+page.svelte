<script lang="ts">
	import classNames from 'classnames';

	// components
	import Panel from "$lib/components/Panel.svelte";
	import TabsRounded from "$lib/components/TabsRounded.svelte";

	import ButtonRounded from "$lib/components/ButtonRounded.svelte";
	import Calendar from "$lib/components/Calendar.svelte";
	import Table from "$lib/components/Table/Table.svelte";
	import TableSmall from "$lib/components/TableSmall.svelte";

	// icons
	import IconDownload from "$lib/icons/download.svelte";
	import IconRefresh from "$lib/icons/refresh.svelte";

	import tableData from './data.json';

	import ChartStackedPerformanceConsumption from "$lib/components/Charts/barCharts/ChartStackedPerformanceConsumption.svelte";
	import ChartGridImportedEnergy from "$lib/components/Charts/barCharts/ChartGridImportedEnergy.svelte";
	import ChartStackedEnergyProduction from "$lib/components/Charts/barCharts/ChartStackedEnergyProduction.svelte";
	import ChartStackedEnergyConsumption from "$lib/components/Charts/barCharts/ChartStackedEnergyConsumption.svelte";

	// DATA
	import data72hPP from '$lib/data/72hPP.json';
	import dataPC from '$lib/data/PC.json';
	import data72hB from '$lib/data/72hB.json';
	// import dataBS from '$lib/data/BS.json';

	let activeTimeTabValue = 0;

	// data
	const tabsTimeOptions = [
		{ label: 'Hours', value: 0, clickAction: ( tabIndex: number )=>{ activeTimeTabValue = tabIndex }, },
		{ label: 'Days', value: 1, clickAction: ( tabIndex: number )=>{ activeTimeTabValue = tabIndex }, }
	];
	const tabsDayOptions = [
		{ label: '24 Hrs', value: 0, },
		{ label: 'Last 3 days', value: 1, },
		{ label: 'Last 7 days', value: 2, },
		{ label: 'Last 30 days', value: 3, }
	];

	type Row = {
		value1: string
		value2: number
	}
	const rows: Row[] = tableData;
  let page = 0; //first page
  let pageSize = 4


	// JSON 2 CSV
	// https://juanjodiaz.github.io/json2csv/#/quick-start
</script>

<svelte:head>
  <title>Intertie - Perfomance</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="bg-gradient border-t-[1px] border-[#526073]">
	<div class="container">

		<div class="mb-[20px]">

			<!-- TabsRounded -->
			<div class="flex flex-wrap mb-[20px] gap-[12px]">
				<TabsRounded className="ml-0 mr-auto" items={ tabsTimeOptions }/>
				<TabsRounded className="ml-0 mr-auto" items={ tabsDayOptions }/>
				<Calendar className=""/>

				<!-- <ButtonRounded className="ml-auto" icon={ IconDownload } onClick={ ()=>{}}>Download .CSV</ButtonRounded> -->
				<a
					class={ classNames( [
						"bg-white rounded-[40px] text-text flex items-center",
						"hover:bg-gray-light",
						"ml-auto",
						"px-[16px] h-[49px] font-[700]"
					] ) }
					download="data7day" href="files/data7day.csv">
					<IconDownload/>
					<span class="ml-[10px]">Download .CSV</span>
				</a>
				<ButtonRounded className="mr-[0px]" icon={ IconRefresh } onClick={ ()=>{}}>Update</ButtonRounded>

			</div>
		</div>

		<!-- PANEL 1 -->
		<Panel className="mb-[20px] min-h-[50vh]">
			<h3 class="text-[20px] mb-[15px]">Grid Imported Energy</h3>

			{#if activeTimeTabValue === 0 }
				<div class="bg-[#41446A] p-[20px] flex gap-[50px]">
					<TableSmall title="Grid Imported Energy" label1="Total kWh" val1="1,320,891" label2="Max kW" val2="1,320,891"/>
				</div>

				<!-- <ChartStackedPerformanceConsumption/> -->
				<ChartGridImportedEnergy id="chart-grid-imported-energy" chartData={ data72hB }/>

				<Table className="mb-[0px] mt-auto" { page } { pageSize } { rows }/>
			{/if}

			{#if activeTimeTabValue === 1 }
				<ChartStackedPerformanceConsumption id="chart-0" chartData={ data72hPP }/>
			{/if}
		</Panel>

		<!-- PANEL 2 -->
		<Panel className="mb-[20px] min-h-[50vh]">
			<h3 class="text-[20px] mb-[15px]">Energy Consumption</h3>
			<div class="bg-[#41446A] p-[20px] flex gap-[50px]">
				<TableSmall title="Building Energy" label1="Total kWh" val1="1,320,891" label2="Max kW" val2="1,320,891"/>
				<TableSmall title="Ev Charger Energy" label1="Total kWh" val1="1,320,892" label2="Max kW" val2="1,320,891"/>
				<TableSmall title="Ev Charger Energy" label1="Total kWh" val1="1,320,892" label2="Max kW" val2="1,320,891"/>
			</div>
			<ChartStackedEnergyConsumption id="chart-1" chartData={ dataPC }/>
			<Table { page } { pageSize } { rows }/>
		</Panel>

		<Panel className="mb-[20px] min-h-[50vh]">
			<h3 class="text-[20px] mb-[15px]">Energy Production</h3>
			<div class="bg-[#41446A] p-[20px] flex gap-[50px]">
				<TableSmall title="Solar Generation" label1="Total kWh" val1="1,320,891" label2="Max kW" val2="1,320,891"/>
				<TableSmall title="Battery System Discharge" label1="Total kWh" val1="1,320,892" label2="Max kW" val2="1,320,891"/>
			</div>
			<ChartStackedEnergyProduction id="chart-2" chartData={ dataPC }/>
			<Table { page } { pageSize } { rows }/>
		</Panel>

	</div>
</div>

<style lang="scss">
	.bg-gradient{
		padding-top: 20px;
		background: rgb(36,39,78);
		background: linear-gradient(180deg, rgba(36,39,78,1) 0%, rgba(3,8,49,1) 100%);
	}
</style>