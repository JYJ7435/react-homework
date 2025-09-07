import React, { HTMLInputTypeAttribute } from 'react';
import './input.css';

interface Props extends React.ComponentProps<'input'> {
  id: string;
  className?: string;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  isRequired?: boolean;
}

function Input({
  id,
  className = '',
  placeholder = '',
  label = '',
  type = 'text',
  isRequired = false,
  ...restProps
}: Props) {
  return (
    <>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        className={`input ${className}`.trim()}
        placeholder={placeholder}
        type={type}
        required={isRequired}
        {...restProps}
      />
    </>
  );
}

export default Input;
