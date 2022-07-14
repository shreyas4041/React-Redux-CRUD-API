import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../add-contact/contact.css";

function AddPosts({ post, addPost }) {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(parseInt(params.id));
  const onTitleChanged = (e) => setTitle(e.target.value);

  const onSavePostClicked = (id) => {
    console.log("post post--->>>", post);
    const data = {
      userId: parseInt(userId),
      id: Math.floor(Math.random() * (10000 - 0 + 1)) + 0,
      // id: new Date().getTime(),
      title,
      // id: post.length > 0 ? post[post.length - 1].id + 1 : 0,
    };
    console.log("post data--->>>", data);
    addPost(data);
    setUserId(userId);
    setTitle("");
    navigate(`/userpost/${params.id}`);
    console.log("userPost data.id--->>", params.id);
  };
  // useEffect(() => {
  //   setUserId(userId);
  // }, [userId]);
  return (
    <>
      <div>
        <h1>UsersPost</h1>
      </div>
      <div className="container">
        <section>
          <h2>Add a New Post</h2>
          <form>
            <label htmlFor="postTitle">
              <strong>Post Title:</strong>
            </label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              placeholder="What's on your mind?"
              value={title}
              onChange={onTitleChanged}
            />
          </form>
          <Button type="button" onClick={onSavePostClicked}>
            Save Post
          </Button>
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log("add state---->>>>", state);
  return {
    post: state.post.allPosts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPost: (data) => {
    dispatch({ type: "ADD_POST", payload: data });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPosts);
