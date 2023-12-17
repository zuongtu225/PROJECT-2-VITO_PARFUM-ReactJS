import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, ProductType } from "../../Interface";
import { getApiDetailProduct } from "../../Api";

// BÊN ACTION TÁC DỤNG CALL API VỀ  === dispatch để get thôi :))
// thunk để get
export const getApiProducts = createAsyncThunk<ProductType>(
  "products",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

export const getApiUsers = createAsyncThunk<ProductType>("users", async () => {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
});

export const getApiOrigins = createAsyncThunk<ProductType>(
  "origins",
  async () => {
    const response = await axios.get("http://localhost:5000/origins");
    return response.data;
  }
);
export const getApiBrands = createAsyncThunk<ProductType>(
  "brands",
  async () => {
    const response = await axios.get("http://localhost:5000/brands");
    return response.data;
  }
);
export const getApiBank = createAsyncThunk<ProductType>("banks", async () => {
  const response = await axios.get("http://localhost:5000/banks");
  return response.data;
});
export const getDetailProduct = createAsyncThunk<any, any>(
  "getDetailProduct",
  async (id: any) => {
    const response = await getApiDetailProduct(id);
    return (response as any).data;
  }
);
export const getDetailUser = createAsyncThunk<any, any>(
  "getDetailUser",
  async (id: any) => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    return response.data; // response.data vì ta cần lấy data
  }
);

export const getOrderApi = createAsyncThunk<any>("getOrderApi", async () => {
  const response = await axios.get("http://localhost:5000/orders");
  console.log("response", response);

  return response.data;
});

export const getHistoryOrders = createAsyncThunk<any>(
  "getHistoryOrders",
  async () => {
    const response = await axios.get("http://localhost:5000/historyOrders");
    return response.data;
  }
);
