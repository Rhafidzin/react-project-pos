import { FormatRupiah } from "@arismun/format-rupiah";
import { ArrowLeft } from "@phosphor-icons/react";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Navbar from "../layout/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const {
    data: dataProduct,
    isLoading,
    mutate,
  } = useSWR(`http://localhost:8081/pos/api/detailproduct/${id}`, fetchProduct);

  if (isLoading) return <div>Loading</div>;

  console.log(dataProduct);
  return (
    <div className="m-16">
      <Navbar />
      <h1 className="font-bold text-2xl flex justify-between">
        Daftar Produk{" "}
        <span>
          <Link to="/product">
            <button className="flex justify-center items-center gap-1 font-medium text-lg bg-green-500 text-white w-48 h-9 rounded-md">
              <ArrowLeft />
              Kembali
            </button>
          </Link>
        </span>
      </h1>
      <div className="border-t-2 border-black mt-8 py-12 grid grid-cols-3">
        <table className="text-lg col-span-2">
          <tbody className="flex flex-col gap-4 font-medium">
            <tr>
              <td className="w-64">ID Produk</td>
              <td className="w-4">:</td>
              <td>{dataProduct.id}</td>
            </tr>
            <tr>
              <td className="w-64">Nama Produk</td>
              <td className="w-4">:</td>
              <td>{dataProduct.title}</td>
            </tr>
            <tr>
              <td className="w-64">Harga Satuan</td>
              <td className="w-4">:</td>
              <td>
                <FormatRupiah value={dataProduct.price} />
              </td>
            </tr>
            <tr>
              <td className="w-64">ID Kategori</td>
              <td className="w-4">:</td>
              <td>{dataProduct.image}</td>
            </tr>
            <tr>
              <td className="w-64">ID Kategori</td>
              <td className="w-4">:</td>
              <td>{dataProduct.category.id}</td>
            </tr>
            <tr>
              <td className="w-64">Name Kategori</td>
              <td className="w-4">:</td>
              <td>{dataProduct.category.name}</td>
            </tr>
          </tbody>
        </table>
        <div className="mr-2 col-span-1">
          <img
            src={dataProduct.image}
            alt=""
            className="object-cover min-h-full"
          />
        </div>
      </div>
    </div>
  );
}
