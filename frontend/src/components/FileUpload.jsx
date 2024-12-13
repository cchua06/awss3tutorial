import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
      fetchFiles(); // Refresh the file list
      window.location.reload(); // Reload the window after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/files/');
      console.log('Fetched files:', response.data); // Debugging line
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-5">File Upload to AWS S3</h1>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>

      <h2 className="mt-5">Uploaded Files:</h2>
      <ul>
        {files.length > 0 ? (
          files.map((file) => (
            <li key={file.key}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.key.split('/').pop()}
              </a>
            </li>
          ))
        ) : (
          <li>No files found</li>
        )}
      </ul>
    </div>
  );
}

export default FileUpload;