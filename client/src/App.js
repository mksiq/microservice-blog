import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container">
      <br />
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Post List</h1>
      <PostList />
      <div>Blog App</div>
    </div>
  );
};

export default App;
