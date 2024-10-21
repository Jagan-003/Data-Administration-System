import React, { useEffect, useState, useRef } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import './Dashboard.css';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [datasets, setDatasets] = useState([]);
    const [formatFilter, setFormatFilter] = useState('all');
    const [open, setOpen] = useState(false);
    const [selectedDataset, setSelectedDataset] = useState(null);
    const [username, setUsername] = useState('') ;
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const downloadLinkRef = useRef(null);
    const location = useLocation();  // To access the state passed via navigate
    const user_name = location.state?.username || 'Employee';  // Extract the username

    useEffect(() => {
        axios.get(`http://localhost:5000/api/metadata?format=${formatFilter}`)
            .then(response => {
                console.log('Metadata fetched:', response.data);
                setDatasets(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the metadata!", error);
            });
    }, [formatFilter]);

    const handleFormatChange = (event) => {
        setFormatFilter(event.target.value);
    };

    const handleClickDownload = (dataset) => {
        setSelectedDataset(dataset);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUsername('');
        setPassword('');
        setError('');
    };

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/validate-credentials', { username, password })
            .then(response => {
                if (response.data.valid) {
                    const url = `http://localhost:5000/api/download?dataset=${selectedDataset.dataset_name}&username=${username}&password=${password}`;
                    
                    console.log('Download URL:', url);

                    if (downloadLinkRef.current) {
                        downloadLinkRef.current.href = url;
                        downloadLinkRef.current.click(); // Programmatically click the link
                    } else {
                        console.error('Download link ref is null');
                    }

                    handleClose();
                } else {
                    setError('Invalid credentials. Please try again.');
                }
            })
            .catch(error => {
                console.error("There was an error validating the credentials!", error);
            });
    };

    return (
        <div className="dashboard-container">
            <Typography variant="h5" className="dashboard-welcome">
                <h1>Welcome, {user_name}</h1>
            </Typography>
            <Typography variant="body1" className="dashboard-instructions">
                These are the available datasets for you:
            </Typography>

            <div className="dashboard-sortby-container">
                <Typography variant="h6">Sort By:</Typography>
                <Select
                    value={formatFilter}
                    onChange={handleFormatChange}
                    className="dashboard-sortby-select"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="csv">.csv</MenuItem>
                    <MenuItem value="xml">.xml</MenuItem>
                    <MenuItem value="json">.json</MenuItem>
                    <MenuItem value="docx">.docx</MenuItem>
                </Select>
            </div>

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
                                <TableCell>
                                    <Button variant="contained" color="primary" className="view-button">
                                        View
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="dashboard-button"
                                        onClick={() => handleClickDownload(dataset)}
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Credentials</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

            <a ref={downloadLinkRef} style={{ display: 'none' }} />
        </div>
    );
};

export default Dashboard;
