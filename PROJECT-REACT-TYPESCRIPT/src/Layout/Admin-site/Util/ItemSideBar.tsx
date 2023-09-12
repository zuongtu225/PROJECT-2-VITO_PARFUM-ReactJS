import {
  PiCubeBold,
  PiScrollBold,
  PiStackBold,
  PiStackOverflowLogoBold,
  PiShootingStarBold,
  PiSlideshowBold,
  PiSignatureBold,
  PiWalletBold,
} from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";

// interface IMenuItem {
//   id: number;
//   title: string;
//   path: string;
//   icon?: string;
// }
export const MenuItem = [
  {
    id: 1,
    path: "/admin/product",
    title: "Sản phẩm",
    icon: <PiCubeBold />,
  },
  { id: 2, path: "/admin/user", title: "Người dùng", icon: <FiUsers /> },
  { id: 3, path: "/admin/order", title: "Đơn hàng", icon: <PiScrollBold /> },
  { id: 4, path: "/admin/category", title: "Loại", icon: <PiStackBold /> },
  {
    id: 5,
    path: "/admin/provider",
    title: "Nhà phân phối",
    icon: <PiStackOverflowLogoBold />,
  },
  {
    id: 6,
    path: "/admin/origin",
    title: "Xuất xứ",
    icon: <PiStackOverflowLogoBold />,
  },
  {
    id: 7,
    path: "/admin/brand",
    title: "Thương Hiệu",
    icon: <PiSignatureBold />,
  },
  {
    id: 8,
    path: "/admin/voucher",
    title: "Voucher",
    icon: <PiShootingStarBold />,
  },
  { id: 9, path: "/admin/blog", title: "Blogs", icon: <PiSlideshowBold /> },
  { id: 10, path: "/admin/payment", title: "Payments", icon: <PiWalletBold /> },
  {
    id: 11,
    path: "/login",
    title: "Đăng Xuất",
    icon: <SlLogout />,
  },
];
