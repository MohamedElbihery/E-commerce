import { Category } from "../../../database/models/category.model.js";
import { getDoc } from "../../handlers/getDocHandler.js";
import { addDoc } from "../../handlers/addDocHandler.js";
import { getAllDocs } from "../../handlers/getAllDocsHandler.js";
import { updateDoc } from "../../handlers/updateDocHandler.js";
import { deleteDoc } from "../../handlers/deleteDocHandler.js";

const addCategory = addDoc(Category);

const getAllCategories = getAllDocs(Category);

const getCategory = getDoc(Category);

const updateCategory = updateDoc(Category);

const deleteCategory = deleteDoc(Category);

export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
