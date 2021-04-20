import { useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        });
    } catch(e) {
        console.log(postId)
        console.log(e)
    }
    setContent("");
    console.log(postId)
    console.log("tried to submit")
    console.log(content)
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn brn-primary">Submit</button>
      </form>
    </div>
  );
}
