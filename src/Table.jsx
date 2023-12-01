// Table.js
import React from 'react';

const Table = ({
  users,
  selectedRows,
  onToggleRow,
  onEditRow,
  onSaveEdit,
  onCancelEdit,
  editUserId,
  editName,
  setEditName,
  editEmail,
  setEditEmail,

  onDeleteRow,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
            <td>{user.id}</td>
            <td>
            <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => onToggleRow(user.id)}
                  />
              {editUserId === user.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editUserId === user.id ? (
                <input
                  type="text"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                />
              ) : (
                user.email
              )}
            </td>
            <td>{user.role}</td>
            <td>
              {editUserId === user.id ? (
                <>
                  <button onClick={onSaveEdit}>Save</button>
                  <button onClick={onCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                 
                  <button onClick={() => onEditRow(user.id)}>Edit</button>
                  <button onClick={() => onDeleteRow(user.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
