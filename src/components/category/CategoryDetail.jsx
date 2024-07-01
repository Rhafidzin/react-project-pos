import { FormatRupiah } from "@arismun/format-rupiah";
import { ArrowLeft } from "@phosphor-icons/react";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Navbar from "../layout/Navbar";
import { fetcher } from "@/lib/fetcher";

export default function CategoryDetail() {
  const { id } = useParams();

  const {
    data: dataCategory,
    isLoading,
    mutate,
  } = useSWR(
    `http://localhost:8081/pos/api/listproduct/category/${id}`,
    fetcher
  );
  const { data: dataRelatedProduct, isLoading: relatedLoading } = useSWR(
    `http://localhost:8081/pos/api/listproduct/relatedproduct`,
    fetcher
  );

  if (isLoading) return <div>Loading</div>;
  if (relatedLoading) return <div>Loading</div>;

  const related = () => {
    const filter = dataRelatedProduct?.filter((r) => r[0] == id);
    // console.log(filter);
    if (filter.length === 0) {
      return 0;
    } else {
      return filter[0][1];
    }
  };

  //   console.log(related());
  return (
    <>
      <Navbar />
      <div className="p-16">
        <h1 className="font-bold text-2xl flex justify-between">
          Daftar Produk{" "}
          <span>
            <Link to="/category">
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
                <td className="w-64">ID Kategory</td>
                <td className="w-4">:</td>
                <td>{dataCategory.id}</td>
              </tr>
              <tr>
                <td className="w-64">Nama Kategori</td>
                <td className="w-4">:</td>
                <td>{dataCategory.name}</td>
              </tr>
              <tr>
                <td className="w-64">Jumlah Produk Terkait</td>
                <td className="w-4">:</td>
                <td>{related()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
