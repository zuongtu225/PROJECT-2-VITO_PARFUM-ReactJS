import React, { useEffect, useState } from "react";
import { ItemNavbar } from "../../../utils/nav";
import { NavLink, useNavigate } from "react-router-dom";
import { FcCallback } from "react-icons/fc";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FiFacebook, FiSearch } from "react-icons/fi";
import { PiUserSquareLight } from "react-icons/pi";
import { RiShoppingCart2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { LuStore } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { getDetailUser } from "../../../../../store/action";
import { ToastContainer, toast } from "react-toastify";
const CustomerHeader = () => {
  const auth: any = localStorage.getItem("auth") || "";
  let userLogin = auth ? JSON.parse(auth) : {};
  const userDetail = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  // console.log("userDetail now", userDetail);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDetailUser(userLogin.id));
  }, [auth]);

  //log out
  const nagivate = useNavigate();
  const logout = () => {
    localStorage.removeItem("auth");
    nagivate("/login");
  };
  // go to cart
  const navigate = useNavigate();
  const cartPage = () => {
    if (userLogin.id) {
      navigate("/cart");
    } else {
      toast.error("Vui lòng đăng nhập để xem giỏ hàng");
    }
  };
  const profile = () => {
    navigate("/profile");
  };
  return (
    <header id="moveTop">
      <ToastContainer />
      {/* nav site top */}
      <nav className="nav-site container">
        <ul>
          <li>Chào mừng đến với Vito Corleone</li>
          <li>Yêu thích</li>
          <li>Hàng hiệu giảm 50%</li>
        </ul>
        <ul>
          <li>Liên hệ chúng tôi</li>
          <li>
            <div className="hotline">
              <FcCallback className="w-4 h-4" />
              <p>02.999.999.999</p>
            </div>
          </li>
          <li>
            <AiOutlineYoutube className="w-4 h-4" />
          </li>
          <li>
            <FiFacebook className="w-4 h-3.5" />
          </li>

          <li>
            <AiOutlineInstagram className="w-4 h-4" />
          </li>
        </ul>
      </nav>
      {/* desktop menu*/}
      <div className="header-main container ">
        <div className="logo">
          <NavLink to={"/"}>
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2022/4/JS/DD/NU/1107622/logo-mp-500x500.PNG"
              alt=""
            />
          </NavLink>
        </div>
        <div className="menu-item">
          <div className="input-item-search mt-2">
            <div className="form-search-small" />
            <input
              type="text"
              id="searchTop"
              placeholder="Tìm kiếm"
              className="hide-mobile"
            />
            <FiSearch className="icon-search" />
            <p className="k">|</p>
          </div>

          <div className="account hide-mobile ">
            <div id="loginAccount " className="w-100px">
              {userLogin?.id ? (
                // có id coi như có login
                <div className="flex gap-3 items-center">
                  <img
                    onClick={profile}
                    style={{
                      objectFit: "cover",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                    src={`${userDetail?.avatar}`}
                    alt=""
                  />
                  <p onClick={profile}>
                    {userDetail?.email?.slice(
                      0,
                      userDetail?.email.indexOf("@")
                    )}
                  </p>
                  <button onClick={logout}>
                    <RiLogoutBoxRLine className="text-red-600 w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <NavLink to={"/login"} className="hide-mobile hide-tablet">
                    Đăng nhập
                  </NavLink>
                  <PiUserSquareLight className="w-8 h-6" />
                </div>
              )}
            </div>
          </div>

          <div className="cart">
            <p className="hide-mobile hide-tablet">|</p>
            <div className="nationwide-store hide-mobile hide-tablet"></div>
            <LuStore />

            <RiShoppingCart2Line className="w-8 h-6" onClick={cartPage} />
            {userLogin?.id && (
              <p id="length-cart">{userDetail?.cart?.length}</p>
            )}
          </div>
          {/* <i className="fa-solid fa-bars icon-menu hide-desktop" /> */}
        </div>
      </div>
      <div className="mega-menu container">
        <ul>
          {ItemNavbar?.map((item) => {
            return (
              <li key={item.id}>
                <NavLink to={`${item.path}`} className={`${item.className}`}>
                  {item.title}
                </NavLink>
                <div className="menu-show show-man">
                  <div className="flex-menu-show-ul">
                    <ul>
                      <li>
                        <NavLink to={"/male"}>Phân loại</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Yêu thích nhất</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Nước hoa Niche</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Giftset</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Nước hoa Unisex</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Nước hoa Mini</NavLink>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <NavLink to={"/"}>Thương hiệu</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>GUCCI</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>JEAN PAUL</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>NARCISO RODRIGUEZ</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>DOLCE & GABBANA</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>PACO RABANNE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>RALPH LAUREN</NavLink>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <NavLink to={"/"}>______</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>ROJA HAUTE LUXE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>PACO RABANNE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>CALVIN KLEIN</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>VERSACE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>BUBBRERY</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>CAROLINA HERREARA</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>Xem tất cả</NavLink>
                      </li>
                    </ul>
                    <div className="menu-show-img">
                      <img src={`${item.image}`} alt="" />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default CustomerHeader;
