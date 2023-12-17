import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../../../../../Interface";

const EditProductForm = (props: any) => {
  const data = useSelector(
    (state: any) => state?.productReducer?.productDetail
  );
  const [url1, setUrl1] = useState<string>(data.images?.url1);
  const [url2, setUrl2] = useState<string>(data.images?.url2);
  const [url3, setUrl3] = useState<string>(data.images?.url3);
  const [name, setName] = useState<string>(data.name);
  const [brand, setBrand] = useState<string>(data.brand);
  const [gender, setGender] = useState<string>(data.gender);
  const [provider, setProvider] = useState<string>(data.provider);
  const [quantity, setQuantity] = useState<string>(data.quantity);
  const [price, setPrice] = useState<string>(data.price);
  const [origin, setOrigin] = useState<string>(data.origin);
  const [description, setDescription] = useState<string>(data.description);
  const newProduct = {
    id: data.id,
    brand: brand,
    name: name,
    gender: gender,
    images: {
      url1: url1,
      url2: url2,
      url3: url3,
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
    ],
    provider: provider,
    quantity: quantity,
    price: price,
    origin: origin,
    discount: 3,
    comments: [],
    rating: 0,
    isDealFragrant: true,
    isMini: true,
    isNew: false,
    isBestSeller: false,
    description: description,
  };
  useEffect(() => {
    setUrl1(data.images?.url1);
    setUrl2(data.images?.url2);
    setUrl3(data.images?.url3);
    setName(data.name);
    setBrand(data.brand);
    setPrice(data.price);
    setOrigin(data.origin);
    setGender(data.gender);
    setQuantity(data.quantity);
    setProvider(data.provider);
    setDescription(data.description);
    toConfirm();
  }, [data]);
  //  khi data thay đổi thì mới truyền ko thì re-render mãi
  const toConfirm = () => {
    props.buttonCofirm(newProduct);
  };
  useEffect(() => {
    toConfirm();
  }, [
    name,
    brand,
    price,
    origin,
    gender,
    quantity,
    provider,
    description,
    url2,
    url1,
    url3,
  ]); // khi value thay đổi thì mới truyền ko thì re-render mãi
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
              value={name}
              placeholder="Tên sản phẩm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
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
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <select
                name="provider"
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
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
              value={price}
              placeholder="Giá"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-zip"
              type="number"
              name="quantity"
              value={quantity}
              placeholder="Số lượng"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
              value={url1}
              placeholder="Link ảnh 1"
              onChange={(e) => setUrl1(e.target.value)}
            />
          </div>
          <div className="md:w-1/3 px-3">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="2"
              value={url2}
              name="images.url2"
              placeholder="Link ảnh 2"
              onChange={(e) => setUrl2(e.target.value)}
            />
          </div>
          <div className="md:w-1/3 px-3">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="3"
              name="images.url3"
              placeholder="Link ảnh 3"
              value={url3}
              onChange={(e) => setUrl3(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
  //   ko co butoton
};

export default EditProductForm;
