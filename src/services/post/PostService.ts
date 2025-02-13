import { api } from "../api";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (e) {
    throw new Error("Không thể lấy dữ liệu");
  }
};

export const getPostById = async (id: number) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu bài viết");
  }
};

export const deletePosts = async (id: any) => {
  try {
    await api.delete(`/posts/${id}`);
    return true;
  } catch (e) {
    throw new Error("Xoá dữ liệu thất bại");
  }
};

export const putPosts = async (id: any, data: any) => {
  try {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Sửa  dữ liệu thất bại");
  }
};

export const createPosts = async (data: any) => {
  try {
    const response = await api.post("/posts", data);
    return response.data;
  } catch (error) {
    throw new Error("Thêm dữ liệu thất bại");
  }
};
