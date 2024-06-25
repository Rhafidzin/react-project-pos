import React, { useState } from "react";
import CartList from "../order/CartList";
import useSWR from "swr";
import axios from "axios";

export default function Navbar() {
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data, isLoading, mutate } = useSWR(
    "http://localhost:8081/pos/api/listproduct/category",
    fetchProduct
  );

  if (isLoading) return <div>Loading</div>;
  return (
    <>
      <div className="sticky top-[100vh] w-2/3 bg-orange-400 text-white h-12 flex items-center justify-center">
        <ul className="flex gap-4 ">
          {data.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
      <CartList />
    </>
  );
}
