import React from 'react';
import './App.css'; // We'll style this next

function App() {
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
          <h3>Inspired by real plant lovers like you</h3>
          
          {/* Plant care in action */}
          <div className="image-gallery">
            <img src="https://hips.hearstapps.com/hmg-prod/images/young-woman-caring-her-plants-at-home-royalty-free-image-1752585749.pjpeg" alt="Woman caring for plants" className="gallery-img" />
            <img src="https://porch.com/advice/wp-content/uploads/2022/11/young-woman-cultivating-plants-home.jpg" alt="Repotting plants" className="gallery-img" />
          </div>

          {/* Aesthetic plant arrangements */}
          <div className="image-gallery">
            <img src="https://www.decorilla.com/online-decorating/wp-content/uploads/2021/07/Lucious-plants-in-interior-design-1.jpeg" alt="Modern plant arrangement" className="gallery-img" />
            <img src="https://media.architecturaldigest.com/photos/5dcde00380598800086215f6/master/w_1600%2Cc_limit/Osofsky_Oct19-5.jpg" alt="Lush indoor plants" className="gallery-img" />
          </div>

          {/* Disease check inspiration */}
          <div className="image-gallery">
            <img src="https://extension.psu.edu/media/catalog/product/c/a/cad74bc2b228547be22685cba0ec7ac4.jpeg?quality=80&bg-color=248,248,248&fit=bounds&height=427&width=640&canvas=640:427" alt="Examining plant leaves" className="gallery-img" />
          </div>
        </div>

        <div className="upload-section">
  <h3>Got a sick or struggling plant? Get expert organic advice now!</h3>
  <p>Upload a clear photo + describe the issue (e.g., yellow leaves, spots, wilting).</p>
  
  <input 
    type="file" 
    accept="image/*" 
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Selected photo:', file.name);
        // Later: we'll upload this to Firebase
      }
    }} 
  />
  
  <textarea 
    placeholder="Describe the problem (e.g., leaves turning yellow, brown spots, slow growth...)" 
    rows="5" 
    onChange={(e) => console.log('Description:', e.target.value)}
  />
  
  <button 
    className="upload-btn"
    onClick={() => {
      alert('Your plant issue has been submitted! A student will review it soon. 🌱');
      // Later: send to backend/student dashboard
    }}
  >
    Submit for Organic Advice (₹99)
  </button>
</div>
        
        <p className="tagline">We don't sell plants. We save them. 💚</p>
      </header>
    </div>
  );
}

export default App;