import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import ProductFormAdd from "./FormAdd/AddProductForm";

// b4 Hiện HỘP MODAL lên rồi [ Hiện lên tùy theo title props từ các Pages ]
// HỘP MODAL BAO GỒM NÚT ADD CHUNG VÀ CÁC FORM RIÊNG
export function AddModal(props: any) {
  // props bây giờ gồm: title, open, handleClose
  const [product, setProduct] = useState<any>();
  const [provider, setProvider] = useState<any>();
  const [brand, setBrand] = useState<any>();
  const [origin, setOrigin] = useState<any>();
  const [voucher, setVoucher] = useState<any>();
  const [blog, setBlog] = useState<any>();
  const [payment, setPayment] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [open, setOpen] = useState(props.open);
  // b5 Tạo biến open mới gán giá trị open cũ

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  // b6 Dùng useEffect để lun cập nhật open mới

  const ClickClose = () => {
    props.handleClose(false);
  };
  // b7 Khi nhấn close thì truyền vào và set lại open ở Header là false [tắt]

  const handleData = (data: any) => {
    setProduct(data);
  };
  const handleAdd = async () => {
    switch (props.title) {
      case "PRODUCTS":
        const data = await axios.post(
          "http://localhost:5000/products",
          product
        );
        if (data.status === 201) {
          alert("suces");
          props.handleClose(false);
        }
        break;
      case "PROVIDERS":
        axios.post("http://localhost:5000/providers", provider);
        break;
      case "BRANDS":
        axios.post("http://localhost:5000/brands", brand);
        break;
      case "PAYMENT":
        axios.post("http://localhost:5000/payments", payment);
        break;
      case "VOUCHERS":
        axios.post("http://localhost:5000/vouchers", voucher);
        break;
      case "ORIGINS":
        axios.post("http://localhost:5000/origins", origin);
        break;
      case "CATEGORIES":
        axios.post("http://localhost:5000/category", category);
        break;
      case "BLOGS":
        axios.post("http://localhost:5000/blogs", blog);
    }
  };

  return (
    // Form  chung
    // Submit chung
    <div className="formAdd">
      <Dialog open={open} handler={ClickClose}>
        {/* open={open} handler={dlerClose} là một phần của thư viện @material-tailwind/react.
         => true khi bạn muốn hiển thị hộp thoại và false khi bạn muốn ẩn nó.
        => Khi click thuộc tính handler sẽ nhận được 1 HÀM ClickClose để xử lý sự kiện đóng hộp 
        */}
        <DialogHeader> Form Thêm </DialogHeader>
        {/* b8: <DialogBody> để chứa các FORM của hộp thoại modal theo title  */}
        <DialogBody divider>
          {/* toán tử && nếu ĐIỀU KIỆN ĐÚNG thì Thực Thi Khối Mã, nếu sai thì không thực thi */}
          {props.title === "PRODUCTS" && (
            <div>
              <ProductFormAdd product={product} handleData={handleData} />
            </div>
          )}
          {props.title === "brand" && <div>brand</div>}
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

          <Button color="green" onClick={handleAdd}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
