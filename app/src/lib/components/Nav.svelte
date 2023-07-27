<script lang="ts">
	import classNames from 'classnames';
	export let heading: string;
	export let className: string = '';
	import { page } from '$app/stores';
</script>

<div class={ classNames( [
	'Nav',
	'relative overflow-hidden',
	'flex flex-col items-center',
	className
] ) }>
	<div class="line-top"/>
	<h2 class="text-[30px] text-green text-center pt-[58px] mb-[5px]">{ heading }</h2>
	<span class="text-[13px] mb-[20px]">Tuesday, January 15th 2024 18:22:37</span>

	<nav>
		<ul class="flex gap-[25px] mb-[20px]">
			<li class={ classNames( [ $page?.url?.pathname === '/status' && 'active '] ) }><a href="/status">Status</a></li>
			<li class={ classNames( [ $page?.url?.pathname === '/performance' && 'active '] ) }><a href="/performance">Performance</a></li>
		</ul>
	</nav>

	<div class="line-bottom"/>
</div>

<style lang="scss">
	.Nav {
		&::before{
			content: '';
			position: absolute;
			top: -25px;
			left: 50%;
			transform: translateX( -50% );
			width: 800px;
			height: 50px;
			background-image: radial-gradient(50% 50% at 50% 50%, #52A86E 0%, rgba(82, 168, 110, 0) 100%);
			opacity: 0.65;
			filter: blur(7.5px);
		}

		.line-top{
			height: 1px;
			width: 100%;
			background-image: linear-gradient(270deg, rgba(255, 255, 255, 0) 2.42%, rgba(82, 168, 110, 0.55) 51.21%, rgba(255, 255, 255, 0) 100%);
		}
		.line-bottom{
			height: 1px;
			width: 100%;
			background-image: linear-gradient(270deg, rgba(255, 255, 255, 0) 2.42%, rgba(255, 255, 255, 0.2) 51.21%, rgba(255, 255, 255, 0) 100%);
		}
		ul{
			text-transform: uppercase;
			li{
				position: relative;
				cursor: pointer;
				&.active{
					&::before{
						content: '';
						position: absolute;
						width: 100%;
						height: 4px;
						left: 0;
						bottom: -4px;
						border-radius: 4px;
						background-color: #fff;
					}
				}
			}
		}
	}
</style>