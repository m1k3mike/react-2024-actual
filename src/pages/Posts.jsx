import React, { useEffect, useRef, useState } from "react";
import "../styles/App.css";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import PostServise from "../components/API/PostServise";
import { getPageCount } from "../components/utils/pages";
import MyButton from "../components/UI/MyButton/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  const observer = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      try {
        const response = await PostServise.getAll(limit, page);
        setPosts((prevPosts) => [...prevPosts, ...response.data]); // Добавляем новые посты к существующим
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPageCount(totalCount, limit)); // Устанавливаем общее количество страниц
      } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
      }
    }
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect(); // Отключаем предыдущий наблюдатель

    const callback = (entries) => {
      if (entries[0].isIntersecting && !isPostLoading) {
        // Если элемент видим и не происходит загрузка
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    if (lastElement.current) {
      observer.current.observe(lastElement.current); // Наблюдаем за последним элементом
    }

    return () => {
      if (observer.current) observer.current.disconnect(); // Очистка при размонтировании
    };
  }, [lastElement, isPostLoading]); // Добавлено isPostLoading как зависимость

  const createPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => {
          setModal(true);
        }}
      >
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Посты про JS"}
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Posts;
