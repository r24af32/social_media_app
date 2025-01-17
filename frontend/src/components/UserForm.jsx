import React, { useState, useRef } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    socialHandle: "",
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const data = new FormData();
    data.append("name", formData.name);
    data.append("socialHandle", formData.socialHandle);
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const response = await fetch(`https://socialmediapp-backend.vercel.app/api/users`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Submission successful!");
        setFormData({ name: "", socialHandle: "" });
        setImages([]);
        if (fileInputRef.current) fileInputRef.current.value = ""; 
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Submission Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Social Media Handle:</label>
          <input
            type="text"
            name="socialHandle"
            value={formData.socialHandle}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef} // Attach ref to file input
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            backgroundColor: isLoading ? "#ccc" : "#4caf50",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Submitting..." : "Submit"} {/* Change button text */}
        </button>
      </form>
      {isLoading && (
        <div style={styles.loading}>
          <span>Uploading, please wait...</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submitButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
  },
  loading: {
    marginTop: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  },
};

export default UserForm;
