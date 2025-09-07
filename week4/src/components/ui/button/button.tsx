import React from 'react';
import './button.css';
import { BUTTON_STATE } from './constants';

/**
 * Button 컴포넌트
 * 상태에 따라 다른 색상의 버튼 표시.
 */

interface Props extends React.ComponentProps<'button'> {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  state?: 'Basic' | 'Success' | 'Danger';
  className?: string;
  disabled?: boolean;
}

function Button({
  type = 'button',
  label,
  state = 'Basic',
  className = '',
  disabled = false,
  ...restProps
}: Props) {
  return (
    <button
      className={`${BUTTON_STATE[state]} ${className}`.trim()}
      type={type}
      disabled={disabled}
      {...restProps}
    >
      {label}
    </button>
  );
}

export default Button;
