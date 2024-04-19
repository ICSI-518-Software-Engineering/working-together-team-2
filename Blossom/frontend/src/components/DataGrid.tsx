import {
  MRT_ColumnDef,
  MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

type DataGridProps<T extends MRT_RowData> = {
  rows: T[];
  columns: MRT_ColumnDef<T>[];
};

const DataGrid = <T extends MRT_RowData>({
  rows,
  columns,
}: DataGridProps<T>) => {
  const table = useMaterialReactTable({
    columns,
    data: rows,
  });

  return <MaterialReactTable table={table} />;
};

export default DataGrid;
