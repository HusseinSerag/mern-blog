import mongoose from "mongoose";
import { Query } from "./generalZodSchemas";

export class API<T> {
  query: mongoose.Query<
    (mongoose.Document<unknown, {}, T> &
      T & {
        _id: mongoose.Types.ObjectId;
      })[],
    mongoose.Document<unknown, {}, T> &
      T & {
        _id: mongoose.Types.ObjectId;
      },
    {},
    T
  >;

  constructor(
    query: mongoose.Query<
      (mongoose.Document<unknown, {}, T> &
        T & {
          _id: mongoose.Types.ObjectId;
        })[],
      mongoose.Document<unknown, {}, T> &
        T & {
          _id: mongoose.Types.ObjectId;
        },
      {},
      T
    >
  ) {
    this.query = query;
  }
  filter(filters: mongoose.FilterQuery<T>) {
    this.query.find(filters);
    return this;
  }
  sort(sort: string | undefined) {
    const sortBy = sort || "-createdAt";
    this.query.sort(sortBy);
    return this;
  }
  async limit(page: number | undefined, limit: number | undefined) {
    const numberOfPages = page || 0;
    const limitItems = limit || 10;

    const numberOfSkippedItems = numberOfPages * limitItems;
    const cloneQuery = await this.query.clone();
    this.query.skip(numberOfSkippedItems).limit(limitItems);

    return { this: this, totalLength: cloneQuery.length };
  }
}
