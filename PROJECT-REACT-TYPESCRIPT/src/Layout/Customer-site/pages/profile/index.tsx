import React, { useEffect, useState } from "react";
import { getApiBank, getDetailUser } from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { IVisa } from "../../../../Interface";
import { updateUser } from "../../../../Api";
import { AiFillCreditCard } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
import { BsCart4 } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Button } from "flowbite-react";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const ClickClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth: any = localStorage.getItem("auth") || "";
  let userLogin = auth ? JSON.parse(auth) : {};
  const listBanks: any = useSelector((state: any) => state?.bankReducer?.banks);
  const [bank, setBank] = useState();
  const [code, setCode] = useState();
  const [exp, setExp] = useState();
  const [cvc, setCvc] = useState();
  const [avatar, setAvatar] = useState<string>();
  const [name, setName] = useState<string>();

  const userDetail: any = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );

  useEffect(() => {
    dispatch(getApiBank());
    dispatch(getDetailUser(userLogin.id));
  }, []);

  const addVisa = async (e: any) => {
    e.preventDefault();
    const visa = listBanks.find((item: IVisa) => item.code === code);
    if (!visa) {
      toast.error("THẺ VISA KHÔNG TỒN TẠI HOẶC SAI MÃ");
    } else {
      const update = { ...userDetail, cardVisa: visa };
      const respon = await updateUser(update); // cập nhật lại user
      if ((respon as any).status === 200) {
        toast.success("THÊM THẺ VISA THÀNH CÔNG");
        dispatch(getDetailUser(userDetail.id));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };
  const updateUserApi = async () => {
    const newUserAvatar = {
      ...userDetail,
      avatar: avatar,
      name: name,
    };
    const res = await updateUser(newUserAvatar);
    dispatch(getDetailUser(userDetail.id));
    setOpen(false);
  };
  return (
    <>
      {/* model */}

      <Dialog open={open} handler={ClickClose}>
        <DialogHeader>
          {" "}
          Cập nhật thông tin cá nhân{" "}
          <LiaUserEditSolid className="text-light-blue-600 ml-5" />
        </DialogHeader>
        <DialogBody divider>
          <input
            type="text"
            className="w-full py-4 rounded-[7px] border-light-blue-500"
            placeholder="Ảnh đại diện"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAvatar(e.target.value)
            }
          />
          <input
            type="text"
            className="w-full mt-2   py-4 rounded-[7px] border-light-blue-500"
            placeholder="Họ và tên "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={ClickClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

          <Button color="green">
            <p onClick={updateUserApi}>
              <span>Cập nhật</span>
            </p>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* model */}
      <img
        className="w-full h-[100px] object-cover "
        src="https://wallpapercrafter.com/sizes/3840x2160/213577-perfume-scent-pink-and-ribbon-hd.jpg"
        alt=""
      />
      {/* profile user begin*/}
      <div className="h-[550px] bg-gray-200 pt-10 pb-2">
        {/* Card start */}
        <div>
          <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4 pb-6">
              <div className="text-center my-4">
                <img
                  className="h-32 w-32 object-cover rounded-full border-4 border-white mx-auto my-4"
                  src={`${userDetail.avatar}`}
                  alt=""
                />
                <div className="py-2">
                  <h3 className="font-bold text-2xl mb-2 text-light-blue-600">
                    {userDetail.name}
                  </h3>
                  <h3 className="font-bold text-2xl mb-1">
                    {userDetail.email}
                  </h3>
                  <div className="inline-flex text-gray-700 items-center gap-4 pl-[80px]  w-full mt-2">
                    <AiFillCreditCard className="text-green-500" />
                    Số dư {userDetail?.cardVisa?.wallet?.toLocaleString()} ₫
                  </div>
                  <div className="inline-flex text-gray-700 items-center gap-4  pl-[80px]  w-full  mt-2">
                    <BsCart4 className="text-green-500 " />
                    <NavLink to={"/cart"}>Giỏ hàng của bạn</NavLink>
                  </div>
                </div>
              </div>

              <div className=" px-2">
                <button
                  onClick={openModal}
                  className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 w-full py-2"
                >
                  Sửa thông tin
                </button>
              </div>
            </div>
            <div className="px-4 py-5">
              <div className="flex gap-2 items-center text-gray-800r text-light-blue-500  m-auto">
                <BiHomeSmile />
                <NavLink to={"/"}>
                  <p>Trang chủ</p>
                </NavLink>
              </div>
              {userDetail.role === "admin" && (
                <div className=" flex pb-3 gap-2 items-center text-gray-800r text-light-blue-500  m-auto">
                  <MdAdminPanelSettings />
                  <NavLink to={"/admin"}>
                    <p>Trang Admin</p>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Card end */}
      </div>

      {/* profile user end*/}
      <hr className="text-light-blue-400 h-[3] w-[3]"></hr>
      {/* add visa */}
      <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16 mt-10">
        <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
          <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
            <h4 className="text-2xl 2xl:text-3xl font-bold text-heading ">
              THÊM THẺ VISA
            </h4>
          </div>
          <form
            onSubmit={(e) => addVisa(e)}
            className="w-full mx-auto flex flex-col justify-center "
            noValidate
          >
            <img
              className="w-[200px] object-cover"
              src="https://blog.logomyway.com/wp-content/uploads/2022/02/visa-logo-2.jpg"
              alt=""
            />
            <div className="flex flex-col space-y-5">
              <div className="relative mt-5">
                <select onChange={(e: any) => setBank(e.target.value)}>
                  <option value="">Ngân hàng</option>
                  <option value="Techcombank">Techcombank</option>
                  <option value="Vietcombank">Vietcombank</option>
                </select>
              </div>
              <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 gap-4">
                <div className="flex">
                  <div className="relative w-7/12 flex-shrink-0 my-2">
                    <input
                      type="text"
                      id="card-no"
                      name="card-no"
                      className="w-full  border border-gray-200 px-2 py-3 pl-[45px] text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      onChange={(e: any) => setCode(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img
                        className="w-6 h-6"
                        src="https://static.vecteezy.com/system/resources/previews/022/100/276/original/visa-logo-transparent-free-png.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="credit-expiry"
                    className="w-full my-2  border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MM/YY"
                    onChange={(e: any) => setExp(e.target.value)}
                  />
                  <input
                    type="text"
                    name="credit-cvc"
                    className="w-1/6 my-2 flex-shrink-0  border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="CVC"
                    onChange={(e: any) => setCvc(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <button
                  data-variant="flat"
                  className=" text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                  type="submit"
                >
                  THÊM
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
