import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { addToCart } from "../../store/reducers/cartSlice";

export default function ProductMenu({ title, category, sortBy }) {
  const dispatch = useDispatch();
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data: dataProduct } = useSWR(
    `http://localhost:8081/pos/api/listproduct?title=${title}&category_id=${category}&sort_by=${sortBy}`,
    fetchProduct
  );

  const onClickSubmit = (data) => {
    const qty = 1;
    const payload = {
      ...data,
      qty,
    };
    // console.log(payload);
    dispatch(addToCart(payload));
  };

  return (
    <>
      {dataProduct?.map((p) => (
        <div
          key={p.id}
          className="text-center border-2 bg-white active:bg-sky-200"
          onClick={() => onClickSubmit(p)}
        >
          <img
            src={p.image}
            alt={p.image}
            className="min-w-full h-72 object-cover"
          />
          <p className="font-semibold text-lg">{p.title}</p>
          <p className="font-medium">
            <FormatRupiah value={p.price} />
          </p>
        </div>
      ))}
    </>
  );
}
