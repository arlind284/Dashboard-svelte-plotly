<label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>

<style lang="scss">
	$color-default: #A6A6A6;
	$color-active: #2D9950;
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 46px;
		height: 22px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $color-default;
		transition: .4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 18px;
		width: 18px;
		left: 2px;
		bottom: 2px;
		background-color: white;
		-webkit-transition: .4s;
		transition: .4s;
	}

	input:checked + .slider {
		background-color: $color-active;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px $color-active;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>