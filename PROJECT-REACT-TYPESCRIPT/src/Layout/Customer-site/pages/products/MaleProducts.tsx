import React, { useEffect, useState } from "react";
import { LiaHomeSolid, LiaCartArrowDownSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  getApiBrands,
  getApiOrigins,
  getApiProducts,
} from "../../../../store/action";
import { IProduct } from "../../../../Interface";
import { NavLink, useNavigate } from "react-router-dom";
const MaleProducts = () => {
  const auth: any = localStorage.getItem("auth") || "";
  let userLogin = auth ? JSON.parse(auth) : {};
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getApiBrands());
    dispatch(getApiOrigins());
    dispatch(getApiProducts());
  }, []);

  const data = useSelector((state: any) => state);
  const [brands, setBrands] = useState<any>(data?.brandReducer?.brands);
  const [origins, setOrigins] = useState<any>(data?.originReducer?.origins);
  const [products, setProducts] = useState<any>(data?.productReducer?.products);
  const male = products?.filter((item: IProduct) => item.gender === "male");

  useEffect(() => {
    setBrands(data?.brandReducer?.brands);
    setProducts(data?.productReducer?.products);
    setOrigins(data?.originReducer?.origins);
  }, [data]);

  // get id và go to page detail
  const navigate = useNavigate();
  const productDetail = (id: number) => {
    // gửi id đến action để action có thể get product trong axios
    navigate(`/detail/${id}`);
  };
  return (
    <>
      <main>
        <div className="site-breakcrumb container">
          <NavLink className="flex text-black gap-1 items-center" to={"/"}>
            Trang chủ <LiaHomeSolid />
          </NavLink>
        </div>
        <div className="main-content container">
          <div className="brands">
            <div className="left-wrapper">
              <h4>Thương hiệu</h4>
              <div className="all-brands">
                <ul className="render-allBrands">
                  {brands?.map((item: any) => {
                    return (
                      <li>
                        <input type="checkbox" className="brand-checkbox" />
                        <label onClick={() => productDetail(item.id)}>
                          {item.name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="left-wrapper">
              <h4>Xuất xứ</h4>
              <div className="all-brands">
                <ul className="render-allBrands">
                  {origins?.map((item: any) => {
                    return (
                      <li>
                        <input type="checkbox" className="brand-checkbox" />
                        <label htmlFor="${item.brand}">{item.name} </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="left-wrapper">
              <h4>Dung tích</h4>
              <div className="all-brands ">
                <ul className="render-allBrands ">
                  <li>
                    <input type="checkbox" className="brand-checkbox" />
                    <label htmlFor="${item.brand}">100ml</label>
                  </li>
                  <li>
                    <input type="checkbox" className="brand-checkbox" />
                    <label>200ml</label>
                  </li>
                  <li>
                    <input type="checkbox" className="brand-checkbox" />
                    <label>300ml</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="all-products">
            <div className="result-info">
              <div className="info-left">
                <p>Nước hoa Nam</p>
                <p>/</p>
                <p className="brand-name">Thương hiệu</p>
              </div>
              <div className="info-right">
                <p>Sắp xếp theo:</p>
                <select>
                  <option>Bán chạy </option>
                  <option>Sản phẩm mới</option>
                  <option>Giá thấp đến cao</option>
                  <option>Giá cao đến thấp</option>
                </select>
              </div>
            </div>
            <div className="product-content-main">
              {male?.map((item: IProduct) => {
                return (
                  <div className="product">
                    <div className="product">
                      <div className="buy-now-container">
                        <img src={`${item.images.url1}`} alt="" />
                        <button>MUA NGAY</button>
                      </div>
                      <div className="content-product">
                        <p
                          className="brand-title-product"
                          onClick={() => productDetail(item.id)}
                        >
                          {item.brand}
                        </p>
                        <p
                          className="name-product"
                          onClick={() => productDetail(item.id)}
                        >
                          {item.name}
                        </p>
                        <div className="price-cart-add items-center pt-10">
                          <p
                            className="price-product pl-5"
                            onClick={() => productDetail(item.id)}
                          >
                            {item.price.toLocaleString()}
                          </p>
                          {userLogin?.id ? (
                            <LiaCartArrowDownSolid className="w-6 h-5" />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MaleProducts;
