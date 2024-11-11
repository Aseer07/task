import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../redux/Employee/employeeSlice";

const UpdateEmp = ({ employee, setShowModal }) => {
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
  console.log(formData, "formdata from update");

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        mobile: employee.mobile || "",
        dsg: employee.dsg || "Hr",
        gender: employee.gender || "",
        course: employee.course || {
          mca: false,
          bca: false,
          bsc: false,
        },
        imgupload: employee.imgupload || null,
      });
    }
  }, [employee]);

  const dispatch = useDispatch();

  // Handle form field changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file uploads and form data
    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("mobile", formData.mobile);
    submissionData.append("designation", formData.dsg);
    submissionData.append("gender", formData.gender);

    submissionData.append("courses", JSON.stringify(formData.course));

    // If an image is uploaded, append it
    if (formData.imgupload) {
      submissionData.append("imgupload", formData.imgupload);
    }

    try {
      // Dispatch updateEmployee action
      dispatch(updateEmployee({ id: employee._id, data: submissionData }));
      setShowModal(false);
      console.log("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <Container>
      <h3 className="my-3">Update Employee</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name || ""}
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
              value={formData.email || ""} // Fallback value
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
              value={formData.mobile || ""}
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
                label="M"
                name="gender"
                type="radio"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="F"
                name="gender"
                type="radio"
                value="F"
                checked={formData.gender === "F"}
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

export default UpdateEmp;
