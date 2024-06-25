import React, { useState } from "react";
import ProductMenuList from "./ProductMenuList";
import axios from "axios";
import useSWR from "swr";
import CartList from "./CartList";

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
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-[100vh] w-2/3 bg-orange-400 text-white h-16 flex items-center justify-center ">
        <ul className="flex items-center">
          <button
            className="border-x border-white px-4 hover:cursor-pointer py-2"
            onClick={() => onClickSet("")}
          >
            Semua
          </button>
          {data.map((category) => (
            <button
              className="border-x border-white px-4 hover:cursor-pointer active:bg-red-700 py-2"
              key={category.id}
              onClick={() => onClickSet(category.id)}
            >
              {category.name}
            </button>
          ))}
        </ul>
      </div>
      <ProductMenuList categoryState={categoryState} />
      <CartList />
    </div>
  );
}
