import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Link } from "react-router-dom";

import ProductTable from "./ProductTable";
import { fetcher } from "@/lib/fetcher";

export default function ProductList() {
  const {
    data: dataProduct,
    isLoading,
    mutate,
  } = useSWR(
    `http://localhost:8081/pos/api/listproduct?title=&category_id=`,
    fetcher
  );

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="p-16">
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
        <ProductTable dataProduct={dataProduct} mutate={mutate} />
      </div>
    </div>
  );
}
