import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiBank, getDetailUser } from "../../../../store/action";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { updateUser } from "../../../../Api";
import { IProduct } from "../../../../Interface";
const CustomerCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [carts, setCarts] = useState<any>([]);
  const auth: any = localStorage.getItem("auth") || "";
  let userLogin = auth ? JSON.parse(auth) : {};
  const userDetail: any = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  useEffect(() => {
    dispatch(getDetailUser(userLogin.id));
  }, []);

  useEffect(() => {
    setCarts(userDetail.cart);
  }, [userDetail]); // khi user detail thay đổi state thì phải cập nhật ngay

  const total = carts?.reduce((accumulator: any, product: any) => {
    // NHỚ THAM CHIẾU LÀ THAY ĐỔI TỚI THẰNG GỐC LUÔN <=======
    const productPrice = product.price * product.oderQty;
    return accumulator + productPrice;
  }, 0);
  // CÁCH NEW CẢI TIẾN CÓ THỂ SET LẠI API
  const minus = async (id: number) => {
    const updatedA = carts?.map((item: any) => {
      if (item.id === id && item.oderQty > 1) {
        return { ...item, oderQty: item.oderQty - 1 };
      }
      return item;
    });
    setCarts(updatedA); // chỉ hiển thị theo màn hình
    const newDataUserCart = { ...userDetail, cart: updatedA };
    const res = await updateUser(newDataUserCart);

    // khi gửi đi request thì sẽ nhận về 1 respon
  };
  const plus = async (id: number) => {
    const updatedA = carts?.map((item: any) => {
      if (item.id === id) {
        return { ...item, oderQty: item.oderQty + 1 };
      }
      return item;
    });
    setCarts(updatedA); // chỉ hiển thị theo màn hình
    const newDataUserCart = { ...userDetail, cart: updatedA };
    const res = await updateUser(newDataUserCart);
    // khi gửi đi request thì sẽ nhận về 1 respon
  };
  // delete
  const deleteCart = async (id: number) => {
    const updatedA = carts?.filter((item: IProduct) => item.id !== id);
    setCarts(updatedA); // chỉ hiển thị theo màn hình
    const newDataUserCart = { ...userDetail, cart: updatedA };
    const res = await updateUser(newDataUserCart);
  };
  //checkout
  // const [show, setShow] = useState(false);
  const goToCheckout = async () => {
    dispatch(getApiBank());
    dispatch(getDetailUser(userLogin.id));
    const newDataUserCart = { ...userDetail, sum: total };
    const res = await updateUser(newDataUserCart);
    navigate("/checkout");
  };

  return (
    <main>
      <div className="homeIndex container">
        <NavLink className="flex items-center gap-1" to={"/"}>
          Trang chủ <VscHome />
        </NavLink>
        <p id="historyClick">Lịch sử đơn hàng</p>
      </div>
      <div className="cart-order container">
        <div className="cart-heading">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-item-flex">
          <p className="cart-item-count">0 sản phẩm</p>
          <NavLink to={"/"}>Tiếp tục mua hàng</NavLink>
        </div>
        {/* <!-- orders --> */}
        <div className="cart-pay-wrapper flex">
          {/* <!-- orders --> */}
          <div className="cart-oder-left">
            {carts?.map((item: any) => {
              return (
                <div className="cart-item">
                  <div className="item-img-info">
                    <input type="checkbox" />
                    <img src={`${item.images.url1}`} alt="" />
                    <div className="detail-product-order">
                      <p className="name"> {item.name}</p>
                    </div>
                  </div>

                  <div className="price-order hide-mobile">
                    {item.price.toLocaleString()} ₫
                  </div>

                  <div className="quantity-parent">
                    <button onClick={() => minus(item.id)}>
                      <AiOutlineMinus className="fa-solid fa-minus pl-2"></AiOutlineMinus>
                    </button>
                    <input min="0" value={`${item.oderQty}`} />
                    <button onClick={() => plus(item.id)}>
                      <AiOutlinePlus className="fa-solid fa-plus pl-2"></AiOutlinePlus>
                    </button>
                  </div>
                  <div id="price-after">
                    {(item.price * item.oderQty).toLocaleString()} ₫
                  </div>
                  <RiDeleteBinLine
                    className="text-[20px] text-red-500 mr-5 cursor-pointer"
                    onClick={() => deleteCart(item.id)}
                  />
                </div>
              );
            })}
          </div>
          <div className="cart-oder-right">
            <div className="pay">
              <div className="total">
                <div className="field-discount">
                  <p>Mã giảm giá</p>
                  <p id="show-code-free">Nhập mã </p>
                </div>
                <div id="discount-show">
                  <input type="text" placeholder="Mã giảm giá" />
                  <button>Sử dụng</button>
                </div>
                <div className="transport">
                  <p>Phí vận chuyển:</p>
                  <p>20.000</p>
                </div>
                <div className="total-price">
                  <p>Tổng: </p>
                  <p id="printPrice" className="price pl-5 ">
                    {total?.toLocaleString()}
                  </p>
                  <button onClick={goToCheckout} className="pay-tottaly">
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!--  thanh toán --> */}
        </div>
      </div>
    </main>
  );
};

export default CustomerCart;
