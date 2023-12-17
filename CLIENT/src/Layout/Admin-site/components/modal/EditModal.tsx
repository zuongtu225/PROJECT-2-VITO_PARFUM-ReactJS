import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import EditProductForm from "./FormEdit/EditProductForm";
import axios from "axios";
import { IProduct } from "../../../../Interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiProducts } from "../../../../store/action";
export function EditModal(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(props.open);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  const ClickClose = () => {
    props.handleClose(false);
  };

  const [productUpdate, setProductUpdate] = useState<IProduct>();
  const handleUpdate = async () => {
    switch (props.title) {
      case "PRODUCTS":
        const data = await axios.put(
          `http://localhost:5000/products/${productUpdate?.id}`,
          productUpdate
        );
        if (data.status === 200) {
          alert("succeed");
          dispatch(getApiProducts());
          props.handleClose(false);
        } else {
          alert("failed");
        }
        break;
      //     // case "PROVIDERS":
      //     //   axios.post("http://localhost:5000/providers", provider);
      //     //   break;
      //     // case "BRANDS":
      //     //   axios.post("http://localhost:5000/brands", brand);
      //     //   break;
      //     // case "PAYMENT":
      //     //   axios.post("http://localhost:5000/payments", payment);
      //     //   break;
      //     // case "VOUCHERS":
      //     //   axios.post("http://localhost:5000/vouchers", voucher);
      //     //   break;
      //     // case "ORIGINS":
      //     //   axios.post("http://localhost:5000/origins", origin);
      //     //   break;
      //     // case "CATEGORIES":
      //     //   axios.post("http://localhost:5000/category", category);
      //     //   break;
      //     // case "BLOGS":
      //     //   axios.post("http://localhost:5000/blogs", blog);
    }
  };
  const buttonCofirm = (ii: any) => {
    // nhận New product Update
    setProductUpdate(ii);
  };
  return (
    <div>
      <Dialog open={open} handler={ClickClose}>
        <DialogHeader> Form Sửa </DialogHeader>
        <DialogBody divider>
          {props.title === "PRODUCTS" && (
            <div>
              <EditProductForm buttonCofirm={buttonCofirm} />
            </div>
          )}
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

          <Button color="green" onClick={handleUpdate}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
