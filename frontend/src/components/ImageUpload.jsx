import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  // Handle file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Validate file type (only .jpg and .jpeg)
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader();

      // Load the image and set it to state
      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please upload a .jpg image!');
    }
  };

  return (
    <div style={styles.container}>
        {image && (
        <div style={styles.preview}>
          {/* Displaying the uploaded image in a circular frame */}
          <img src={image} alt="Profile" style={styles.profileImage} />
        </div>
      )}
      <h2>Upload Profile Photo (.jpg only)</h2>
      <input
        type="file"
        accept=".jpg, .jpeg"
        onChange={handleFileChange}
        style={styles.input}
      />
      
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  input: {
    marginBottom: '15px'
  },
  preview: {
    marginTop: '20px',
    display: 'inline-block',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '3px solid #ddd',
  },
};

export default ImageUpload;