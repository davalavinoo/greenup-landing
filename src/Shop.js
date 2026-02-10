import React from 'react';
import './App.css';

const products = [
  {
    id: 1,
    name: "Organic Vermicompost (1kg)",
    price: "₹149",
    description: "100% natural compost for healthy root growth and soil aeration",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/39de55b7-868c-4feb-895e-142a8f7c2eb7.__CR0,0,970,600_PT0_SX970_V1___.jpg", // Vermicompost bag with soil hand
    buyLink: "https://wa.me/917901396164?text=Interested%20in%20Vermicompost%201kg",
  },
  {
    id: 2,
    name: "Neem Oil Spray (500ml)",
    price: "₹199",
    description: "Organic pest control for indoor & outdoor plants – safe & effective",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/2d5fc004-ea63-4871-bea6-ac1b6ef6ea6a.__CR0,0,1940,1200_PT0_SX970_V1___.jpg", // Neem oil bottles collection
    buyLink: "https://wa.me/917901396164?text=Interested%20in%20Neem%20Oil%20Spray",
  },
  {
    id: 3,
    name: "Eco-Friendly Terracotta Pot (6 inch)",
    price: "₹249",
    description: "Breathable clay pot for better drainage – perfect for succulents & herbs",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b4c89139-2dce-4896-984f-141a4602ca7c.__CR0,0,5000,3093_PT0_SX970_V1___.jpg", // Self-watering terracotta pot
    buyLink: "https://wa.me/917901396164?text=Interested%20in%20Terracotta%20Pot%206%20inch",
  },
  {
    id: 4,
    name: "Coco Coir Grow Bag / Pot",
    price: "₹179",
    description: "100% biodegradable coco coir – excellent for seed starting & moisture retention",
    image: "https://gardenerspath.com/wp-content/uploads/2023/05/Learn-How-to-Use-Coconut-Coir-Products-in-the-Garden.jpg", // Coco coir products in use
    buyLink: "https://wa.me/917901396164?text=Interested%20in%20Coco%20Coir",
  },
  {
    id: 5,
    name: "Cow Dung Organic Manure (5kg)",
    price: "₹299",
    description: "Natural, nutrient-rich cow dung manure – ideal for all plants & eco-friendly",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/3cbb80ad-3c40-478b-941e-ba2f9498643e.__CR0,0,970,600_PT0_SX970_V1___.jpg", // Cow dung manure bag
    buyLink: "https://wa.me/917901396164?text=Interested%20in%20Cow%20Dung%20Manure%205kg",
  },
  // You can add more products easily
];

function Shop() {
  return (
    <div className="App-header" style={{ minHeight: '100vh', background: '#e8f5e9' }}>
      <h1>🌿 Greenup Shop</h1>
      <p>Recommended organic products to help your plants thrive after student advice</p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '30px', 
        padding: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            transition: 'transform 0.3s',
            textAlign: 'center'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                height: '240px', 
                objectFit: 'cover' 
              }} 
            />
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.3rem' }}>{product.name}</h3>
              <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '1.4rem', margin: '8px 0' }}>{product.price}</p>
              <p style={{ color: '#555', margin: '0 0 15px' }}>{product.description}</p>
              <a 
                href={product.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#4caf50',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;