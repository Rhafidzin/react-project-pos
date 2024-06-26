import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { Link } from "react-router-dom";

import ProductTable from "./ProductTable";

export default function ProductList() {
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data: dataProduct, isLoading } = useSWR(
    `http://localhost:8081/pos/api/listproduct?title=&category_id=`,
    fetchProduct
  );

  if (isLoading) return <div>Loading</div>;
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
        <ProductTable dataProduct={dataProduct} />
      </div>
    </div>
  );
}
