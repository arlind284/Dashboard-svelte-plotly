<script lang="ts">
	// icons
	import Sun from "$lib/icons/power-flow/sun.svelte";
	import Battery from "$lib/icons/power-flow/battery.svelte";
	import Grid from "$lib/icons/power-flow/grid.svelte";
	import Load from "$lib/icons/power-flow/load.svelte";
	import LFlow from "$lib/icons/power-flow/L-flow.svelte";
	import RFlow from "$lib/icons/power-flow/R-flow.svelte";
	import StatusBattery from "./StatusBattery.svelte";
	import Label from "$lib/components/Label.svelte";

</script>

<div class="PowerFlow">

	<div class="line line-1 shape w-[80%] line-gray toRight">
		<div class="wrapper">
			<Label value={ 20 } className="label-gray"/>
		</div>
	</div>

	<div class="line line-2 shape w-[40%] line-orange toRight">
		<div class="wrapper">
			<Label value={ 0 } className="label-orange"/>
		</div>
	</div>

	<div class="line line-3 shape w-[40%] line-gray toLeft">
		<div class="wrapper">
			<Label value={ 0 } className="label-gray"/>
		</div>
	</div>

	<div class="shape L-flow">
		<LFlow/>
	</div>
	<div class="shape R-flow">
		<RFlow/>
	</div>

	<!-- <Label value={ 20 } className="label-orange"/> -->

	<!-- SUN -->
	<div class="shape shape-sun text-text">
		<div class="wrapper">
			<Sun/>
			<div class="title">
				<span>Solar</span>
				<span>100kW</span>
			</div>
		</div>
	</div>

	<!-- BATTERY -->
	<div class="shape shape-battery text-text">
		<div class="wrapper">
			<Battery/>
			<div class="shape status-battery">
				<StatusBattery className="battery-white"/>
			</div>
			<div class="title">
				<span>Battery 50%</span>
				<span>125kW</span>
			</div>
		</div>
	</div>

	<!-- GRID -->
	<div class="shape shape-grid">
		<div class="wrapper">
			<Grid/>
			<div class="title">
				<span>Power Grid</span>
				<span>275kW</span>
			</div>
		</div>
	</div>

	<!-- LOAD -->
	<div class="shape shape-load">
		<div class="wrapper">
			<Load/>
			<div class="title">
				<span>Side Load</span>
				<span>375kW</span>
			</div>
			<div class="title-small text-text">
				<span>EV chargers</span>
				<span>40kW</span>
			</div>
		</div>
	</div>

</div>

<style lang="scss">
	.PowerFlow{
		height: 700px;
		max-width: 1250px;
		width: 100%;
		position: relative;

		.line-1{
			top: 120px;
			left: 50%;
			transform: translateX( -50% );
		}
		.line-2{
			top: 48%;
			left: 130px;
		}
		.line-3{
			top: 48%;
			right: 110px;
		}

		.line{
			.wrapper{
				position: relative;
				width: 100%;
				display: flex;
				justify-content: center;
				&::before{
					position: absolute;
					content: '';
					width: 100%;
					height: 5px;
					top: 50%;
    			background-position: 0 0;
					animation: moveBg .3s infinite linear;
				}
			}
			&.toLeft{
				.wrapper{
					&::before{
						animation-direction: reverse;
					}
				}
			}
			&.line-gray{
				.wrapper{
					&::before{
						background: linear-gradient( 90deg, theme('colors.gray-dark') 50%, transparent 0 ) repeat-x;
						background-size: 6px 3px;
					}
				}
			}
			&.line-orange{
				.wrapper{
					&::before{
						background: linear-gradient( 90deg, theme('colors.swatch-2') 50%, transparent 0 ) repeat-x;
						background-size: 6px 3px;
					}
				}
			}
			@keyframes moveBg {
				100% {
        	background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
    		}
			}
		}

		.L-flow{
			position: absolute;
			bottom: 100px;
			left: 100px;
		}
		.R-flow{
			position: absolute;
			bottom: 100px;
			right: 100px;
		}

		.status-battery{
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
		}

		.shape{
			position: absolute;
			.wrapper{
				position: relative;
				.title{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					display: flex;
					flex-direction: column;
					align-items: center;
					span:nth-child(2){
						font-size: 20px;
						font-weight: 600;
					}
				}
				.title-small{
					position: absolute;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 10px;
					bottom: 10px;
					left: 50%;
					transform: translate( -50%, -50% );
					span{
						font-size: 12px;
					}
					span:nth-child(2){
						font-weight: 600;
					}
				}
			}

			&-sun{
				left: 0;
				top: 0;
			}
			&-battery{
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			&-grid{
				top: 40px;
				right: 0;
				.wrapper{
					.title{
						top: 40%;
					}
				}
			}
			&-load{
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				.wrapper{
					.title{
						top: 30%;
					}
				}
			}

		}
	}
</style>