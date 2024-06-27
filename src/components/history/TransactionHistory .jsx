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
import TransactionTable from "./TransactionTable";

export default function TransactionHistory() {
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const {
    data: dataTransaction,
    isLoading,
    mutate,
  } = useSWR("http://localhost:8081/pos/api/listtransaksi", fetchProduct);
  if (isLoading) return <div>Loading</div>;

  // console.log(dataTransaction);

  return (
    <div className="mx-8 py-16">
      <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>
      <TransactionTable dataTransaction={dataTransaction} />
    </div>
  );
}
