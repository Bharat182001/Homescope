import React from 'react';
import '../landingPage.css';

const LandingPage = () => {
  return (
    <div className="landingPage">
      <header id='headerLandingPage'>
        <h1>Buy Properties</h1>
      </header>
      <main className="main">
        <section className="featured-properties-section">
          <h2>Featured Assets</h2>
          <div className="featured-properties">
            <div className="property-card">
              <img id='img1' src="https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png" alt='Asset1'/>
              <h3>Homes</h3>
              <p>Location: NewYork + California Area (US)</p>
              <p>Price: 08 ETH - 25 ETH</p>
            </div>
            <div className="property-card">
              <img id='img2' src="http://localhost:3000/static/media/car2.1d7eb30a104f3579d2c8.jpg" alt='Asset2'/>
              <h3>Cars</h3>
              <p>Location: Main Delhi Area</p>
              <p>Price: 75 ETH - 110 ETH</p>
            </div>
            <div className="property-card">
              <img id='img3' src="	http://localhost:3000/static/media/building1.cd62febf295161f451d6.jpg" alt='Asset3'/>
              <h3>Storeys</h3>
              <p>Location: Near Noida(UP) + Delhi Area</p>
              <p>Price Range: 170 ETH - 260 ETH</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; Made By Bharat Data. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

