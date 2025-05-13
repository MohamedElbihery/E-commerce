import {
  deleteUserAddresse,
  getUserAddresse,
  addUserAddresse,
} from "./adress.controller.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { Router } from "express";

const adresseRouter = Router({ mergeParams: true });

adresseRouter.use(protectedRoutes, allowedTo("user"));

adresseRouter.route("/").patch(addUserAddresse).get(getUserAddresse);

adresseRouter.route("/:id").delete(deleteUserAddresse);

export default adresseRouter;
