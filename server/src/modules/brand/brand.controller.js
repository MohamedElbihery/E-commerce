import { Brand } from "../../../database/models/brand.model.js";
import { getDoc } from "../../handlers/getDocHandler.js";
import { addDoc } from "../../handlers/addDocHandler.js";
import { getAllDocs } from "../../handlers/getAllDocsHandler.js";
import { updateDoc } from "../../handlers/updateDocHandler.js";
import { deleteDoc } from "../../handlers/deleteDocHandler.js";

const addBrand = addDoc(Brand);

const getAllBrands = getAllDocs(Brand);

const getBrand = getDoc(Brand);

const updateBrand = updateDoc(Brand);

const deleteBrand = deleteDoc(Brand);

export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand };
