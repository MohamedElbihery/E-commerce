import { Product } from "../../../database/models/product.model.js";
import { getDoc } from "../../handlers/getDocHandler.js";
import { addDoc } from "../../handlers/addDocHandler.js";
import { getAllDocs } from "../../handlers/getAllDocsHandler.js";
import { updateDoc } from "../../handlers/updateDocHandler.js";
import { deleteDoc } from "../../handlers/deleteDocHandler.js";

const addProduct = addDoc(Product);

const getAllProducts = getAllDocs(Product);

const getProduct = getDoc(Product);

const updateProduct = updateDoc(Product);

const deleteProduct = deleteDoc(Product, ["imageCover", "images"]);

export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
