import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

export interface FilterColumns {
  placeholder: string;
  column: string;
}

interface DataTableSearchProps<TData> {
  table: Table<TData>;
  filterColumns?: FilterColumns[];
}

export function DataTableSearch<TData>({
  table,
  filterColumns = [],
}: Readonly<DataTableSearchProps<TData>>) {
  return (
    <div className="flex gap-5">
      {filterColumns.map((filter) => (
        <Input
          key={filter.column}
          placeholder={`Filter ${filter.placeholder}...`}
          value={
            (table.getColumn(filter.column)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filter.column)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      ))}
    </div>
  );
}
