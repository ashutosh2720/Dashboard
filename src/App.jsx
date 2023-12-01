// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Table';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Adjust the number of rows per page according to your needs

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

 
  const handleSearch = term => {
    setSearchTerm(term);
    setEditUserId(null);
    setCurrentPage(1);
  };

  const handleToggleRow = id => {
    const updatedSelection = [...selectedRows];
    const index = updatedSelection.indexOf(id);

    if (index === -1) {
      updatedSelection.push(id);
    } else {
      updatedSelection.splice(index, 1);
    }

    setSelectedRows(updatedSelection);
  };

  const handleEditRow = id => {
    setEditUserId(id);
    const userToEdit = users.find(user => user.id === id);
    setEditName(userToEdit.name);
    setEditEmail(userToEdit.email);
  };

  const handleSaveEdit = () => {
    const updatedUsers = users.map(user =>
      user.id === editUserId ? { ...user, name: editName, email: editEmail } : user
    );
    setUsers(updatedUsers);
    setEditUserId(null);
    setEditName('');
    setEditEmail('');
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditName('');
    setEditEmail('');
  };

  const handleDeleteRow = id => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setSelectedRows(selectedRows.filter(selectedId => selectedId !== id));
    setEditUserId(null);
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
    setEditUserId(null);
  };

  const handlePagination = pageNumber => {
    setCurrentPage(pageNumber);
  };


  
  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="app-container">
     <div className="nav">
     <SearchBar onSearch={handleSearch} />
      <button onClick={handleDeleteSelected}>Delete Selected</button>
     </div>
      <Table
        users={currentUsers}
        selectedRows={selectedRows}
        onToggleRow={handleToggleRow}
        onEditRow={handleEditRow}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        editUserId={editUserId}
        editName={editName}
        setEditName={setEditName}
        setEditEmail={setEditEmail}

        editEmail={editEmail}
        onDeleteRow={handleDeleteRow}
      />
     
      <Pagination
        currentPage={currentPage}
        totalRows={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePagination}
      />
      
    </div>
  );
};

export default App;
