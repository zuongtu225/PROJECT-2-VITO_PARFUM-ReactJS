import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../../../../../Interface";

// Thêm Sản phẩm
const AddProductForm = (props: any) => {
  const data = useSelector((state: any) => state?.productReducer?.products);
  const [images, setImages] = useState({});
  // B1: Tạo đối tượng
  const [newProduct, setNewProduct] = useState<IProduct>({
    id: Math.random(),
    brand: "",
    name: "",
    gender: "",
    images: {
      url1: "",
      url2: "",
      url3: "",
    },
    type: [
      {
        id: 1,
        name: "100ml",
        price: 10000000,
      },
      {
        id: 2,
        name: "200ml",
        price: 20000000,
      },
      {
        id: 3,
        name: "300ml",
        price: 20000000,
      },
    ], //loai sp
    provider: "",
    quantity: 3,
    price: 99999,
    origin: "",
    discount: 3,
    comments: [],
    rating: 0,
    isDealFragrant: true,
    isMini: true,
    isNew: false,
    isBestSeller: false,
    description: "",
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith("images.")) {
      const imageKey = name.split(".")[1];
      setNewProduct((prevState) => ({
        ...prevState,
        images: {
          ...prevState.images,
          [imageKey]: value,
        },
      }));
    } else {
      setNewProduct((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    props.handleData(newProduct);
  }, [newProduct]);

  return (
    <div>
      {/* các filed tùy ý nhưng ko có button */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="name"
              // value={newProduct.name}
              placeholder="Tên sản phẩm"
              onChange={handleOnChange}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="brand"
                onChange={handleOnChange}
              >
                <option value="">Thương hiệu</option>
                <option value="Narciso">Narciso</option>
                <option value="Versace">Versace</option>
                <option value="Hugo Boss">Hugo Boss</option>
                <option value="Roja">Roja</option>
                <option value="Gucci">Gucci</option>
                <option value="Chanel">Chanel</option>
                <option value="Dior">Dior</option>
                <option value="Dolce">Dolce</option>
                <option value="Yves Saint Laurent">Yves Saint Laurent</option>
              </select>
            </div>
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="origin"
                onChange={handleOnChange}
              >
                <option value="">Xuất xứ</option>
                <option value="Pháp">Pháp</option>
                <option value="Ý">Ý</option>
                <option value="Mỹ">Mỹ</option>
                <option value="Anh">Anh</option>
                <option value="Đức">Đức</option>
                <option value="Tây Ban Nha">Tây Ban Nha</option>
                <option value="Nhật Bản">Nhật Bản</option>
                <option value="Brasil">Brasil</option>
                <option value="Thụy Sĩ">Thụy Sĩ</option>
                <option value="Ấn Độ">Ấn Độ</option>
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3">
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              name="description"
              placeholder="Mô tả"
              onChange={handleOnChange}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <select
                name="provider"
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                onChange={handleOnChange}
              >
                <option value="">Nhà phân phối</option>
                <option value="FragranceX">FragranceX</option>
                <option value="Ulta Beauty">Ulta Beauty</option>
                <option value="FragranceNet">FragranceNet</option>
                <option value="Perfumania">Perfumania</option>
                <option value="Nordstrom">Nordstrom</option>
                <option value="Macy's">Macy's</option>
                <option value="Douglas">Douglas</option>
                <option value="The Perfume Shop">The Perfume Shop</option>
                <option value="Scentbird">Scentbird</option>
                <option value="Sephora">Sephora</option>
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-city"
              type="number"
              name="price"
              placeholder="Giá"
              onChange={handleOnChange}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-zip"
              type="number"
              name="quantity"
              placeholder="Số lượng"
              onChange={handleOnChange}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="gender"
                onChange={handleOnChange}
              >
                <option value="">Giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="1"
              name="images.url1"
              placeholder="Link ảnh 1"
              onChange={handleOnChange}
            />
          </div>
          <div className="md:w-1/3 px-3">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="2"
              name="images.url2"
              placeholder="Link ảnh 2"
              onChange={handleOnChange}
            />
          </div>
          <div className="md:w-1/3 px-3">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="3"
              name="images.url3"
              placeholder="Link ảnh 3"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
  //   ko co butoton
};

export default AddProductForm;
