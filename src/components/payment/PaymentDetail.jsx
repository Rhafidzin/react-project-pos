import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { dropCart, fetchCart } from "../../store/reducers/cartSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PaymentDetail() {
  const navigate = useNavigate();
  const { dataCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { register, watch, setValue, handleSubmit } = useForm();
  const subTotal = dataCart
    .map((item) => item.price * item.qty)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);
  const change = parseFloat(watch().totalPay) - subTotal;

  useEffect(() => {
    setValue("totalAmount", subTotal);
  }, [subTotal]);

  const onClickSubmit = (data) => {
    let transactionsDetail = [];
    for (let i = 0; i < dataCart.length; i++) {
      transactionsDetail.push({
        product: dataCart[i].id,
        quantity: dataCart[i].qty,
        subtotal: dataCart[i].qty * dataCart[i].price,
      });
    }
    // console.log(transactionsDetail);
    const payloadPost = {
      totalAmount: data.totalAmount,
      totalPay: parseFloat(data.totalPay),
      transactionsDetail,
    };
    console.log(payloadPost);
    axios
      .post("http://localhost:8081/pos/api/addtransaction", payloadPost)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
    Swal.fire({
      title: "Pembayaran Berhasil!",
      text: "Uang berhasil dikirim.",
      icon: "success",
    });
    navigate("/");
    dispatch(dropCart(transactionsDetail));
    setTimeout(() => dispatch(fetchCart()), 200);
  };

  console.log(change);

  return (
    <div className="mx-4 mt-16">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 flex flex-col border-r-4 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Rincian Pesanan</h1>

          <div className="grid gap-4">
            {dataCart.map((c) => (
              <div key={c.id} className="flex">
                <img src={c.image} alt="" className="size-28 object-cover" />
                <div className="flex grow flex-col text-xl font-medium">
                  <h3 className="flex justify-between grow mx-4">
                    <span>{c.title}</span>
                    <span>{c.qty}x</span>
                    <span>
                      <FormatRupiah value={c.price * c.qty} />
                    </span>
                  </h3>
                  <p className="mx-4 h-14">
                    <FormatRupiah value={c.price} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-6 ">Pembayaran</h1>
          <h2 className="flex justify-between font-bold text-lg">
            Total
            <span>
              <FormatRupiah value={subTotal} />
            </span>
          </h2>
          <form onSubmit={handleSubmit(onClickSubmit)}>
            <div className="my-16 relative">
              <h3 className="font-bold text-xl mb-4">Dibayar</h3>
              <input
                type="number"
                {...register("totalPay")}
                className="border w-full h-12 text-xl font-medium pl-12"
              />
              <span className="absolute left-2 bottom-3 pr-2 font-bold border-r-2 border-gray-400">
                Rp
              </span>
            </div>
            <div>
              <h4 className="flex justify-between font-bold text-2xl">
                Kembalian
                {/* NaN */}
                {subTotal === 0 || isNaN(change) ? (
                  <span>
                    <FormatRupiah value="0" />
                  </span>
                ) : (
                  <span>
                    <FormatRupiah value={change} />
                  </span>
                )}
              </h4>
            </div>
            {change <= -1 || isNaN(change) || subTotal === 0 ? (
              <button
                disabled
                className="w-full bg-gray-600 text-white size-12 rounded-md mt-12 cursor-not-allowed"
              >
                Selesaikan
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-sky-600 text-white size-12 rounded-md mt-12"
              >
                Selesaikan
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
