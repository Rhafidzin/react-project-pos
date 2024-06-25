import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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

  const { data: dataCategory, isLoading } = useSWR(
    `http://localhost:8081/pos/api/listproduct/category`,
    fetchCategory
  );
  const { data: dataProduct } = useSWR(
    `http://localhost:8081/pos/api/detailproduct/${id}`,
    fetchCategory
  );

  if (isLoading) return <div>Loading</div>;

  console.log(dataProduct);
  const onClickSubmit = (data) => {
    console.log(data);
    axios
      .put(`http://localhost:8081/pos/api/updateproduct/${id}`, data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
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
                  defaultValue={dataProduct?.title}
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
                  defaultValue={dataProduct?.image}
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
                    defaultValue={dataProduct?.price}
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
