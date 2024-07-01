import User from "../models/user.model";
import { GetUsers } from "../schemas/user.schema";
import { API } from "../utils/apiServices";
import { CustomError } from "../utils/CustomError";

export async function getUser(id: string) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError("User doesn't exist", 404);
    }
    return user;
  } catch (e) {
    throw e;
  }
}

export async function getUsers(query: GetUsers["query"]) {
  try {
    const { limit, page, sort, fields, ...rest } = query;

    const api = new API(User.find().select("-password"));

    api
      .filter({
        ...rest,
      })
      .sort(sort);
    const { totalLength } = await api.limit(page, limit);
    const users = await api.query;

    return {
      totalCount: totalLength,
      users: users,
    };
  } catch (e) {
    throw e;
  }
}
