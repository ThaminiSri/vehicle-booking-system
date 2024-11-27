import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // This will hold either username or email
  const [email, setEmail] = useState(''); // New state for email
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [currentUser, setCurrentUser] = useState(null); // State to hold the user being edited

  // Fetch users
  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleLoginClick = (e) => {
    e.preventDefault();
    
    // Check if the user exists with either username or email
    const user = users.find(user => 
      (user.username === username || user.email === email) && user.password === password
    );
    
    if (user) {
      onLogin(user.username, password);
      navigate('/booking');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };

    axios.post('http://localhost:3001/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        alert('User registered successfully!');
      })
      .catch(error => {
        console.error('Error adding user:', error);
        alert('Error registering user!');
      });
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, username, email, password };

    axios.put(`http://localhost:3001/users/${currentUser.id}`, updatedUser)
      .then(response => {
        setUsers(users.map(user => (user.id === currentUser.id ? response.data : user)));
        alert('User updated successfully!');
        setEditMode(false);
        setUsername('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error updating user:', error);
        alert('Error updating user!');
      });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:3001/users/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== userId));
          alert('User deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          alert('Error deleting user!');
        });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#f0f4fa',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, color: '#1e3a8a' }}>
          {editMode ? 'Edit User' : 'Vehicle Booking System'}
        </Typography>
        <form onSubmit={editMode ? handleUpdate : handleRegister}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#2563eb',
              '&:hover': { backgroundColor: '#1d4ed8' },
            }}
          >
            {editMode ? 'Update' : 'Register'}
          </Button>
        </form>
        {!editMode && (
          <Button
            onClick={handleLoginClick}
            variant="outlined"
            fullWidth
            sx={{ mt: 2, borderColor: '#1e3a8a', color: '#1e3a8a' }}
          >
            Login
          </Button>
        )}
      </Box>
      
      {/* User list with Edit and Delete buttons */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#1e3a8a' }}>
          Registered Users
        </Typography>
        {users.map((user) => (
          <Box key={user.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>{user.username} ({user.email})</Typography>
            <div>
              <Button
                onClick={() => handleEdit(user)}
                variant="outlined"
                color="primary"
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(user.id)}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </div>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default LoginPage;
