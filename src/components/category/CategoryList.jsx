import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";
import CategoryTable from "./CategoryTable";
import { Link } from "react-router-dom";
import { fetcher } from "@/lib/fetcher";

export default function CategoryList() {
  const {
    data: dataCategory,
    isLoading,
    mutate,
  } = useSWR(`http://localhost:8081/pos/api/listproduct/category`, fetcher);

  const { data: dataRelatedProduct, isLoading: relatedLoading } = useSWR(
    `http://localhost:8081/pos/api/listproduct/relatedproduct`,
    fetcher
  );

  if (isLoading) return <div>Loading</div>;
  if (relatedLoading) return <div>Loading</div>;

  // console.log(dataCategory);
  return (
    <div className="p-16">
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
          mutate={mutate}
        />
      </div>
    </div>
  );
}
