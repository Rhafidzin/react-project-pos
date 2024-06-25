import React from "react";
import { useParams } from "react-router-dom";
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

export default function TransactionDetail() {
  const { id } = useParams();
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data: dataDetailTransaksi, isLoading } = useSWR(
    `http://localhost:8081/pos/api/listtransaksidetail`,
    fetchProduct
  );

  if (isLoading) return <div>Loading</div>;

  const filteredData = dataDetailTransaksi?.filter(
    (data) => data.transaction.id == id
  );

  console.log(filteredData);
  const dataTransaction = filteredData[0].transaction;
  return (
    <div className="m-16">
      <h1 className="font-bold text-2xl">Detail Transaksi</h1>
      <div className="border-t-2 border-black mt-8 py-12">
        <table className=" text-lg flex flex-col gap-4">
          <tbody>
            <tr>
              <td className="w-64">ID Transaksi</td>
              <td className="w-4">:</td>
              <td>{dataTransaction.id}</td>
            </tr>
            <tr>
              <td className="w-64">Tanggal Transaksi</td>
              <td className="w-4">:</td>
              <td>{dataTransaction.transactionDate}</td>
            </tr>
            <tr>
              <td className="w-64">Total Harga</td>
              <td className="w-4">:</td>
              <td>
                <FormatRupiah value={dataTransaction.totalAmount} />
              </td>
            </tr>
            <tr>
              <td className="w-64">Total Bayar</td>
              <td className="w-4">:</td>
              <td>
                <FormatRupiah value={dataTransaction.totalPay} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-12 border-t-2 border-black pt-8">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID Produk</TableCell>
                  <TableCell>Nama Produk</TableCell>
                  <TableCell>Harga Satuan</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.product.id}</TableCell>
                    <TableCell>{row.product.title}</TableCell>
                    <TableCell>
                      <FormatRupiah value={row.product.price} />
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>
                      <FormatRupiah value={row.subtotal} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
