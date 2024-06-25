import axios from "axios";
import React from "react";
import useSWR from "swr";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductList() {
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const {
    data: dataProduct,
    isLoading,
    mutate,
  } = useSWR(
    `http://localhost:8081/pos/api/listproduct?title=&category_id=`,
    fetchProduct
  );

  const { data: dataTransactionDetail } = useSWR(
    `http://localhost:8081/pos/api/listtransaksidetail`,
    fetchProduct
  );

  if (isLoading) return <div>Loading</div>;

  // console.log(dataTransactionDetail);

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
      axios
        .delete(`http://localhost:8081/pos/api/deleteproduct/${id}`)
        .then((res) => {
          console.log(res);
          mutate();
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div className="m-16">
      <h1 className="font-bold text-2xl flex justify-between">
        Daftar Produk{" "}
        <span>
          <Link to="form/add">
            <button className="font-medium text-lg bg-green-500 text-white w-48 h-9 rounded-md">
              + Tambah Produk
            </button>
          </Link>
        </span>
      </h1>
      <div className="mt-8">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID Produk</TableCell>
                <TableCell>Nama Produk</TableCell>
                <TableCell>Harga Satuan</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataProduct.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    <FormatRupiah value={row.price} />
                  </TableCell>
                  <TableCell>{row.category.name}</TableCell>
                  <TableCell align="center">
                    <div className="flex gap-2 justify-center">
                      <Link to={`/detail/product/${row.id}`}>
                        <button className="bg-sky-500 text-white w-28 h-7 rounded-md">
                          Detail
                        </button>
                      </Link>
                      <Link to={`form/edit/${row.id}`}>
                        <button className="bg-sky-500 text-white w-28 h-7 rounded-md">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => onclickDelete(row.id)}
                        className="bg-sky-500 text-white w-28 h-7 rounded-md"
                      >
                        Hapus
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
