import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function NewPage(props) {
  const location = useLocation();
  const { email_id } = location.state || {};
  const firstLetter = email_id.charAt(0).toUpperCase();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    phone: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const userDetailsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDetailsRef.current && !userDetailsRef.current.contains(event.target)) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setEditMode(false);
      setEditIndex(null);
      setFormData({
        name: '',
        position: '',
        department: '',
        phone: '',
      });
    }
  };

  const toggleDetailsbar = () => {
    setShowUserDetails(!showUserDetails);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = e.target.value.replace(/\D/g, '');
    if (formattedPhone.length <= 10) {
      setFormData({
        ...formData,
        phone: formattedPhone,
      });
    }
  };

  const handleEditEmployee = (index) => {
    setFormData({
      name: employeeDetails[index].name,
      position: employeeDetails[index].position,
      department: employeeDetails[index].department,
      phone: employeeDetails[index].phone,
    });
    setEditMode(true);
    setEditIndex(index);
    setIsSidebarOpen(true);
  };

  const handleDeleteEmployee = () => {
    const updatedEmployees = [...employeeDetails];
    updatedEmployees.splice(deleteIndex, 1);
    setEmployeeDetails(updatedEmployees);
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const handleDeleteConfirm = (index) => {
    setShowDeleteModal(true);
    setDeleteIndex(index);
  };

  const handleLogout = () => {
    navigate('/');
  }

  const handleAddEmployee = () => {
    if (editMode && editIndex !== null) {
      const updatedEmployees = [...employeeDetails];
      updatedEmployees[editIndex] = {
        name: formData.name,
        position: formData.position,
        department: formData.department,
        phone: formData.phone,
      };
      setEmployeeDetails(updatedEmployees);
      setEditMode(false);
      setEditIndex(null);
      setIsSidebarOpen(false);
    } else {
      const newEmployee = {
        name: formData.name,
        position: formData.position,
        department: formData.department,
        phone: formData.phone,
      };
      setEmployeeDetails([...employeeDetails, newEmployee]);
      setIsSidebarOpen(false);
    }
    setFormData({
      name: '',
      position: '',
      department: '',
      phone: '',
    });
  };

  return (
    <div className='app'>
      <h1>Welcome to My App</h1>
      <header className="account-details">
        <FontAwesomeIcon icon={faBars} className="top-left-icon" onClick={toggleSidebar} />
        <div className="top-details-icon" ref={userDetailsRef} onClick={toggleDetailsbar}>
          <div className="user-initial">{firstLetter}</div>
          {showUserDetails && (
            <div className="user-details">
              <p>{email_id}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

      </header>

      <main className={isSidebarOpen ? "main-shrink" : ""}>
        <div className="table-container">
          <h2>Employee List</h2>
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Phone Number</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {employeeDetails.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <button onClick={() => handleEditEmployee(index)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteConfirm(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>


      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Employee Details</h2>
            <FontAwesomeIcon icon={faTimes} className="cancel-icon" onClick={toggleSidebar} />
          </div>
          <form>
            <label>
              Name :
              <br />
              <input type="text" name="name" class="input" value={formData.name} onChange={handleInputChange} />
            </label>
            <label>
              Position :
              <br />
              <input type="text" name="position" class="input" value={formData.position} onChange={handleInputChange} />
            </label>
            <label>
              Department :
              <input type="text" name="department" class="input" value={formData.department} onChange={handleInputChange} />
            </label>
            <label>
              Phone Number :
              <input type="tel" name="phone" value={formData.phone} class="input" onChange={handlePhoneChange} maxLength="10" />
            </label>
            <button type="button" class="btn btn-primary" onClick={handleAddEmployee} disabled={!formData.name || !formData.position || !formData.department || !formData.phone}>Add</button>
          </form>
        </div>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to delete this employee?</h4>
          <div className="modal-buttons">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteEmployee}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewPage;
