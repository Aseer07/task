import React, { useEffect, useState } from "react";
import { Button, Form, Image, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  removeEmployee,
} from "../redux/Employee/employeeSlice";
import UpdateEmp from "./updateEmployee";

const EmployeeList = () => {
  const { employees } = useSelector((state) => state.employee.employees);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  console.log(employees, "employee");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  function handleRemoveEmployee(id) {
    dispatch(removeEmployee({ id }));
  }

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEmployee(null);
  };

  // Filter employees based on the search query
  const filteredEmployees = employees?.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.dsg.toLowerCase().includes(query.toLowerCase()) ||
      employee.gender.toLowerCase().includes(query.toLowerCase()) ||
      employee.course.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="me-2"
        style={{ padding: 15 }}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees &&
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  <Image src={employee.imgupload} width={80} rounded />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.dsg}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>
                  {new Date(employee.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveEmployee(employee._id)}
                    style={{ marginBottom: 10 }}
                  >
                    Delete
                  </Button>
                  <br />
                  <Button
                    variant="primary"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          {filteredEmployees &&
            filteredEmployees.length === 0 &&
            "No Data Matched Found"}
        </tbody>
      </Table>

      {/* Modal for Editing Employee */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showModal && (
            <UpdateEmp employee={currentEmployee} setShowModal={setShowModal} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeList;
