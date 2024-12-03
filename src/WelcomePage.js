import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBFooter } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "mdb-react-ui-kit/dist/css/mdb.min.css"; // MDBReact CSS
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import giphy from "./bg.gif"; // Import the GIF

function WelcomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    toast.success("Navigating to the map!");
    setTimeout(() => navigate("/map"), 1500);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${giphy})`, // Use the imported GIF
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <MDBContainer className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          className="text-center p-5 shadow rounded bg-white"
          style={{ opacity: 0.9 }}
        >
          <h1 className="mb-4">
            Welcome to the <span style={{ color: "#007BFF" }}>Hospital Locator</span>
          </h1>
          <p className="lead mb-4">
            Discover hospitals nearby based on your location and needs. Use our
            interactive map to find specialized care effortlessly.
          </p>
          <MDBBtn color="primary" size="lg" onClick={handleButtonClick}>
            Go to Map
          </MDBBtn>
        </div>
        <MDBFooter className="mt-auto text-center">
          <p className="text-white mt-4">© 2024 Hospital Locator. All rights reserved.</p>
        </MDBFooter>
        <ToastContainer />
      </MDBContainer>
    </div>
  );
}

export default WelcomePage;
