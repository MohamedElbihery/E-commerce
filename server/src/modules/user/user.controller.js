import { getDoc } from "../../handlers/getDocHandler.js";
import { addDoc } from "../../handlers/addDocHandler.js";
import { getAllDocs } from "../../handlers/getAllDocsHandler.js";
import { updateDoc } from "../../handlers/updateDocHandler.js";
import { deleteDoc } from "../../handlers/deleteDocHandler.js";
import { User } from "../../../database/models/user.model.js";

const addUser = addDoc(User);

const getAllUsers = getAllDocs(User);

const getUser = getDoc(User);

const updateUser = updateDoc(User);

const deleteUser = deleteDoc(User);

export { addUser, getAllUsers, getUser, updateUser, deleteUser };
