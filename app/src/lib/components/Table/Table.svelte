<!-- https://betterprogramming.pub/how-to-create-responsive-data-tables-with-css-grid-9e0a37394450 -->

<script lang="ts">
	import classNames from 'classnames';
	import ButtonRounded from '../ButtonRounded.svelte';
	import TablePagination from './TablePagination.svelte'
	import IconClose from "$lib/icons/close.svelte";
	import IconTable from "$lib/icons/table.svelte";

	import { createEventDispatcher, setContext } from "svelte";
  const dispatch = createEventDispatcher();

	export let className: string = '';
	let isTableOpened: boolean = false;

	type Header = {
		title: string
	}
	type Row = {
		value1: string
		value2: number
	}

  export const headers: Header[] = [ { title: 'Period End' }, { title: 'Grid Imported Energy' } ];

  export let page = 0;
  export let pageIndex = 0;
  export let pageSize = 4;
	export let rows: Row[] | null = null;

  $: visibleRows = rows?.slice( pageIndex, pageIndex + pageSize );

	setContext( "state", {
    getState: () => ({
      page,
      pageIndex,
      pageSize,
      rows,
    }),
    setPage: (_page: number, _pageIndex: number) => {
      page = _page;
      pageIndex = _pageIndex;
    },
    setRows: (_rows : number ) => (_rows)
  });

  function onPageChange(event: CustomEvent) {
		console.log( event );
    dispatch("pageChange", event.detail);
  }

</script>

<div class={ classNames( "Table", className ) }>

	<div class="table-visibility flex justify-end gap-[20px]">
		<ButtonRounded
			className="ButtonSmall ButtonDark w-[120px] text-center"
			icon={ isTableOpened ? IconClose : IconTable }
			onClick={ ()=>{ isTableOpened = !isTableOpened } }
		>
			{ isTableOpened ? 'Close Table' : 'Open Table' }
		</ButtonRounded>
	</div>

	{ #if isTableOpened && visibleRows?.length }
		<table class="mt-[20px]">
			<thead>
				<tr>
					{ #each headers as header }
						<th>{header.title}</th>
					{/each}
				</tr>
			</thead>

			<tbody>
				{ #each visibleRows as row }
					<tr><td>{ row.value1 }</td><td>{ row.value2 }</td></tr>
				{/each}
			</tbody>

		</table>

		<TablePagination
			count={ visibleRows?.length - 1 }
			{page}
			{pageSize}
			on:pageChange={onPageChange}
		/>
	{ /if }

</div>

<style lang="scss">
	.Table {
		table{
			width: 100%;
			font-size: 13px;
			margin-bottom: 12px;
			thead{
				th{
					text-align: right;
					padding: 12px 16px;
					border-right: 1px solid #9496AB;
					border-top: 1px solid #393E64;
					font-weight: 400;
				}
			}
			tbody{
				background-color: #3B3F65;
				td{
					text-align: right;
					padding: 6px 16px;
					border-right: 1px solid #9496AB;
					border-top: 1px solid #515577;
					font-weight: 600;
				}
				tr{
					&:hover{
						td{
							background-color: theme( 'colors.blue');
						}
					}
				}
			}
		}
	}
</style>