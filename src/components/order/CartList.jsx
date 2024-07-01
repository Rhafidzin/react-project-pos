import { FormatRupiah } from "@arismun/format-rupiah";
import {
  CashRegister,
  MinusCircle,
  PlusCircle,
  Trash,
} from "@phosphor-icons/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  deleteFromCart,
  dropCart,
  minusQty,
  plusQty,
} from "../../store/reducers/cartSlice";

export default function CartList() {
  const dispatch = useDispatch();
  const { dataCart } = useSelector((state) => state.cart);
  // console.log("data cart ", dataCart);
  const subTotal = dataCart
    .map((item) => item.price * item.qty)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);
  // console.log(subTotal);

  const onClickMinusQty = (id) => {
    dispatch(minusQty(id));
  };
  const onClickPlusQty = (id) => {
    dispatch(plusQty(id));
  };
  const onClickDelete = (id) => {
    Swal.fire({
      title: "Hapus produk?",
      text: "Produk akan terhapus dari keranjang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFromCart(id));
      }
    });
  };

  const onClickDeleteAll = () => {
    Swal.fire({
      title: "Kosongkan keranjang?",
      text: "Produk akan terhapus dari keranjang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(dropCart());
      }
    });
  };
  return (
    <div className="absolute right-0 bg-gray-200 w-1/3 max-h-screen z-10 top-0 overflow-y-scroll min-h-screen">
      <h1 className="text-2xl mx-4 mt-8 font-bold flex justify-between">
        Daftar Pesanan{" "}
        <button
          className="w-32 rounded-md font-medim text-lg bg-green-500 text-white"
          onClick={() => onClickDeleteAll()}
        >
          Kosongkan
        </button>
      </h1>
      <div className="mt-8 mx-4 grid gap-24">
        {dataCart.length < 1 && (
          <div className="flex justify-center pt-24 pb-12 flex-col items-center">
            <CashRegister size={120} />
            <p className="font-bold text-xl">Silahkan pilih pesanan anda</p>
          </div>
        )}
        {dataCart.map((cart, index) => (
          <div key={cart.id}>
            <div className="flex justify-between ">
              <h2 className="flex items-center gap-2 text-xl font-medium">
                <Trash
                  className="size-7 hover:cursor-pointer"
                  weight="fill"
                  onClick={() => onClickDelete(cart.id)}
                />
                {cart.title}
              </h2>
              <span className="font-bold text-lg">
                <FormatRupiah value={cart.price * cart.qty} />
              </span>
            </div>
            <div className="absolute right-0 mt-2">
              <input
                type="number"
                id="qty"
                value={cart.qty}
                // {...register(`qty${index}`)}
                className="flex h-14 bg-color-primary border-yellow-400 border-2 w-36 rounded-full items-center justify-between text-center pl-4 font-bold text-xl"
              />
              {cart.qty < 2 ? (
                <button
                  className="absolute top-2 size-11 left-0"
                  id="minus"
                  onClick={() => onClickDelete(cart.id)}
                  type="button"
                >
                  <Trash className="size-full" weight="fill" />
                </button>
              ) : (
                <button
                  className="absolute top-1 size-12 left-0"
                  id="minus"
                  onClick={
                    () => onClickMinusQty(cart.id, index)
                    //   setTimeout(setValue(`qty${index}`, cartData.qty), 200)
                  }
                  type="button"
                >
                  <MinusCircle className="size-full" weight="fill" />
                </button>
              )}

              <button
                className="absolute top-1 right-0 size-12"
                id="plus"
                onClick={
                  () => onClickPlusQty(cart.id, index)
                  //   setTimeout(setValue(`qty${index}`, cartData.qty), 200)
                }
                type="button"
              >
                <PlusCircle className="size-full" weight="fill" />
              </button>
            </div>
          </div>
        ))}
        <div className="pb-8">
          <h3 className="flex justify-between font-bold text-2xl">
            Total{" "}
            <span>
              <FormatRupiah value={subTotal} />
            </span>
          </h3>
          {dataCart.length < 1 ? (
            <button
              disabled
              className="hover:cursor-not-allowed text-center bg-gray-600 text-white w-full mt-4 p-3 rounded-md"
            >
              Bayar
            </button>
          ) : (
            <Link to="/payment">
              <button className="text-center bg-sky-600 text-white w-full mt-4 p-3 rounded-md">
                Bayar
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
