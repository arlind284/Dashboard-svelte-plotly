<script lang="ts">
	import classNames from "classnames";
	export let className: string ='';
</script>

<div class={ classNames([
	'StatusBattery',
	className
]) }>
	<div class="battery">
    <div class="part"></div>
  </div>
</div>

<style lang="scss">
	.StatusBattery{
		height: 20px;
  	width: 38px;
  	position: relative;
		border-radius: 3px;
		border: 2px solid;
		margin-right: 5px;

		.battery::before {
			content: '';
			position: absolute;
			height: 8px;
			width: 2px;
			right: -4px;
			top: 50%;
			transform: translateY(-50%);
			border: 0 2px 2px 0;
		}
		.part {
			position: absolute;
			top: 0px;
			left: 0px;
			bottom: 0px;
			right: 0px;

			width: 80%;
			/* animation: 7s animate 1s infinite; */
		}

		&.battery-white{
			background-color: #ffffff;
			border-color:  #ffffff;
			.battery::before {
				background: #ffffff;
			}
			.part {
				background: #64B583;
			}
		}
		&.battery-green{
			border-color:  #64B583;
			.battery::before {
				background: #64B583;
			}
			.part {
				background: #64B583;
			}
		}

		@keyframes animate {
			0% {
				width: 0%;
				background: #F00;
			}
			50% {
				width: 48%;
				background:orange;
			}
			100% {
				width: calc( 100% + 1px );
				background: #64B583;
			}
		}
	}
</style>