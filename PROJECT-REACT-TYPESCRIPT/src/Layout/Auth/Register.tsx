import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomerFooter from "../Customer-site/components/layout/Footer/CustomerFooter";
import { useDispatch, useSelector } from "react-redux";
import { getApiUsers } from "../../store/action";
import { AppDispatch } from "../../store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CustomerHeader from "../Customer-site/components/layout/Header/CustomerHeader";
const Register = () => {
  const data = useSelector((state: any) => state?.userReducer?.users);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [success, setSuccess] = useState<any>("");
  const [error, setError] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getApiUsers());
  }, []);
  const register = async (e: any) => {
    e.preventDefault();
    const checkUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const maxId = Math.max(...data.map((item: any) => item.id));

    let newUser = {
      id: maxId + 1,
      email: email,
      password: password,
      avatar: "",
      cart: [],
      cardVisa: [],
      role: "user",
      status: true,
      phone: "",
    };

    const checkError = validate(checkUser);
    if (checkError.isError === false) {
      const response = await axios.post("http://localhost:5000/users", newUser);
      if (response.status == 201) {
        toast.success("Đăng Ký Thành Công");
        setTimeout(() => {
          setEmail("");
          dispatch(getApiUsers());
          navigate("/login");
          setSuccess("Đăng ký thành công");
        }, 3000);
      } else {
        toast.error("Đăng ký thất bại");
      }
    }
  };
  const validate = (user: any) => {
    const newError = {
      isError: false,
      emailMSG: "",
      passwordMSG: "",
      confirmPassWordMSG: "",
    };
    const checkData = data?.find((item: any) => item.email === user.email);
    if (checkData) {
      newError.isError = true;
      newError.emailMSG = "Email đã tồn tại ! ";
    }
    const regxEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!user.email.match(regxEmail)) {
      newError.isError = true;
      newError.emailMSG = "Email không đúng định dạng - Vui lòng nhập lại";
    }
    if (user.password.length < 8 || user.password.length > 30) {
      newError.isError = true;
      newError.passwordMSG =
        "Vui lòng tạo mật khẩu lớn hơn 8 và nhỏ hơn 30 ký tự";
    }
    if (user.password !== user.confirmPassword) {
      newError.isError = true;
      newError.confirmPassWordMSG = "Mật khẩu không trùng nhau";
    }
    setError(newError);
    return newError;
  };

  return (
    <>
      <CustomerHeader />
      <div className="bg-blue-200 flex">
        <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
          <h1 className="font-bold text-2xl my-10 text-white"> Đăng Ký</h1>
          <form
            onSubmit={(e) => register(e)}
            className="mt-2 flex flex-col lg:w-1/2 w-8/12"
          >
            {/* email */}
            {error?.isError == true && (
              <p className="text-black-700">{error.emailMSG} </p>
            )}
            <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
              <div className="flex -mr-px justify-center w-15 p-4">
                <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                  <i className="fas fa-user-circle" />
                </span>
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="flex-shrink flex-grow flex-auto  leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                placeholder="Nhập email"
              />
            </div>

            {/* password */}
            {error?.isError == true && (
              <p className="text-red-700">{error.passwordMSG} </p>
            )}
            <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
              <div className="flex -mr-px justify-center w-15 p-4">
                <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600">
                  <i className="fas fa-lock" />
                </span>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                placeholder="Mật khẩu"
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                  <i className="fas fa-eye-slash" />
                </span>
              </div>{" "}
            </div>

            {/* confirm password */}
            {error?.isError == true && (
              <p className="text-red-700">{error.confirmPassWordMSG} </p>
            )}
            <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
              <div className="flex -mr-px justify-center w-15 p-4">
                <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600">
                  <i className="fas fa-lock" />
                </span>
              </div>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                placeholder="Nhập lại mật khẩu"
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                  <i className="fas fa-eye-slash" />
                </span>
              </div>
            </div>
            {error?.isError == false && (
              <p className="text-green-700">{success} </p>
            )}
            <NavLink
              to={"/login"}
              className="text-base text-white text-right font-roboto leading-normal hover:underline mb-6"
            >
              Đăng nhập
            </NavLink>
            <button className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-20">
              Đăng Ký
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
      <CustomerFooter />
    </>
  );
};

export default Register;
