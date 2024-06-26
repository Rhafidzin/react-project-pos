import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import OrderProductPage from "./components/order";
import PaymentPage from "./components/payment";
import TransactionHistoryPage from "./components/history";
import TransactionDetailPage from "./components/detail";
import ProductPage from "./components/product";
import ProductFormAdd from "./components/product/form/ProductFormAdd";
import ProductFormEdit from "./components/product/form/ProductFormEdit";
import ProductDetail from "./components/product/ProductDetail";
import CategoryPage from "./components/category";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/order/product" />} />
      <Route path="/order/product" element={<OrderProductPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/history" element={<TransactionHistoryPage />} />
      <Route
        path="/detail/transaction/:id"
        element={<TransactionDetailPage />}
      />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/form/add" element={<ProductFormAdd />} />
      <Route path="/product/form/edit/:id" element={<ProductFormEdit />} />
      <Route path="/product/detail/:id" element={<ProductDetail />} />
      <Route path="/category" element={<CategoryPage />} />
    </Routes>
  );
}
