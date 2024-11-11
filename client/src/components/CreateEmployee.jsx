import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createEmployee } from "../redux/Employee/employeeSlice";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dsg: "Hr",
    gender: "",
    course: {
      mca: false,
      bca: false,
      bsc: false,
    },
    imgupload: null,
  });
  console.log(formData, "form data from create");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        course: {
          ...prevData.course,
          [name]: checked,
        },
      }));
    } else if (type === "file") {
      console.log("Selected file:", e.target.files[0]);
      setFormData((prevData) => ({
        ...prevData,
        imgupload: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const submissionData = new FormData();

    // Append text fields to FormData
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("mobile", formData.mobile);
    submissionData.append("dsg", formData.dsg);
    submissionData.append("gender", formData.gender);

    // Append the file
    if (formData.imgupload) {
      submissionData.append("imgupload", formData.imgupload.name);
    }

    const selectedCourses = Object.keys(formData.course)
      .filter((key) => formData.course[key])
      .join(",");
    submissionData.append("course", selectedCourses);

    // Dispatch the action to send data to the server
    dispatch(createEmployee({ data: submissionData }));
  };

  return (
    <Container>
      <h3 className="my-3">Create Employee</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formMobile">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDesignation">
            <Form.Label>Designation</Form.Label>
            <Form.Select
              name="dsg"
              value={formData.dsg}
              onChange={handleChange}
            >
              <option>HR</option>
              <option>Manager</option>
              <option>Sales</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <div>
              <Form.Check
                inline
                label="male"
                name="gender"
                type="radio"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="female"
                name="gender"
                type="radio"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCourse">
            <Form.Label>Course</Form.Label>
            <div>
              <Form.Check
                inline
                label="MCA"
                type="checkbox"
                name="mca"
                checked={formData.course.mca}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="BCA"
                type="checkbox"
                name="bca"
                checked={formData.course.bca}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="BSC"
                type="checkbox"
                name="bsc"
                checked={formData.course.bsc}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFileUpload">
            <Form.Label>Image Upload</Form.Label>
            <Form.Control
              type="file"
              name="imgupload"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateEmployee;
