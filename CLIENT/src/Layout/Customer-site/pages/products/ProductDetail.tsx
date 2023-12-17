import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { IProduct, IUser } from "../../../../Interface";
import { AppDispatch, useAppDispatch } from "../../../../store";
import { getDetailProduct, getDetailUser } from "../../../../store/action";
import { BiSolidStar } from "react-icons/bi";
import { FaStarHalfAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { updateUser } from "../../../../Api/user";
const ProductsDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const idProduct = useParams();
  useEffect(() => {
    dispatch(getDetailProduct(idProduct.id));
    dispatch(getDetailUser(userLogin.id));
  }, []);
  // user
  const auth: any = localStorage.getItem("auth") || "";
  let userLogin = auth ? JSON.parse(auth) : {}; // chỉ lấy id thôi
  // userLogin thì push được còn với user từ store thì ko push được
  const userDetail = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );

  const productDetail = useSelector(
    (state: any) => state?.productReducer?.productDetail
  );
  const [img, setImg] = useState<string>(productDetail?.images?.url1);
  const [quantity, setQuantity] = useState<number>(1);
  //product

  //SLIDER

  useEffect(() => {
    setImg(productDetail?.images?.url1);
  }, [productDetail]);

  const handleClick = (url: string) => {
    setImg(url);
  };
  // add to cart
  const addCart = async () => {
    if (productDetail.quantity > 0) {
      let productOder = {
        idProduct: productDetail.id,
        idUser: userDetail.id,
        oderQty: Number(quantity),
        ...productDetail,
      };
      const productInCart = userDetail?.cart.find(
        (item: IProduct) => item?.id === productOder?.idProduct
      );

      // LOGIC NEW
      // cập nhật cart userDetail
      if (productInCart) {
        // Cập nhật cart
        const updateCart = userDetail.cart.map((item: any) => {
          // map có thể trả về bất kỳ kiểu dữ liệu nào
          // map tạo 1 mảng, object mới v
          // map ko cập nhật mảng gốc x
          if (item.id === productInCart.id) {
            // tìm thấy thì tăng quantyx
            return {
              ...item,
              oderQty: productInCart.oderQty + Number(quantity),
            };
          } else {
            return item; // nếu ko tìm thấy sp giữ nguyên sp
          }
        });
        // Cập nhật uer
        const updateUserApi = {
          ...userDetail,
          cart: updateCart,
        };
        const res = await updateUser(updateUserApi); // cập nhật user API
        dispatch(getDetailUser(userDetail.id)); // Lấy lại API
        toast.success("Thêm vào giỏ thành công");
      } else {
        const updateUserDetail = {
          ...userDetail,
          cart: [...userDetail.cart, productOder],
        };
        const res = await updateUser(updateUserDetail); // đi ko về
        dispatch(getDetailUser(userDetail.id)); // kêu về
        toast.success("Thêm vào giỏ thành công");
      }
    }
  };

  return (
    <main>
      <ToastContainer />
      {/* <!-- nav-site-tab --> */}
      <div className="home-site-tab container">
        <NavLink to={"/"}>Trang chủ |</NavLink>
        <NavLink to={"/male"}>Nước Hoa Nam |</NavLink>
        <b>Narciso Rodriguez For Her Forever </b>
      </div>
      {/* <!-- card-detail render local--> */}
      <div className="card-wrapper container">
        <div className="card">
          {/* <!-- cart left> --> */}
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={`${img}`} alt="" />
                <img src={`${img}`} alt="" />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                <button
                  onClick={() => handleClick(`${productDetail.images?.url2}`)}
                >
                  <img src={`${productDetail.images?.url2}`} alt="show image" />
                </button>
              </div>
              <div className="img-item">
                <button
                  onClick={() => handleClick(`${productDetail.images?.url3}`)}
                >
                  <img src={`${productDetail.images?.url3}`} alt="show image" />
                </button>
              </div>
            </div>
          </div>
          {/* <!-- cart main> --> */}
          <div className="card-content">
            <div className="card-content-top">
              <h3 className="name">{productDetail.name}</h3>
              <div className="rating">
                <BiSolidStar />
                <BiSolidStar />
                <BiSolidStar />
                <BiSolidStar />
                <FaStarHalfAlt />
                <p>1 đánh giá</p>
                <p>{productDetail.gender}</p>
              </div>
              <p>
                Thương hiệu: <b>{productDetail.brand}</b>
              </p>
              <div className="type">
                <p>Eau de Parfum 100ml</p>
                <p className="new">New</p>
                <p className="editon">Limited Edition</p>
              </div>
              <p>Standard Size</p>
              <div className="standard-size">
                <div className="size-ml">
                  <img src={`${productDetail?.images?.url1}`} alt="" />
                  <p>Eau de Parfum 100ml</p>
                </div>
                <div className="size-ml">
                  <img src={`${productDetail?.images?.url1}`} alt="" />
                  <p>Eau de Parfum 200ml</p>
                </div>
                <div className="size-ml">
                  <img src={`${productDetail?.images?.url1}`} alt="" />
                  <p>Eau de Parfum 300ml</p>
                </div>
              </div>
            </div>
            <div className="content-ship">
              <div className="ship">
                <i className="fa-solid fa-truck-fast"></i>
                <p>Freeship toàn quốc</p>
              </div>
              <div className="ship">
                <i className="fa-regular fa-square-check"></i>
                <p>Chính hãng 100%</p>
              </div>
              <div className="ship">
                <i className="bx bx-transfer-alt"></i>
                <p>Đổi trả miễn phí</p>
              </div>
            </div>
            <p className="call">
              Gọi đặt mua <i className="fa-solid fa-phone"></i> 0935 27 61 88
            </p>
          </div>
          {/* <!-- cart right> --> */}
          {userDetail.id ? (
            <div className="product-shopping">
              <p className="last-price">30.000.000 ₫</p>
              <p className="new-price">27.500.000 ₫</p>
              <p>Tiết kiệm: 10%</p>
              <p>CÒN HÀNG</p>
              <div className="store-near">
                <i className="fa-solid fa-store"></i>
                <p>Cửa hàng gần bạn</p>
              </div>
              <div className="quantity">
                <p>Số lượng:</p>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  id="quantityAdd"
                  onChange={(e: any) => setQuantity(e.target.value)}
                />
              </div>
              <button className="addCart" onClick={addCart}>
                Thêm vào giỏ hàng
              </button>
              <button className="buyNow">Mua ngay</button>
              <button className="favorite hide-tablet">
                <i className="fa-regular fa-heart"></i>
                <p>Yêu thích</p>
              </button>
            </div>
          ) : (
            <p>Bạn chưa đăng nhập ko thể mua</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductsDetail;
