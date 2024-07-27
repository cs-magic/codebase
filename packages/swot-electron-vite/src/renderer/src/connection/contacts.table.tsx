'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@cs-magic/ui'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { payloads } from 'wechaty-puppet'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export const columns: ColumnDef<payloads.Contact>[] = [
  {
    accessorKey: 'id',
    cell: ({ row }) => {
      return <div className={'max-w-[8rem] truncate'}>{row.getValue('id')}</div>
    }
  },
  { accessorKey: 'name' },
  { accessorKey: 'alias' },
  {
    accessorKey: 'avatar',
    cell: ({ row }) => {
      return <div className={'max-w-[20rem] truncate'}>{row.getValue('avatar')}</div>
    }
  },
  { accessorKey: 'friend' },
  { accessorKey: 'address' },
  { accessorKey: 'city' },
  { accessorKey: 'corporation' },
  { accessorKey: 'coworker' },
  { accessorKey: 'description' },
  { accessorKey: 'gender' },
  { accessorKey: 'handle' },
  { accessorKey: 'phone' },
  { accessorKey: 'province' },
  { accessorKey: 'signature' },
  { accessorKey: 'star' },
  { accessorKey: 'title' },
  { accessorKey: 'type' },
  { accessorKey: 'weixin' }
]
