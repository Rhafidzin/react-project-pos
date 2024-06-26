import axios from "axios";
import React from "react";
import useSWR from "swr";
import CategoryTable from "./CategoryTable";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const fetcher = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data: dataCategory, isLoading } = useSWR(
    `http://localhost:8081/pos/api/listproduct/category`,
    fetcher
  );
  const { data: dataRelatedProduct, isLoading: relatedLoading } = useSWR(
    `http://localhost:8081/pos/api/listproduct/relatedproduct`,
    fetcher
  );
  if (isLoading) return <div>Loading</div>;
  if (relatedLoading) return <div>Loading</div>;
  // console.log(dataCategory);
  return (
    <div className="m-16">
      <h1 className="font-bold text-2xl flex justify-between">
        Daftar Kategori{" "}
        <span>
          <Link to="form/add">
            <button className="font-medium text-lg bg-green-500 text-white w-48 h-9 rounded-md">
              + Tambah Kategori
            </button>
          </Link>
        </span>
      </h1>
      <div className="mt-8">
        <CategoryTable
          dataCategory={dataCategory}
          dataRelatedProduct={dataRelatedProduct}
        />
      </div>
    </div>
  );
}
