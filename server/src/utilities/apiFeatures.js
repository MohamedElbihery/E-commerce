export class ApiFeatures {
  constructor(mongooseQuery, filterQuery) {
    this.mongooseQuery = mongooseQuery;
    this.filterQuery = filterQuery;
  }

  pagination() {
    let pageNumber = parseInt(this.filterQuery.page, 10) || 1; // 10 is the number system (decimal)
    if (pageNumber < 1) pageNumber = 1;
    const limit = parseInt(this.filterQuery.limit, 10) || 10; // Default limit to 10 if not provided
    let skip = (parseInt(pageNumber) - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }

  filter() {
    // taking a deepCopy from the query
    let filterObj = structuredClone(this.filterQuery);

    // Exclude unwanted fields
    let excludedFields = ["page", "limit", "sort", "fields", "search"];
    excludedFields.forEach((val) => delete filterObj[val]);

    // Add $ to operators like gt, gte, lt, lte
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterObj);

    this.mongooseQuery = this.mongooseQuery.find(filterObj);

    return this;
  }

  sort() {
    if (this.filterQuery.sort) {
      const sortedBy = this.filterQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }

  selectedFields() {
    if (this.filterQuery.fields) {
      const selectedFields = this.filterQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(selectedFields);
    }
    return this;
  }

  search() {
    if (this.filterQuery.search) {
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: this.filterQuery.search, $options: "i" } },
          { description: { $regex: this.filterQuery.search, $option: "i" } },
        ],
      });
    }
    return this;
  }
}
