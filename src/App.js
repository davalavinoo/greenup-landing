import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "./firebase"; // Make sure this file exists with your config
import './App.css';
//import { getAuth, signInAnonymously } from "firebase/auth";

function App() {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!photo) {
      setErrorMessage("Please select a plant photo first!");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("Please describe the plant issue.");
      return;
    }

    setUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Upload photo to Firebase Storage
      const storageRef = ref(storage, `plant-issues/${Date.now()}_${photo.name}`);
      await uploadBytes(storageRef, photo);
      const photoURL = await getDownloadURL(storageRef);

      // Save submission to Firestore
      await addDoc(collection(db, "plantSubmissions"), {
        photoURL,
        description,
        createdAt: serverTimestamp(),
        status: "pending",           // Will be changed by students later
        userEmail: "anonymous",      // You can replace with auth later
      });

      setSuccessMessage("Thank you! Your plant issue has been submitted successfully. A student will review it soon 🌱");
      setPhoto(null);
      setDescription("");
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Upload failed. Please try again or check your connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌿 Greenup</h1>
        <p>Your Plant, Our Care</p>
        <h2>Human-Powered Organic Plant Doctor</h2>

        <p className="vision">
          “To build a sustainable plant care system where every plant receives organic care, 
          expert human attention, and empowers the next generation of agriculture professionals.”
        </p>

        <div className="inspiration">
          <h3>Inspired by real plant lovers</h3>

          {/* Image gallery - real plant care inspiration */}
          <div className="image-gallery">
            <img 
              src="https://hips.hearstapps.com/hmg-prod/images/young-woman-caring-her-plants-at-home-royalty-free-image-1752585749.pjpeg" 
              alt="Woman caring for plants" 
              className="gallery-img" 
            />
            <img 
              src="https://www.decorilla.com/online-decorating/wp-content/uploads/2021/07/Lucious-plants-in-interior-design-1.jpeg" 
              alt="Beautiful indoor plant arrangement" 
              className="gallery-img" 
            />
            <img 
              src="https://extension.psu.edu/media/catalog/product/c/a/cad74bc2b228547be22685cba0ec7ac4.jpeg?quality=80&bg-color=248,248,248&fit=bounds&height=427&width=640&canvas=640:427" 
              alt="Examining plant leaves for disease" 
              className="gallery-img" 
            />
          </div>
        </div>

        {/* Upload Form */}
        <div className="upload-section">
          <h3>Got a sick or struggling plant? Get expert organic advice now!</h3>
          <p>Upload a clear photo + describe the issue (yellow leaves, spots, wilting, etc.)</p>

          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              setErrorMessage("");
            }}
          />

          <textarea 
            placeholder="Describe the problem in detail..." 
            rows="5"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrorMessage("");
            }}
          />

          {errorMessage && (
            <p style={{ color: "#d32f2f", margin: "10px 0" }}>{errorMessage}</p>
          )}

          <button 
            className="upload-btn"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Submitting..." : "Submit for Organic Advice (₹99)"}
          </button>

          {successMessage && (
            <p style={{ color: "#2e7d32", marginTop: "1.5em", fontWeight: "bold" }}>
              {successMessage}
            </p>
          )}
        </div>

        <p className="tagline">We don’t sell plants. We save plants. 💚</p>
      </header>
    </div>
  );
}

export default App;