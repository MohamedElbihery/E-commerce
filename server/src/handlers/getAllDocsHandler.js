import { handleAsyncError } from "../middlewares/errors/asyncError.js";
import { ApiFeatures } from "../utilities/apiFeatures.js";

export const getAllDocs = (model) => {
  return handleAsyncError(async (req, res, next) => {
    // for merge params
    let filter = {};
    if (req.params.name) filter.name = req.params.name; // name here is the merged param id

    let apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .pagination()
      .filter()
      .sort()
      .search()
      .selectedFields();

    const documents = await apiFeatures.mongooseQuery;

    res
      .status(200)
      .json({ message: "documents retrieved successfully", documents });
  });
};
