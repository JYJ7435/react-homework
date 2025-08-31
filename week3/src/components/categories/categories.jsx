import React from 'react';
import './categories.css';

function Categories({ categories, onClick, selected }) {
  return (
    <div className="category-wrapper">
      {categories &&
        categories.map((item, idx) => (
          <button
            key={idx}
            className={`category-btn ${item === selected ? 'active' : ''}`.trim()}
            onClick={() => onClick(item)}
          >
            {item}
          </button>
        ))}
    </div>
  );
}

export default Categories;
