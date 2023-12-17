import { AppDispatch } from "../store";

export type ProductType = {
  state?: any;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
  token?: string;
};
// interface IImages {
//   id: number;
//   url: string;
// }

interface IComments {
  id: number;
  comment: string;
  idUser: string;
  nameUser: string;
}
interface IType {
  id: number;
  name: string;
  price: number;
}
export interface IProduct {
  id: number;
  brand: string;
  name: string;
  gender: string;
  images: {
    url1: string;
    url2: string;
    url3: string;
  };
  type: IType[];
  provider: string;
  quantity: number;
  comments: IComments[];
  price: number;
  origin: string;
  discount: number;
  rating: number;
  isDealFragrant: boolean;
  isMini: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  description: string;
}
export interface IStateProduct {
  products: IProduct[];
}
export interface ICartProduct {
  oderQty: number;
  idUser: number;
  idClick: number;
  id: number;
  brand: string;
  name: string;
  gender: string;
  images: {
    url1: string;
    url2: string;
    url3: string;
  };
  type: IType[];
  provider: string;
  quantity: number;
  comments: IComments[];
  price: number;
  origin: string;
  discount: number;
  rating: number;
  isDealFragrant: boolean;
  isMini: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  description: string;
}
export interface IVisa {
  id: number;
  code: string; // Mã bảo mật CVV/CVC của thẻ Visa
  name: string;
  cvc: number;
  cardNumber: Number; // Số thẻ Visa (phải được mã hóa)
  issuer: string; // Ngân hàng phát hành thẻ Visa
  isActive: boolean; // Trạng thái hoạt động của thẻ (true hoặc false)
}
export interface IUser {
  id: number;
  email: string;
  password: string;
  avatar: string;
  cart: ICartProduct[];
  cardVisa: IVisa[];
  role: string;
  status: boolean;
  phone: string;
}
export interface IUserState {
  users: IUser[];
  userDetail: IUser;
}
export interface IBank {
  id: number;
  name: string;
  code: string;
  type: string;
  exp: string; // tháng năm hết hạn
  cvc: number;
  wallet: number;
}
export interface IOder {
  id: number;
  name: string;
  userId: number;
  address: string;
  phone: string;
  cartOrders: IProduct[];
  date: Date;
  codeOrder: number;
  status: string;
}
