import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUsers } from "../users/usersSlice";
import {
  fetchPosts,
  selectAllPosts,
  selectIsLoading,
  selectPostsFetchError,
} from "./postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const isPostsLoading = useSelector(selectIsLoading);
  const postsFetchError = useSelector(selectPostsFetchError);
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const getPostCreator = (postUserId) => {
    const creator = users.find((user) => user.id === postUserId);

    return creator?.username || "Unknown author";
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <section>
        <h2>Posts</h2>
        {isPostsLoading && <p>Loading...</p>}
        {!postsFetchError ? (
          posts
            .map((post) => (
              <article key={post.id}>
                <h3>{post.title}</h3>
                <p className="post-content">{post.body.substring(0, 100)}</p>
                <span className="post-credits">
                  {getPostCreator(post.userId)}
                </span>
              </article>
            ))
            .reverse()
        ) : (
          <p className="error-message">{postsFetchError}</p>
        )}
      </section>
    </div>
  );
};

export default PostsList;
