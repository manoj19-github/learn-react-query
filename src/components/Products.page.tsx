import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getProductsService } from "../services/products.services";

const Products = () => {
  const {
    isLoading,
    data,
    isError,
    error,
  }: { isLoading: boolean; data: any; isError: boolean; error: any } = useQuery(
    "get-products",
    getProductsService
  );
  if (isLoading) {
    return <div>Products Loading please wait ....</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div>
      <h1>Products page</h1>
      <div>
        {data?.data.products.map((self: any) => {
          return (
            <div>
              <p>
                {self.name} || {self.price}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
