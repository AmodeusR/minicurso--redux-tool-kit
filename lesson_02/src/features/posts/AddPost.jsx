import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost, addPost } from "./postsSlice";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [isPostRequestActive, setIsPostRequestActive] = useState(false);

  const canSave = [title, body, userId, !isPostRequestActive].every(Boolean);

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (title.length === 0) {
      alert("The post needs a title");
      return;
    }
    if (body.length === 0) {
      alert("The post needs body");
      return;
    }
    
    try {
      setIsPostRequestActive(true);
      await dispatch(addNewPost({ title, body, userId }));
      

      setTitle("");
      setBody("");
    } catch (error) {
      alert("Oops, something went wrong!");
    } finally {
      setIsPostRequestActive(false);
    }

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
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
