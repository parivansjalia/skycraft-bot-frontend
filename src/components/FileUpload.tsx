import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'video/mp4') {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Please select a valid MP4 file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('Failed to upload the file.');
      }
    } catch (error) {
      setMessage('Error uploading the file.');
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Upload MP4 File</h2>
      
      <div style={inputWrapperStyle}>
        <input
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          style={inputStyle}
        />
      </div>

      <button
        onClick={handleUpload}
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5A54E3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6C63FF')}
      >
        Upload File
      </button>

      {message && (
        <p
          style={{
            ...messageStyle,
            color: message.includes('successfully') ? '#28A745' : '#DC3545',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '20px',
  maxWidth: '400px',
  margin: '50px auto',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle: React.CSSProperties = {
  marginBottom: '15px',
  color: '#333',
  fontSize: '1.8rem',
  fontWeight: '700',
};

const inputWrapperStyle: React.CSSProperties = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '1rem',
  border: '2px solid #ddd',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  maxWidth: '300px',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 30px',
  backgroundColor: '#6C63FF',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
};

const messageStyle: React.CSSProperties = {
  marginTop: '15px',
  fontSize: '1rem',
  fontWeight: '500',
};

export default FileUpload;
