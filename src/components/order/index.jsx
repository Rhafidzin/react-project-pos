import React, { useState } from "react";
import ProductMenuList from "./ProductMenuList";
import axios from "axios";
import useSWR from "swr";
import CartList from "./CartList";
import Navbar from "../layout/Navbar";

export default function OrderProductPage() {
  const [categoryState, setCategoryState] = useState("");
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

  const onClickSet = (data) => {
    setCategoryState(data);
  };

  // console.log(categoryState);
  return (
    <>
      <Navbar />
      <div className="fixed bottom-0 w-2/3 bg-orange-400 text-white h-16 flex items-center justify-center ">
        <ul className="flex items-center text-xl">
          <button
            className={`border-x border-white px-4 hover:cursor-pointer py-5 hover:bg-red-700 ${
              categoryState === "" && `bg-red-800 active:bg-red-800`
            }`}
            onClick={() => onClickSet("")}
          >
            Semua
          </button>
          {data.map((category) => (
            <button
              className={`border-x border-white px-4 hover:cursor-pointer py-5 hover:bg-red-700 ${
                categoryState == category.id && `bg-red-800 active:bg-red-800`
              }`}
              key={category.id}
              onClick={() => onClickSet(category.id)}
            >
              {category.name}
            </button>
          ))}
        </ul>
      </div>
      <div className=" bg-gray-100 min-h-screen">
        <ProductMenuList categoryState={categoryState} />
        <CartList />
      </div>
    </>
  );
}
