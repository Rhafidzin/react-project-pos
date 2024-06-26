import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import Swal from "sweetalert2";
import { CaretUpDown } from "@phosphor-icons/react";
import { fetcher } from "@/lib/fetcher";

export default function ProductTable({ dataProduct, mutate }) {
  const { data: dataTransactionDetail } = useSWR(
    `http://localhost:8081/pos/api/listtransaksidetail`,
    fetcher
  );

  //   console.log(dataProduct);

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <div className="flex justify-center">
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <CaretUpDown weight="bold" />
            ID Produk
          </button>
        </div>
      ),
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <div className="flex justify-center">
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <CaretUpDown weight="bold" />
            Nama Produk
          </button>
        </div>
      ),
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <div className="flex justify-center">
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <CaretUpDown weight="bold" />
            Harga Produk
          </button>
        </div>
      ),
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "category.name",
      id: "category",
      header: ({ column }) => (
        <div className="flex justify-center">
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <CaretUpDown weight="bold" />
            Kategori
          </button>
        </div>
      ),
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Action",
      cell: (props) => (
        <div className="flex gap-2 justify-center">
          <Link to={`detail/${props.row.original.id}`}>
            <button className="bg-sky-500 text-white w-28 h-8 rounded-md">
              Detail
            </button>
          </Link>
          <Link to={`form/edit/${props.row.original.id}`}>
            <button className="bg-sky-500 text-white w-28 h-8 rounded-md">
              Edit
            </button>
          </Link>
          <button
            onClick={() => onclickDelete(props.row.original.id)}
            className="bg-sky-500 text-white w-28 h-8 rounded-md"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data: dataProduct,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
  });

  //   console.log(table.getState().sorting);
  const onclickDelete = (id) => {
    // console.log(id);
    const filter = dataTransactionDetail.filter(
      (data) => data.product.id == id
    );
    // console.log(filter);
    if (filter.length > 0) {
      Swal.fire({
        title: "Produk pernah dibeli",
        text: "Produk gagal dihapus",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Hapus produk?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8081/pos/api/deleteproduct/${id}`)
            .then((res) => {
              console.log(res);
              mutate();
            })
            .catch((e) => console.log(e));
          Swal.fire({
            title: "Deleted!",
            text: "Produk berhasil dihapus.",
            icon: "success",
          });
        }
      });
    }
  };
  return (
    <>
      <Table className="w-full">
        <TableHeader className="text-lg ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center font-bold">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-center text-lg">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent className="flex justify-between">
          <PaginationItem>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={
                !table.getCanPreviousPage() && "hover:cursor-not-allowed"
              }
            >
              <PaginationPrevious />
            </button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              <select
                className="bg-transparent "
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={!table.getCanNextPage() && "hover:cursor-not-allowed"}
            >
              <PaginationNext />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
