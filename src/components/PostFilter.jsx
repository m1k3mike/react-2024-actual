import React from "react";
import MyInput from "./UI/MyInput/MyInput";
import MySelect from "./UI/MySelect/MySelect";
const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        type="text"
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue={"Сортировка"}
        option={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" },
        ]}
      />
    </div>
  );
};

export default PostFilter;
