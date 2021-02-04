import React from 'react';

const Alert = ({ type, message }) => {
  const alertStyles = {
    width: '95%',
    minHeight: '100px',
    margin: '2rem 0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid white',
    borderRadius: '10px',
    color: 'white',
    fontWeight: 'bold',
    padding: '1rem',
    fontSize: '1.2rem',
    background: type === 'danger' ? '#af2d2d' : '#4D978A',
  };
  return <div style={alertStyles}>{message}</div>;
};

export default Alert;
