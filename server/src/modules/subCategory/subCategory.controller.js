import { SubCategory } from "../../../database/models/subCategory.model.js";
import { getDoc } from "../../handlers/getDocHandler.js";
import { addDoc } from "../../handlers/addDocHandler.js";
import { getAllDocs } from "../../handlers/getAllDocsHandler.js";
import { updateDoc } from "../../handlers/updateDocHandler.js";
import { deleteDoc } from "../../handlers/deleteDocHandler.js";

const addSubCategory = addDoc(SubCategory);

const getAllSubCategories = getAllDocs(SubCategory);

const getSubCategory = getDoc(SubCategory);

const updateSubCategory = updateDoc(SubCategory);

const deleteSubCategory = deleteDoc(SubCategory);

export {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
