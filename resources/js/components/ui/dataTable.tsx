import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Search, Filter, Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from 'react-i18next';

// Interface des props du composant réutilisable
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterPlaceholder?: string;
  filterColumn?: string;
  onRowAction?: (row: TData) => void;
  showSearch?: boolean;
  showColumnToggle?: boolean;
  pageSize?: number;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterPlaceholder = 'Rechercher...',
  filterColumn,
  onRowAction,
  showSearch = true,
  showColumnToggle = true,
  pageSize = 10,
  className = '',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const {t} = useTranslation();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Barre de contrôles - Responsive */}
      {(showSearch && filterColumn) || showColumnToggle ? (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          {showSearch && filterColumn && (
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={filterPlaceholder}
                value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            {/* Statistiques rapides */}
            <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {table.getFilteredRowModel().rows.length} {t('items', 'éléments')}
              </span>
            </div>
            
            {showColumnToggle && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 transition-all duration-200 hover:bg-green-50 hover:border-green-300">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('columns', 'Colonnes')}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="p-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b">
                    {t('toggleColumns', 'Afficher/Masquer colonnes')}
                  </div>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize flex items-center gap-2"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.getIsVisible() ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      ) : null}

      {/* Tableaux - Responsive avec scroll horizontal sur mobile */}
      <div className="rounded-xl border border-gray-200 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
        {/* Version mobile - Cards améliorées */}
        <div className="block md:hidden">
          {table.getRowModel().rows?.length ? (
            <div className="space-y-3">
              {table.getRowModel().rows.map((row, idx) => (
                <div
                  key={row.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    idx % 2 === 0
                      ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  } hover:bg-green-50 dark:hover:bg-green-900/40 hover:border-green-300 dark:hover:border-green-700 cursor-pointer hover:shadow-md transform hover:scale-[1.02]`}
                  onClick={() => onRowAction?.(row.original)}
                >
                  <div className="space-y-3">
                    {row.getVisibleCells().map((cell, cellIdx) => {
                      const header = table.getHeaderGroups()[0]?.headers[cellIdx];
                      const headerText = header ? flexRender(header.column.columnDef.header, header.getContext()) : '';
                      return (
                        <div key={cell.id} className="flex justify-between items-start group">
                          <div className="font-medium text-sm text-gray-600 dark:text-gray-400 min-w-0 flex-shrink-0 pr-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {headerText}
                          </div>
                          <div className="text-sm font-medium text-right min-w-0 break-words">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Indicateur de clic */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-end text-xs text-gray-500 dark:text-gray-400">
                      <span>{t('tapToView', 'Appuyer pour voir les détails')}</span>
                      <ChevronDown className="ml-1 h-3 w-3 rotate-270" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-gray-400 dark:text-gray-500 mb-2">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              </div>
              <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                {t('noData', 'Aucune donnée disponible')}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('noDataDesc', 'Aucun élément ne correspond à vos critères de recherche.')}
              </div>
            </div>
          )}
        </div>

        {/* Version desktop - Table améliorée */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-6 py-4 text-left font-semibold text-base tracking-wide whitespace-nowrap border-r border-green-500/20 last:border-r-0"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, idx) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`transition-all duration-200 border-b border-gray-100 dark:border-gray-700 ${
                      idx % 2 === 0
                        ? 'bg-gray-50/50 dark:bg-gray-800/50'
                        : 'bg-white dark:bg-gray-900'
                    } hover:bg-green-50 dark:hover:bg-green-900/20 hover:shadow-sm cursor-pointer group`}
                    onClick={() => onRowAction?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-4 text-sm whitespace-nowrap border-r border-gray-100 dark:border-gray-700/50 last:border-r-0 group-hover:border-green-200 dark:group-hover:border-green-800 transition-colors">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Search className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t('noData', 'Aucune donnée disponible')}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                        {t('noDataDesc', 'Aucun élément ne correspond à vos critères de recherche.')}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination - Responsive */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
        <div className="text-muted-foreground text-sm text-center sm:text-left">
          {table.getFilteredSelectedRowModel().rows.length} {t('of', 'de')} {table.getFilteredRowModel().rows.length} {t('rows', 'lignes')}.
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-2"
          >
            <span className="hidden sm:inline">{t('previous', 'Précédent')}</span>
            <span className="sm:hidden">‹</span>
          </Button>
          
          {/* Indicateur de page actuelle */}
          <div className="flex items-center space-x-1 text-sm font-medium">
            <span>{table.getState().pagination.pageIndex + 1}</span>
            <span>/</span>
            <span>{table.getPageCount()}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
            className="px-3 py-2"
          >
            <span className="hidden sm:inline">{t('next', 'Suivant')}</span>
            <span className="sm:hidden">›</span>
          </Button>
        </div>
      </div>
    </div>
  );
}