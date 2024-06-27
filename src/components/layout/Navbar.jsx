import {
  BowlFood,
  Cards,
  CashRegister,
  List,
  Notepad,
} from "@phosphor-icons/react";
import { Wallet } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      {isShow ? (
        <div className="absolute min-h-full bg-sky-800 z-10 w-64">
          <button
            className="absolute right-2 top-2 hover:bg-sky-900"
            onClick={() => setIsShow(!isShow)}
          >
            <List size={32} color="#ffffff" />
          </button>
          <ul className="text-white flex flex-col text-xl mt-16 ">
            <Link to="/">
              <li className="hover:bg-sky-900 py-4 px-6 flex items-center justify-between gap-4">
                Order
                <Notepad size={32} color="#ffffff" />
              </li>
            </Link>
            <Link to="/payment">
              <li className="hover:bg-sky-900 py-4 px-6 flex items-center justify-between gap-4">
                Payment
                <Wallet size={32} color="#ffffff" />
              </li>
            </Link>
            <Link to="/product">
              <li className="hover:bg-sky-900 py-4 px-6 flex items-center justify-between gap-4">
                Product
                <BowlFood size={32} color="#ffffff" />
              </li>
            </Link>
            <Link to="/transaction">
              <li className="hover:bg-sky-900 py-4 px-6 flex items-center justify-between gap-4">
                Transaction
                <CashRegister size={32} color="#ffffff" />
              </li>
            </Link>
            <Link to="/category">
              <li className="hover:bg-sky-900 py-4 px-6 flex items-center justify-between gap-4">
                Category
                <Cards size={32} color="#ffffff" />
              </li>
            </Link>
          </ul>
        </div>
      ) : (
        <button
          className="absolute left-4 top-2 hover:bg-gray-300"
          onClick={() => setIsShow(!isShow)}
        >
          <List size={32} color="#1c1c1c" />
        </button>
      )}
    </>
  );
}
