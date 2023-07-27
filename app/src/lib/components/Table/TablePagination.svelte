<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	const dispatch = createEventDispatcher();

	type TStateContext = {
		getState: () => {
			originalEvent: Event
			page: number
			pageIndex: number
			pageSize: number
		}
		setPage: (page: number, pageIndex: number) => void
	}
	const stateContext: TStateContext = getContext("state");

	export let buttons = [-2, -1, 0, 1, 2];
  export let count = 0;
  export let page = 0;
  export let pageSize = 0;

	// $: pageCount = Math.floor( count / pageSize );
	$: pageCount = 2;

	// HANDLERS
	function onChange( event: Event, page: number ) {
		// console.log( event , page )
    const state = stateContext.getState();
    const detail = {
      originalEvent: event,
      page,
      pageIndex: page * state.pageSize,
      pageSize: state.pageSize,
			preventDefault: false
    };
    dispatch( "pageChange", detail );
		if (detail?.preventDefault !== true) {
      stateContext.setPage(detail.page, detail.pageIndex);
    }
  }

	// console.log( count,pageSize, pageCount );
</script>

<div class="TablePagination">
	<ul>

		<li>
			<button
				class="prev"
				disabled={ page === 0 }
				on:click={ e => onChange( e, page - 1 ) }
			>←</button>
		</li>

		{ #each buttons as button}
    { #if page + button >= 0 && page + button <= pageCount }
      <li>
        <button
          class:active={ page === page + button}
          on:click={ e => onChange( e, page + button ) }
				>
          { page + button + 1 }
        </button>
      </li>
    {/if}
  	{ /each }

		<li>
			<button
				class="next"
				disabled={ page > pageCount - 1}
				on:click={ e => onChange( e, page + 1 ) }
			>→</button>
		</li>

	</ul>
</div>

<style lang="scss">
	.TablePagination{
		display: flex;
		justify-content: flex-end;
		font-size: 13px;
		ul{
			display: flex;
			gap: 8px;
			li{
				display: flex;
				justify-content: center;
				align-items: center;
				button{
					background-color: #31365C;
					height: 32px;
					width: 27px;
					border-radius: 4px;
					border: 1px solid transparent;
					&.prev{
						width: 33px;
					}
					&.next{
						width: 33px;
					}
					&:disabled{
						opacity: 0.4;
						cursor: not-allowed;
					}
					&:hover{
						background-color: #3B3F65;
					}
					&.active{
						border-color: #A5AEB7;
					}
				}
			}
		}
	}
</style>
