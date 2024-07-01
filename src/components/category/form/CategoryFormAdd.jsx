import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useSWR from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "@/components/layout/Navbar";

export default function CategoryFormAdd() {
  const schema = yup.object().shape({
    name: yup.string().required("Isi nama kategori!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onClickSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8081/pos/api/insert", data)
      .then((res) => {
        console.log(res),
          reset(),
          Swal.fire({
            icon: "success",
            title: "Kategori berhasil ditambah",
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
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center py-32 px-64">
        <h1 className="text-2xl font-bold mb-6 flex justify-between">
          Form Kategori <span></span>
        </h1>
        <div className="w-2/3">
          <form onSubmit={handleSubmit(onClickSubmit)}>
            <div className="flex flex-col gap-4 w-full">
              <div>
                <label className="flex gap-2 font-medium">
                  Nama Kategori
                  <span className="text-red-500">{errors.name?.message}</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full h-12 border-2 border-gray-400 pl-2 text-xl"
                />
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
    </>
  );
}
