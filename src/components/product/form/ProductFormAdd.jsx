import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useSWR from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ProductFormAdd() {
  const schema = yup.object().shape({
    title: yup.string().required("Isi nama produk!"),
    image: yup.string().required("Isi url gambar"),
    price: yup.number().required("Isi harga produk"),
    category: yup.object({
      id: yup.string().required("Pilih kategori produk"),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fetchCategory = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data: dataCategory, isLoading } = useSWR(
    `http://localhost:8081/pos/api/listproduct/category`,
    fetchCategory
  );

  if (isLoading) return <div>Loading</div>;

  // console.log(errors);

  const onClickSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8081/pos/api/addproduct", data)
      .then((res) => {
        console.log(res),
          reset(),
          Swal.fire({
            icon: "success",
            title: "Produk berhasil ditambah",
            showConfirmButton: false,
            timer: 1000,
          });
      })
      .catch((e) => {
        console.log(e),
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan!",
            showConfirmButton: false,
            timer: 1000,
          });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center my-32 px-64">
      <h1 className="text-2xl font-bold mb-6 flex justify-between">
        Form Produk <span></span>
      </h1>
      <div className="w-2/3">
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <label className="flex gap-2 font-medium">
                Nama Produk
                <span className="text-red-500">{errors.title?.message}</span>
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full h-12 border-2 border-gray-400 pl-2 text-xl"
              />
            </div>
            <div>
              <label className="flex gap-2 font-medium">
                Kategori{" "}
                <span className="text-red-500">
                  {errors.category?.id.message}
                </span>
              </label>
              <select
                type="text"
                {...register("category.id")}
                className="w-full h-12 border-2 border-gray-400 pl-2 text-xl"
              >
                <option value=""></option>
                {dataCategory.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex gap-2 font-medium">
                URL Gambar{" "}
                <span className="text-red-500">{errors.image?.message}</span>
              </label>
              <input
                type="text"
                {...register("image")}
                className="w-full h-12 border-2 border-gray-400 pl-2 text-xl"
              />
            </div>
            <div>
              <label className="flex flex-col font-medium">
                Harga Satuan
                <span className="text-red-500">{errors.price?.message}</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register("price")}
                  className="border-2 border-gray-400 w-full h-12 text-xl font-medium pl-12"
                />
                <span className="absolute left-2 bottom-3 pr-2 font-bold border-r-2 border-gray-400">
                  Rp
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-36 bg-sky-500 text-white h-10 rounded-md mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
