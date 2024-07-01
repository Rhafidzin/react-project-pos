import React from "react";
import useSWR from "swr";
import axios from "axios";
import ProductMenu from "./ProductMenu";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function ProductMenuList({ categoryState }) {
  const methods = useForm({
    defaultValues: {
      title: "",
      sortBy: "",
    },
  });

  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const {
    data: dataCategory,
    isLoading,
    mutate,
  } = useSWR(
    "http://localhost:8081/pos/api/listproduct/category",
    fetchProduct
  );

  // console.log(dataProduct);
  if (isLoading) return <div>Loading</div>;

  // console.log(methods.watch().title);
  return (
    <div className="w-2/3 px-4 pt-12 pb-28 overflow-y-scroll max-h-screen min-h-screen">
      <div className="text-4xl font-bold mb-8 flex justify-between items-center">
        <h1>Daftar Produk</h1>
        <div className="font-normal flex items-center gap-2 text-xl">
          <span>
            <select
              {...methods.register(`sortBy`)}
              className="bg-transparent border border-black w-40"
            >
              <option value="">Urutkan</option>
              <option value="title">Nama A-Z</option>
              <option value="title&sort_order=desc">Nama Z-A</option>
              <option value="price">Harga terendah</option>
              <option value="price&sort_order=desc">Harga tertinggi</option>
            </select>
          </span>
          <span>
            <input
              type="text"
              placeholder="cari menu"
              {...methods.register("title")}
              className="w-48 bg-slate-100 border border-black pl-1"
            />
          </span>
        </div>
      </div>
      <FormProvider {...methods}>
        <div className="grid grid-cols-4 gap-1">
          <ProductMenu
            title={methods.watch().title}
            category={categoryState}
            sortBy={methods.watch().sortBy}
          />
        </div>
      </FormProvider>
    </div>
  );
}
