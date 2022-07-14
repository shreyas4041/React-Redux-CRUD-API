import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../add-contact/contact.css";

const EditPosts = ({ post, updatePost, allPosts, getId }) => {
  const params = useParams();
  console.log("paramsId------->>>>>>>>", params);
  const navigate = useNavigate();
  console.log("Posts==>>", post);

  const currentData = allPosts.find((item) => {
    return item.id === parseInt(params.id);
  });
  
  console.log("type of params-->>", typeof params);
  console.log("currentData===>>", currentData);
  useEffect(() => {
    if (params.id) {
      setTitle(currentData.title);
      getId(parseInt(params.id));
    }
  }, [currentData, params.id, allPosts]);

  const [title, setTitle] = useState("");
  const onTitleChanged = (e) => setTitle(e.target.value);

  const onSavePostClicked = (e) => {
    e.preventDefault();
    const data = {
      userId: currentData.userId,
      id: currentData.id,
      title,
    };
    console.log("new data--->>", data.id);
    if (params.id) {
      updatePost(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your data has been updated",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    navigate(`/userpost/${data.userId}`);
  };
  return (
    <>
      {currentData ? (
        <>
          <div>UsersPost</div>
          <div className="container">
            <section>
              <h2>Edit Post</h2>
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
      ) : (
        <h1 className="text-center">No Contact Found</h1>
      )}
      {/* </div> */}
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("add state---->>>>", state);
  return {
    post: state.post.userPosts,
    allPosts: state.post.allPosts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (data) => {
      dispatch({ type: "UPDATE_POST", payload: data });
    },
    getId: (id) => {
      dispatch({ type: "GET_ID", payload: id });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPosts);
