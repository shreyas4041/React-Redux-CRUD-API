import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "../add-contact/contact.css";

const EditPost = ({ contacts, updateContact }) => {
  const params = useParams();
  console.log("paramsId------->>>>>>", params);
  const navigate = useNavigate();
  console.log("contacts==>>", contacts);

  const currentData = contacts.find((item) => {
    return item.id === parseInt(params.id);
  });
  // const currentData = contacts.find(
  //   (contact) => contact.id === params.id
  //   );
  console.log("type of params-->>", typeof params);
  console.log("currentData===>>", currentData);

  useEffect(() => {
    if (params.id) {
      // contacts.forEach((contact) => setValue(contact, regForm[contact]));
      // setRegForm((index) => contacts[index].regForm);
      setRegForm(currentData);
    }
  }, [currentData, params]);

  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegForm({ ...regForm, [name]: value });
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

  const handleSubmit = (e, id) => {
    e.preventDefault();
    console.log("id--->>", id);

    // const checkContactEmailExists = contacts.filter((contact) =>
    //   contact.email === regForm.email && contact.id !== currentData.paramsid
    //     ? contact
    //     : null
    // );
    // if (!regForm.email || !regForm.name || !regForm.gender || !regForm.status) {
    //   return toast.warning("Please fill in all fields!!");
    // }
    // if (checkContactEmailExists.length > 0) {
    //   return toast.error("This email already exists!!");
    // }

    const data = {
      id: currentData.id,
      name: regForm.name,
      email: regForm.email,
      gender: regForm.gender,
      status: regForm.status,
    };
    console.log("new data--->>", data);
    if (params) {
      updateContact(data);
      toast.success("Your data has been updated!!");
    }
    navigate("/");
  };
  return (
    <>
      {/* <div>
        <h3>
          Welcome to <b>{params.id}</b> user data
        </h3>
      </div> */}
      <div className="container">
        {currentData ? (
          <Form
            onSubmit={(id) => {
              handleSubmit(id);
            }}
          >
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
                    // value={regForm.male}
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
                    // value={regForm.female}
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
                  type="submit"
                  // type="button"
                  // onClick={(params) => {
                  //   handleSubmit(params);
                  // }}
                  // disabled={!disable}
                >
                  Update Contact
                </Button>
              </div>
            </>
          </Form>
        ) : (
          <h1 className="text-center">No Contact Found</h1>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  contacts: state.contact,
});
const mapDispatchToProps = (dispatch) => {
  return {
    updateContact: (data) => {
      dispatch({ type: "UPDATE_CONTACT", payload: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
