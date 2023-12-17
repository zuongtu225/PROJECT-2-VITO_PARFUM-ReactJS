import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/layout/Header";
import AdminPagination from "../../components/table/AdminPagination";
import { getHistoryOrders, getOrderApi } from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { updateHistoryOrders } from "../../../../Api/historyOders";
import { ToastContainer, toast } from "react-toastify";
import { deleteOrder, updateOrderApi } from "../../../../Api/order";

const OrderManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderApi = useSelector((state: any) => state?.orderReducer?.orders);
  useEffect(() => {
    dispatch(getHistoryOrders());
    dispatch(getOrderApi()); //  phải dispatch [gửi payload tới store]
  }, []);

  const [statusOder, getStatusOrder] = useState<string>("Pending");
  const updateOrder = async (id: number) => {
    const orderNeedChange = orderApi?.find((item: any) => item.id === id);
    switch (statusOder) {
      case "Pending":
        console.log("pending");
        break;
      case "Processing":
        const updateProcess = {
          ...orderNeedChange,
          status: "Processing",
        };
        const resProcessing: any = await updateOrderApi(updateProcess);
        if (resProcessing.status === 200) {
          toast.success("Đơn hàng đang chuẩn bị");
          dispatch(getHistoryOrders());
          dispatch(getOrderApi());
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      case "Cancel":
        const resCancel: any = await deleteOrder(orderNeedChange);
        if (resCancel.status === 200) {
          toast.success("Hủy đơn hàng thành công");
          dispatch(getHistoryOrders());
          dispatch(getOrderApi());
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      case "Shipping":
        const updateShip = {
          ...orderNeedChange,
          status: "Shipping",
        };
        const resShip: any = await updateOrderApi(updateShip);
        if (resShip.status === 200) {
          toast.success("Đơn hàng đang được giao");
          dispatch(getHistoryOrders());
          dispatch(getOrderApi());
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      case "Completed":
        const updateDone = {
          ...orderNeedChange,
          status: "Completed",
        };
        const resDone: any = await updateOrderApi(updateDone);
        const resCompleted: any = await updateHistoryOrders(orderNeedChange);
        if (resCompleted.status === 201) {
          toast.success("Đơn hàng đã hoành thành");
          setTimeout(() => {
            dispatch(getHistoryOrders());
            dispatch(getOrderApi());
          }, 1500);
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      default:
        toast.error("Vui lòng chọn lại trạng thái đơn hàng");
    }
  };
  return (
    <div>
      <AdminHeader title={"order"} />
      <ToastContainer />

      <div className="content orders">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã đơn hàng
                </th>
                <th scope="col" className="px-3 py-3">
                  Phương thức thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                  Địa chỉ giao
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày đặt hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày giao dự kiến
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {orderApi?.map((item: any) => {
                if (item.status !== "Cancel" && item.status !== "Completed") {
                  return (
                    <tr key={item.id} className="p-10">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.codeOrder}
                      </th>
                      <td className="px-6 py-4 "> {item.payment}</td>
                      <td className="px-6 py-4 "> {item.address}</td>
                      <td className="px-6 py-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(
                          new Date(item.date).getTime() + 259200000
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            getStatusOrder(e.target.value)
                          }
                          className="cursor-pointer"
                        >
                          <option value={item.status}>{item.status}</option>
                          <option value="Processing">Processing</option>
                          <option value="Cancel">Cancel</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 w-[150px]">
                        {item?.sum?.toLocaleString()} ₫
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => updateOrder(item.id)}
                          className="w-30 bg-green-500 text-red-100 px-5 py-2 font-semibol m-2"
                        >
                          Cập nhật
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          {/* phân trang */}
          <div className="p-4">
            <AdminPagination />
          </div>
          {/* phân trang */}
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
