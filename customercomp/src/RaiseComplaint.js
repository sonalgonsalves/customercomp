import React, { useState } from 'react';

const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaintType: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const validateForm = () => {
    const newErrors = {};

    // Name validation: only alphabets and spaces, starting with an alphabet
    if (!formData.name) newErrors.name = 'Name is required';
    else if (!/^[A-Za-z][A-Za-z\s]*$/.test(formData.name)) newErrors.name = 'Name should only contain alphabets and spaces, starting with an alphabet';
    
    // Email validation
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    // Complaint type validation
    if (!formData.complaintType) newErrors.complaintType = 'Complaint type is required';
    
    // Description validation
    if (!formData.description) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Log the form data to the console
    console.log('Complaint Submitted:', formData);

    // Open the modal
    setIsModalOpen(true);

    // Reset form fields
    setFormData({ name: '', email: '', complaintType: '', description: '' });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Raise Complaint</h2>
        <div style={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>
        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>
        <div style={styles.formGroup}>
          <label>Complaint Type</label>
          <select
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select</option>
            <option value="Billing">Billing</option>
            <option value="Service">Service</option>
            <option value="Other">Other</option>
          </select>
          {errors.complaintType && <p style={styles.error}>{errors.complaintType}</p>}
        </div>
        <div style={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          ></textarea>
          {errors.description && <p style={styles.error}>{errors.description}</p>}
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      {/* Modal Component */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Success</h3>
            <p>Complaint submitted successfully!</p>
            <button onClick={() => setIsModalOpen(false)} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '500px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RaiseComplaint;
