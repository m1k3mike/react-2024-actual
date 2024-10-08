import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../components/API/PostServise";
import Loader from "../components/UI/Loader/Loader";
const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchPostComment, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentById(id);
    setComment(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchPostComment(params.id);
  }, []);
  return (
    <div>
      <h1>Вы открыли страницу поста c ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}.{post.title}
        </div>
      )}
      <h1>Комментарии</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comment.map((comm) => (
            <div key={comm.id} style={{ marginTop: "15px" }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
