import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { toast } from "react-toastify";
import "./contact.css";

const AddPost = ({ contacts, addContact }) => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  console.log("data-->", regForm);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegForm({ ...regForm, [name]: value });
    setDisable(
      regForm.name === "" &&  
        regForm.email === "" &&
        regForm.gender === "" || regForm.status === ""
    );
  };
  const [validation, setValidation] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  useEffect(() => {
    checkValidation();
  }, [regForm]);

  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));
    if (!regForm.name.trim()) {
      errors.name = "name is required";
    } else {
      errors.name = "";
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!regForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!regForm.email.match(emailRegex)) {
      errors.email = "Please ingress a valid email address";
    } else {
      errors.email = "";
    }
    if (!regForm.gender.trim()) {
      errors.gender = "Pleae select the gender";
    } else {
      errors.gender = "";
    }
    if (!regForm.status.trim()) {
      errors.status = "Pleae select the status";
    } else {
      errors.status = "";
    }
    setValidation(errors);
  };
  const handleSubmit = (id) => {
    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      name: regForm.name,
      email: regForm.email,
      gender: regForm.gender,
      status: regForm.status,
    };
    console.log("reg.Data-->", data);
    addContact(data);
    // toast.success("Data updated successfully!!");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your data has been added",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <Form>
          <>
            <label>
              <b>Users Name</b>
            </label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={regForm.name}
              onChange={(e) => handleChange(e)}
            />
            <span className="alert-danger" style={{ color: "red" }}>
              {validation.name && <p>{validation.name}</p>}
            </span>
            <label>
              <b>Email address</b>
            </label>
            <Form.Control
              id="userEmail"
              type="email"
              placeholder="Enter email"
              name="email"
              value={regForm.email}
              onChange={(e) => handleChange(e)}
            />
            <span style={{ color: "red" }}>
              {validation.email && <p>{validation.email}</p>}
            </span>
            <Form.Group>
              <label>
                <b>Gender:</b>
              </label>
              &nbsp; &nbsp; &nbsp;
              <label>
                <Form.Check
                  type="radio"
                  value="male"
                  checked={regForm.gender === "male"}
                  onChange={(e) =>
                    setRegForm({
                      ...regForm,
                      gender: e.target.value,
                      required: true,
                    })
                  }
                />
                Male
              </label>
              &nbsp; &nbsp;
              <label>
                <Form.Check
                  type="radio"
                  value="female"
                  checked={regForm.gender === "female"}
                  onChange={(e) =>
                    setRegForm({
                      ...regForm,
                      gender: e.target.value,
                      required: true,
                    })
                  }
                />
                Female
              </label>
              <span className="alert-danger" style={{ color: "red" }}>
                {validation.gender && <p>{validation.gender}</p>}
              </span>
            </Form.Group>
            <Form.Group inline="true">
              <label>
                <b>Status:</b>
              </label>
              &nbsp; &nbsp;
              <label>
                <Form.Check
                  type="radio"
                  value="active"
                  checked={regForm.status === "active"}
                  onChange={(e) =>
                    setRegForm({
                      ...regForm,
                      status: e.target.value,
                      required: true,
                    })
                  }
                />
                Active
              </label>
              &nbsp; &nbsp;
              <label>
                <Form.Check
                  type="radio"
                  value="inactive"
                  checked={regForm.status === "inactive"}
                  onChange={(e) =>
                    setRegForm({
                      ...regForm,
                      status: e.target.value,
                      required: true,
                    })
                  }
                />
                Inactive
              </label>
            </Form.Group>
            <span className="alert-danger" style={{ color: "red" }}>
              {validation.status && <p>{validation.status}</p>}
            </span>
            &nbsp;
            <div>
              <Button
                variant="primary"
                type="button"
                onClick={handleSubmit}
                disabled={!disable}
              >
                Sumbit
              </Button>
            </div>
          </>
        </Form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("add state---->>>>", state);
  return { contacts: state.contact };
};
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
