<script lang="ts">
	import { onMount } from "svelte";

	// COMPONENTS
	import TabsRounded from "$lib/components/TabsRounded.svelte";
	import StatusLight from "$lib/components/StatusLight.svelte";
	import StatusBattery from "$lib/components/StatusBattery.svelte";
	import { Tabs, TabList, TabPanel, TabListItem } from '$lib/components/Tabs/tabs';
	// import Toggle from "$lib/components/Toggle.svelte";


	// CHARTS
	import Chart72HourBattery from "$lib/components/Charts/barCharts/Chart72HourBattery.svelte";
	import Chart72HourEVChargers from "$lib/components/Charts/barCharts/Chart72HourEVChargers.svelte";
	import Chart72HourSolar from "$lib/components/Charts/barCharts/Chart72HourSolar.svelte";
	import Chart24HourConsumption from "$lib/components/Charts/barCharts/Chart24HourConsumption.svelte";

	// import ChartResponsive from "$lib/components/Charts/ChartResponsive.svelte";

	// GAUGES
	import GaugeIntertieSystem from "$lib/components/Charts/gaugeCharts/GaugeIntertieSystem.svelte";
	import GaugeBatterySystem from "$lib/components/Charts/gaugeCharts/GaugeBatterySystem.svelte";
	import GaugeSolarGeneration from "$lib/components/Charts/gaugeCharts/GaugeSolarGeneration.svelte";
	import GaugeEvChargers from "$lib/components/Charts/gaugeCharts/GaugeEVChargers.svelte";
	// import Needle from "$lib/components/Charts/gaugeCharts/Needle.svelte";
	// import GaugeBasic from "$lib/components/Charts/gaugeCharts/GaugeBasic.svelte";
	import PowerFlow from "$lib/components/PowerFlow.svelte";

	// LAYOUTS
	import LayoutMultipleGauges from "$lib/layouts/LayoutMultipleGauges.svelte";
	// import LayoutRealTimePowerFlow from "$lib/layouts/LayoutRealTimePowerFlow.svelte";


	// DATA
	import getData from "$lib/utils/getData";

	import dataBS from '$lib/data/BS.json';
	import dataEV from '$lib/data/EV.json';
	import dataIS from '$lib/data/IS.json';
	import dataSG from '$lib/data/SG.json';

	import data72hB from '$lib/data/72hB.json';
	import data72hS from '$lib/data/72hS.json';

	// tabs
	const tabsTimeOptions1 = [
		{ label: 'Real-Time Power Flow', value: 0, component: PowerFlow },
		{ label: '24-Hour Demand (kW)', value: 1, component: Chart24HourConsumption }
	];

	const tabsTimeOptions2 = [
		{ label: 'Real-Time', value: 0, component: LayoutMultipleGauges },
		{ label: '72 Hour', value: 1, component: Chart72HourEVChargers }
	];

	onMount( async () => {
		const data = await getData( "/api/monitoring/1" );
		// console.log(data);
	});

</script>

<svelte:head>
  <title>Intertie - Status</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container">
	<!-- <Toggle/> -->
	

	<Tabs className="mb-[200px]">
		<TabList>
			<!-- TAB 1 -->
			<TabListItem>
				<span class="heading">Intertie System<StatusLight/></span>
				<div class="content">
					<div class="gauge-info"><span>Exporting to Grid</span><span>14kW</span></div>

					<GaugeIntertieSystem id="gauge-is-1" chartData={ dataIS }/>
					<!-- <Needle/> -->
				</div>
			</TabListItem>

			<!-- TAB 2-->
			<TabListItem>
				<span class="heading">Battery System<StatusBattery className="battery-green"/></span>
				<div class="content">
					<div class="gauge-info"><span>Discharging</span><span>125kW</span></div>
					<GaugeBatterySystem id="gauge-bs-1" chartData={ dataIS }/>
				</div>
			</TabListItem>

			<!-- TAB 3 -->
			<TabListItem>
				<span class="heading">Solar Generation<StatusLight/></span>
				<div class="content">
					<div class="gauge-info"><span>Generating</span><span>275kW</span></div>

					<GaugeSolarGeneration id="gauge-sg-1" chartData={ dataIS }/>
				</div>
			</TabListItem>

			<!-- TAB 4 -->
			<TabListItem>
				<span class="heading">EV Chargers <small>3/5 in use</small></span>
				<div class="content">
					<div class="gauge-info"><span>Delivering</span><span>230kW</span></div>

					<GaugeEvChargers id="gauge-ev-1" chartData={ dataIS }/>
				</div>
			</TabListItem>
		</TabList>

		<!-- TAB PANEL -->
		<TabPanel className="Panel-1 min-h-[50vh] !justify-center !items-center">
			<TabsRounded className="mb-[50px] ml-0 mr-auto" items={ tabsTimeOptions1 }/>
		</TabPanel>

		<!-- TAB PANEL -->
		<TabPanel className="Panel-2 min-h-[50vh] !justify-center !items-center">
			<Chart72HourBattery id="chart-72hB" chartData={ data72hB }/>
		</TabPanel>

		<!-- TAB PANEL -->
		<TabPanel className="Panel-3 min-h-[50vh] !justify-center !items-center">
			<Chart72HourSolar id="chart-72hS" chartData={ data72hS }/>
		</TabPanel>

		<!-- TAB PANEL -->
		<TabPanel className="Panel-4 min-h-[50vh] !justify-center !items-center">
			<TabsRounded className="mb-[50px] ml-0 mr-auto" items={ tabsTimeOptions2 }/>
		</TabPanel>

	</Tabs>
</div>

<style lang="scss">
	.content{
		.gauge-info{
			display: flex;
			flex-direction: column;
			span{
				&:nth-child(1){
					font-size: 16px;
				}
				&:nth-child(2){
					font-size: 24px;
					font-weight: 700;
				}
			}
			@media screen and (min-width: 1366px) {
				display: none;
			}
		}

		:global(.plot-container){
			display: none;
			@media screen and (min-width: 1366px) {
				display: flex;
			}
		}
	}
</style>

