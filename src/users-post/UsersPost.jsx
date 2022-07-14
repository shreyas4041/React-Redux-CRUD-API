import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../add-contact/contact.css";

function UsersPost({ post, deletePost, getId, allPosts }) {
  const params = useParams();
  console.log("get id ---->>>", post);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(parseInt(params.id));
  console.log("userId--->>", userId);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: () => {
        console.log("delete Item");
        deletePost(id);
      },
    });
  };

  const handleAddPost = (id) => {
    setUserId(params.id);
    navigate(`/addPosts/${params.id}`);
  };
  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };
  console.log("Post--->>>", post);

  useEffect(() => {
    if (params.id) {
      getId(parseInt(params.id));
      setUserId(params.id);
    }
  }, [params.id, allPosts]);

  console.log("post.length---->>>", post.length);
  return (
    <>
      <h1>User Post</h1>
      <div>
        <Button type="button" onClick={handleAddPost}>
          Add Post
        </Button>
      </div>
      &nbsp;
      {console.log("post length--->>>>", post.length)}
      {post.length > 0 ? (
        post.map((item, i) => {
          return (
            // item.userId === userId && (
            <Card
              text={"light" ? "dark" : "white"}
              style={{ width: "18rem" }}
              className="mb-2"
              key={i}
            >
              <Card.Header>{item.title}</Card.Header>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <hr></hr>
                <Button
                  type="button"
                  variant="danger"
                  onClick={(id) => handleDelete(item.id)}
                >
                  Delete Post
                </Button>
                &nbsp;
                <Button type="button" onClick={() => handleEdit(item.id)}>
                  Edit Post
                </Button>
              </Card.Body>
            </Card>
            // )
          );
        })
      ) : (
        <div>
          <h3>No Post Found</h3>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  console.log("---->>>", state);
  return {
    post: state.post.userPosts,
    allPosts: state.post.allPosts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deletePost: (id) => {
    dispatch({ type: "DELETE_POST", payload: id });
  },
  getId: (id) => {
    dispatch({ type: "GET_ID", payload: id });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersPost);
