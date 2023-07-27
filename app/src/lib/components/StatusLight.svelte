<div class="StatusLight"/>

<style lang="scss">
	.StatusLight{
		background: #64B583;
		box-shadow: 0px 0px 7px #64B583, inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25);
		height: 10px;
		width: 10px;
		border-radius: 50%;
		position: relative;
		&::before{
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 2px;
			width: 2px;
			background-color: #fff;
			opacity: 0.25;
			border-radius: 50%;
		}
	}
</style>