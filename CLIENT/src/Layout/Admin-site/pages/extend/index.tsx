import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/layout/SideBar";
const AdminExtend = () => {
  const token: any = localStorage.getItem("auth") || [];
  const auth: any = token ? JSON.parse(token) : [];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.role == "user") {
      navigate("/");
    }
  }, []);
  return (
    <>
      {auth.role == "admin" && (
        <div className="flex w-full gap-1">
          <div className="w-1/6">
            <SideBar />
          </div>
          <div className="w-5/6 p-10">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminExtend;
