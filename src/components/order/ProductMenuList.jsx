import React from "react";
import useSWR from "swr";
import axios from "axios";
import ProductMenu from "./ProductMenu";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function ProductMenuList({ categoryState }) {
  const methods = useForm({
    defaultValues: {
      title: "",
      sort: "",
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
    <div className="w-2/3 px-4">
      <div className="text-4xl font-bold mb-8 flex justify-between items-center">
        <h1>Daftar Produk</h1>
        <div className="font-normal flex items-center gap-2 text-xl">
          <span>
            <select
              {...methods.register(`sort`)}
              className="bg-transparent border border-black w-32"
            >
              <option value="">Sort Menu</option>
              <option value="title">Nama</option>
              <option value="price">Harga</option>
            </select>
          </span>
          <span>
            <input
              type="text"
              {...methods.register("title")}
              className="w-48 bg-slate-100 border border-black"
            />
          </span>
        </div>
      </div>
      <FormProvider {...methods}>
        <div className="grid grid-cols-4 gap-1">
          <ProductMenu
            title={methods.watch().title}
            category={categoryState}
            sort={methods.watch().sort}
          />
        </div>
      </FormProvider>
    </div>
  );
}
