import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "./appError.js";

const fileUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload;
};

const uploadSingleFile = (fieldName, folderName) => {
  return fileUploader(folderName).single(fieldName);
};

const uploaMultipleFile = (arrayOfFields, folderName) => {
  return fileUploader(folderName).fields(arrayOfFields);
};

export { uploaMultipleFile, uploadSingleFile };
