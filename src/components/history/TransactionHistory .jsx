import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR from "swr";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";

export default function TransactionHistory() {
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const {
    data: dataTransaksi,
    isLoading,
    mutate,
  } = useSWR("http://localhost:8081/pos/api/listtransaksi", fetchProduct);
  if (isLoading) return <div>Loading</div>;

  console.log(dataTransaksi);

  return (
    <div className="mx-8 my-16">
      <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Tanggal Transaksi</TableCell>
              <TableCell align="center">ID Transaksi</TableCell>
              <TableCell align="center">Total Harga</TableCell>
              <TableCell align="center">Total Bayar</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTransaksi.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">{row.transactionDate}</TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">
                  <FormatRupiah value={row.totalAmount} />
                </TableCell>
                <TableCell align="center">
                  <FormatRupiah value={row.totalPay} />
                </TableCell>
                <TableCell align="center">
                  <Link to={`/detail/transaction/${row.id}`}>
                    <button className="bg-sky-500 text-white w-28 h-7 rounded-md">
                      Detail
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
