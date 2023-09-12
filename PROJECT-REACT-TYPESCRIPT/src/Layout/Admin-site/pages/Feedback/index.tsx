import React from "react";
import Tabs from "../../components/layout/Tabs";
import AdminPagination from "../../components/table/AdminPagination";
import AdminHeader from "../../components/layout/Header";

const FeedbackManager = () => {
  return (
    <div>
      <AdminHeader title={"FEEBACK"} />
      <div className="content brands">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
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
                <th scope="col" className="px-20 py-3">
                  ID
                </th>
                <th scope="col" className="px-20 py-3">
                  LOẠI
                </th>
                <th scope="col" className="px-5 py-3">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="p-10">
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
                  className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  0
                </th>

                <td className="px-20 py-3">100ml</td>
                <td className="px-5 py-3">
                  <button className="w-30 bg-green-500 text-red-100 px-5 py-2 font-semibol m-2">
                    Sửa
                  </button>
                  <button className="bg-red-600   text-red-200 px-5 py-2 font-semibol">
                    Xóa
                  </button>
                </td>
              </tr>
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

export default FeedbackManager;
