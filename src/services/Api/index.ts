import { IAPIOptions, IMethods, IRequestParams } from "./types";
import { IUser } from "@/types";

class Api {
  // constants
  private baseUrl = "fakestoreapi.com";

  public paths = {
    users: "users",
  };

  private methods: IMethods = {
    delete: "DELETE",
    get: "GET",
    put: "PUT",
    post: "POST",
    patch: "PATCH",
  };

  // requests

  public getUsers = async (sort?: string, params?: IRequestParams) => {
    const { methods, request, paths } = this;

    return request({
      method: methods.get,
      path: paths.users,
      params,
      query: `?sort=${sort}`,
    });
  };

  public addUser = async (body: IUser, params?: IRequestParams) => {
    const { methods, request, paths } = this;

    return request({
      method: methods.post,
      path: paths.users,
      body: { ...body },
      params,
    });
  };

  public updateUser = async (body: IUser, params?: IRequestParams) => {
    const { methods, request, paths } = this;

    return request({
      method: methods.patch,
      path: paths.users,
      body: { ...body },
      params,
    });
  };

  public deleteUser = async (id: number, params?: IRequestParams) => {
    const { methods, request, paths } = this;

    return request({
      method: methods.delete,
      path: paths.users,
      params: {
        pathId: `${id}`,
        ...params,
      },
    });
  };

  private request = async (options: IAPIOptions) => {
    const { method, params, query, path, body } = options;
    const { url, pathId, handler } = params || {};

    try {
      const res = await fetch(
        url ||
          `https://${this.baseUrl}/${path}${pathId ? `/${pathId}` : ""}${query || ""}`,
        {
          method,
          headers: {
            Accept: "application/json",
          },
          credentials: "same-origin",
          ...(body && { body: JSON.stringify(body) }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Error: Something went wrong. Please try again later.");
        handler && handler();
        return;
      }

      return data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.debug(err);

      alert("Error: Something went wrong. Please try again later.");
      handler && handler();
    }
  };
}

export default new Api();

// export * from './api-utils';
export * from "./types";
