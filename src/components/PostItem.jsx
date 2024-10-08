import React from "react";
import MyButton from "./UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const router = useNavigate();
  return (
    <div className="post">
      <div className="post_content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post_btns">
        <MyButton onClick={() => router(`/posts/${props.post.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => props.remove(props.post)}>
          Удалить пост
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
