import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Admin.css';  // Assuming this file contains relevant styles
import { useLocation } from 'react-router-dom';

const Admin = () => {
    const location = useLocation();
    const username = location.state?.username || 'Admin';
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileMetadata, setFileMetadata] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [datasets, setDatasets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDatasets();
    }, []);

    const fetchDatasets = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/metadata');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            if (Array.isArray(data)) {
                setDatasets(data);
            } else {
                console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching datasets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            getFileMetadata(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            getFileMetadata(file);
        }
    };

    const handleBrowseClick = () => {
        document.getElementById('fileInput').click();
    };

    const getFileMetadata = (file) => {
        const metadata = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        };
        setFileMetadata(metadata);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('File successfully uploaded');
                fetchDatasets();
                setSelectedFile(null); // Clear the selected file after upload
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="upload-content">
                <div className="upload-header">
                    <div className="welcome-message">
                        <h1>Welcome, {username}</h1> {/* Display welcome message */}
                    </div>
                    <h2>Uploads</h2>
                    <p>Accepted formats: CSV, DOCX, XML, JSON</p>
                </div>
                <div
                    className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleBrowseClick}
                >
                    <img src="your-image-path.jpg" alt="Upload formats" className="upload-icon" />
                    <p>
                        Drag your file here or <span className="browse-link" onClick={handleBrowseClick}>browse</span> for a file.
                    </p>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>

                {selectedFile && (
                    <div className="file-metadata">
                        <p>File ready for upload: {fileMetadata.name}</p>
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                )}
            </div>

            <div className="datasets-table">
                {loading ? (
                    <p>Loading datasets...</p>
                ) : (
                    <TableContainer component={Paper} className="dashboard-table-container">
                        <Table>
                            <TableHead>
                                <TableRow className="dashboard-table-header">
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datasets.map((dataset) => (
                                    <TableRow key={dataset.dataset_name}>
                                        <TableCell component="th" scope="row">
                                            {dataset.dataset_name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {/* Add action buttons like download, delete, etc. here */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default Admin;
