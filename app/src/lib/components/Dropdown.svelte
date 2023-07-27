<script lang="ts">
	// state
	import { appState } from '$lib/stores';

	type TSelectItem = {
		id: number,
		name: string,
	};
	export let selectItems: TSelectItem[] = [];

	let selectedProject : TSelectItem = selectItems[0];

	const handleSelectChange = ( e: { target: HTMLSelectElement }) : void => {
		const id = parseInt( e?.target?.value );
		const selectedItem = selectItems.find( item => item.id === id )
		if( selectedItem ){
			selectedProject = selectedItem;
			appState.update( state => {
			state.selectedProject = selectedProject;
				return state;
			})
		}
	}
</script>

{ #if selectItems.length }
<select
	class="bg-bg text-[14px]"
	value={ selectedProject.id }
	on:change={ handleSelectChange }
>
	{ #each selectItems as selectItem }
		<option value={ selectItem.id }>{selectItem.name}</option>
	{ /each }
</select>
{ /if }

<style>
	select{
		cursor: pointer;
	}
	select:focus-visible {
		outline: none;
	}
</style>