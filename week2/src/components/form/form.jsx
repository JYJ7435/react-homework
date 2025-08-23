import React from 'react';
import './form.css';

/**
 * Form 컴포넌트
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - React Node
 * @param {string} [props.className] - Form ClassName

 */

function Form({ className, children }) {
  return <form className={`form-group ${className}`.trim()}>{children}</form>;
}

export default Form;
