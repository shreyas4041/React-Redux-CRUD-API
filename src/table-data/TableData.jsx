import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const TableData = ({ contacts, deleteContact }) => {
  const navigate = useNavigate();
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
        deleteContact(id);
        toast.success("user deleted successfully!!");
      },
    });
  };
  const handleEdit = (id) => {
    console.log("edit Item");
    navigate(`/edit/${id}`);
  };
  const handleShow = () => {
    navigate("/add");
    // setShow(true);
  };
  return (
    <>
      &nbsp;
      <div>
        <Button onClick={handleShow}>Add Users</Button>
      </div>
      &nbsp;
      {/* <input style={{marginLeft:800}} onChange={(e) => (e.target.value)}></input> */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((item, i) => (
              <tr key={i}>
                <td>{item.id + 1}</td>
                <td
                  onClick={(e) => {
                    navigate(`/userpost/${item.id}`);
                  }}
                >
                  {item.name}
                </td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.status}</td>
                <td>
                  <Button onClick={(e) => handleEdit(`${item.id}`)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <div>
                    <Button onClick={(e) => handleDelete(item.id)}>
                      {/* <Button onClick={() => deleteContact(item.id)}> */}{" "}
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <th>No contacts found</th>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("---->>>", state);
  return {
    contacts: state.contact,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TableData);
