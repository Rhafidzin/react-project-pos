import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { addToCart, fetchCart } from "../../store/reducers/cartSlice";

export default function ProductMenu({ title, category, sort }) {
  const dispatch = useDispatch();
  const fetchProduct = (url) =>
    axios
      .get(url)
      .then((response) => response.data.data)
      .catch((e) => console.log(e));

  const { data: dataProduct } = useSWR(
    `http://localhost:8081/pos/api/listproduct?title=${title}&category_id=${category}&sort_by=${sort}`,
    fetchProduct
  );

  const onClickSubmit = (data) => {
    data.qty = 1;
    dispatch(addToCart(data));
    setTimeout(() => dispatch(fetchCart()), 200);
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
