import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addPost } from "./postsSlice";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const handleSubmission = (e) => {
    e.preventDefault();

    if (title.length === 0) {
      alert("The post needs a title");
      return;
    }
    if (content.length === 0) {
      alert("The post needs content");
      return;
    }

    dispatch(addPost(title, content, Number(userId)));

    setTitle("");
    setContent("");
  };

  return (
    <section>
      <h2>Add a new Post</h2>
      <form onSubmit={handleSubmission}>
        <div className="input-group">
          <label htmlFor="postTitle">Title</label>
          <input
            type="text"
            id="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="postContent">Content</label>
          <textarea
            id="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="select-user"></label>
          <select id="select-user" value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="" disabled>
              Select user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!canSave}
          className={!canSave ? "is-disabled": undefined}
        >
          Add post
        </button>
      </form>
    </section>
  );
};

export default AddPost;
