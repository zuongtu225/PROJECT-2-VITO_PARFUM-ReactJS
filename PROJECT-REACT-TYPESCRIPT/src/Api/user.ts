import axios from "axios";

// FILE API

// Nhánh Đi ->

// CRUD API

// UPDATE => CẬP NHẬT USER
export const updateUser = (user: any) => {
  // console.log("api", user);
  return axios
    .put(`http://localhost:5000/users/${user.id}`, user)

    .then((response) => {
      return response; // ĐẨY LÊN API THÌ KO CẦN TRẢ VỀ DATA và chỉ cần response
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
