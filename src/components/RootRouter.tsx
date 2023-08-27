import React, { Suspense, lazy } from "react";

import { Navigate, Route, Routes } from "react-router-dom";


const Home = lazy(()=>import("./Home.page"))
const Products = lazy(()=>import("./Products.page"))
const Transaction = lazy(()=>import("./Transaction.page"))
const RootRouter = () => {
  return (
      <Suspense fallback={<p>Page is Loading</p>}>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/transaction" element={<Transaction />} />
        <Route path="/" element={<Navigate replace to={"/home"} />} />
        <Route path="*" element={<Navigate replace to={"/home"} />}/>
      </Routes>
      </Suspense>
 
  );
};

export default RootRouter;
