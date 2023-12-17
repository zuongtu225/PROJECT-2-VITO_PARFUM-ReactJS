// BÊN FILE API THÌ  XỬ LÝ LOGIC CRUD
import axios from "axios";
import React from "react";

// Thêm đơn hàng mới
export const addApiOrders = (order: any) => {
  return axios
    .post(`http://localhost:5000/orders`, order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

// Thêm đơn hàng mới
export const deleteOrder = (order: any) => {
  return axios
    .delete(`http://localhost:5000/orders/${order.id}`, order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
// Thêm đơn hàng mới
export const updateOrderApi = (order: any) => {
  return axios
    .put(`http://localhost:5000/orders/${order.id}`, order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
