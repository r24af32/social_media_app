import React, { useEffect, useState } from "react";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.userList}>
        {users.map((user, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.details}>
              <h2 style={styles.userName}>{user.name}</h2>
              <p style={styles.socialHandle}>@{user.socialHandle}</p>
            </div>
            <div style={styles.imageGrid}>
              {user.images.map((image, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000${image}`}
                  alt="Uploaded"
                  style={styles.image}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "28px",
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  userList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  details: {
    marginBottom: "15px",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#4caf50",
  },
  socialHandle: {
    fontSize: "16px",
    color: "#555",
  },
  imageGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
};

export default AdminDashboard;
