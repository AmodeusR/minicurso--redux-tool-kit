import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { selectAllPosts } from "./postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);

  const getPostCreator = (postUserId) => {
    const creator = users.find(user => user.id === postUserId);

    console.log(postUserId);
    return creator?.username || "Unknown author";
  }
  return (
    <div>
      <section>
        <h2>Posts</h2>
        {posts.map(post => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">
              {post.content.substring(0, 100)}
            </p>
            <span className="post-credits">{getPostCreator(post.userId)}</span>
          </article>
        )).reverse()}
      </section>
    </div>
  );
};

export default PostsList;
