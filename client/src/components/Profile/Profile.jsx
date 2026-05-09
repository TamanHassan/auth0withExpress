import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  if (loading) return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#e0e0e0", marginBottom: "10px" }}></div>
      <div style={{ width: "200px", height: "20px", backgroundColor: "#e0e0e0", marginBottom: "8px", borderRadius: "4px" }}></div>
      <div style={{ width: "250px", height: "16px", backgroundColor: "#e0e0e0", borderRadius: "4px" }}></div>
    </div>
  );
  if (!user) return <p>Not logged in.</p>;
  return (
    <div>
      <h2>Hello {user.given_name || user.name}</h2>
      {user.email && <p style={{ margin: "8px 0", color: "#666" }}>{user.email}</p>}
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: 80, borderRadius: "50%" }}
        />
      )}
      <div style={{ marginTop: "20px" }}>
        <a 
          href="http://localhost:3000/logout" 
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Log out
        </a>
      </div>
    </div>
  );
};

export default Profile;
