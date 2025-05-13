import { getDoc } from "../../handlers/getDocHandler.js";
import { addDoc } from "../../handlers/addDocHandler.js";
import { getAllDocs } from "../../handlers/getAllDocsHandler.js";
import { updateDoc } from "../../handlers/updateDocHandler.js";
import { deleteDoc } from "../../handlers/deleteDocHandler.js";
import { Coupon } from "../../../database/models/coupon.model.js";

const addCoupon = addDoc(Coupon);

const getAllCoupons = getAllDocs(Coupon);

const getCoupon = getDoc(Coupon);

const updateCoupon = updateDoc(Coupon);

const deleteCoupon = deleteDoc(Coupon);

export {
  addCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
