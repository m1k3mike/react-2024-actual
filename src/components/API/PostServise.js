import axios from "axios";

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      { params: { _limit: limit, _page: page } }
    );

    return response;
  }

  static async getById(id) {
    // Перемещено внутрь класса
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/" + id // Добавлен слэш перед id
    );
    return response;
  }
  static async getCommentById(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return response;
  }
}
