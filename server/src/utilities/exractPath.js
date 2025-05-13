import pluralize from "pluralize";

export const extractPath = (filePath, model) => {
  if (!filePath) return null;

  const folderName = pluralize(model.modelName).toLowerCase();
  const filename = filePath.split("/").pop();

  return `uploads/${folderName}/${filename}`;
};
