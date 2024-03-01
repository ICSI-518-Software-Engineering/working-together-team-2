import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SideMenuBar = ({ options, onSelect, selectedOption }) => {
  // Inline CSS styling
  const styles = `
    .side-menu {
      position: fixed;
      top: 56px; /* Adjust based on your navbar height */
      left: 0;
      bottom: 0; /* Stretch the menu to the bottom of the viewport */
      width: 250px; /* Adjust the width as needed */
      background-color: #f8f9fa; /* Background color */
      border-right: 1px solid #dee2e6; /* Right border */
      overflow-y: auto; /* Enable scrolling if menu items overflow */
      padding: 20px; /* Add thick margins */
    }

    .side-menu .list-group-item {
      border: none; /* Remove borders */
      color: #000; /* Black text color */
    }

    .side-menu .list-group-item.active {
      background-color: beige; /* Highlighted background color */
      color: #000; /* Black text color */
    }

    .side-menu .list-group-item:hover {
      background-color: #e9ecef; /* Hover background color */
    }
  `;

  return (
    <div className="side-menu">
      <style>{styles}</style> {/* Inject CSS styles */}
      <ListGroup>
        {options.map((option, index) => (
          <ListGroup.Item 
            key={index} 
            action 
            onClick={() => onSelect(option)}
            className={selectedOption === option ? "active" : ""}
          >
            {option}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default SideMenuBar;
