import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useSWR from "swr";

export default function ProductFormEdit() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchCategory = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data: dataCategory, isLoading: loadingCategory } = useSWR(
    `http://localhost:8081/pos/api/listproduct/category`,
    fetchCategory
  );
  const { data: dataProduct, isLoading: loadingProduct } = useSWR(
    `http://localhost:8081/pos/api/detailproduct/${id}`,
    fetchCategory
  );

  if (loadingCategory) return <div>Loading</div>;
  if (loadingProduct) return <div>Loading</div>;

  const onClickSubmit = (data) => {
    console.log("data", data);
    axios
      .put(`http://localhost:8081/pos/api/updateproduct/${id}`, data)
      .then((res) => {
        console.log(res),
          Swal.fire({
            icon: "success",
            title: "Produk berhasil diedit",
            showConfirmButton: false,
            timer: 1000,
          });
      })
      .catch((e) => {
        console.log(e),
          Swal.fire({
            icon: "error",
            title: "Produk gagal diedit",
            showConfirmButton: false,
            timer: 1000,
          });
      });
  };
  return (
    <div className="flex flex-col justify-center items-center my-32 px-64">
      <h1 className="text-2xl font-bold mb-6">Form Edit Produk</h1>
      <div className="w-2/3">
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <label className="flex flex-col gap-2">
                Nama Produk
                <input
                  type="text"
                  defaultValue={dataProduct.title}
                  {...register("title")}
                  className="w-full h-12 border-2 border-gray-400 pl-2 text-xl"
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col gap-2">
                Kategori
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
              </label>
            </div>
            <div>
              <label className="flex flex-col gap-2">
                URL Gambar
                <input
                  type="text"
                  defaultValue={dataProduct.image}
                  {...register("image")}
                  className="w-full h-12 border-2 border-gray-400 pl-2 text-xl"
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col gap-2">
                Harga Satuan
                <div className="relative">
                  <input
                    defaultValue={dataProduct.price}
                    type="number"
                    {...register("price")}
                    className="border-2 border-gray-400 w-full h-12 text-xl font-medium pl-12"
                  />
                  <span className="absolute left-2 bottom-3 pr-2 font-bold border-r-2 border-gray-400">
                    Rp
                  </span>
                </div>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-36 bg-sky-500 text-white h-10 rounded-md mt-6"
          >
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
}
