import axios from "axios";

// create

// get all

// get detail
export const getApiDetailProduct = (id: any) => {
  return axios
    .get(`http://localhost:5000/products/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
// put

// delete
export const deleteProducts = (id: any) => {
  return axios
    .delete(`http://localhost:5000/products/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
