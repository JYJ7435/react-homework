// @ts-nocheck
import { BUTTON_STATE } from './constants';
import './button.css';

/**
 * Button 컴포넌트
 * 상태에 따라 다른 색상의 버튼 표시.
 *
 * @param {Object} props
 * @param {'button' | 'submit' | 'reset'} [props.type] - 버튼 타입
 * @param {string} [props.className] - 버튼 클래스 이름
 * @param {'Basic' | 'Success' | 'Danger'} [props.state] - 버튼 상태
 * @param {boolean} [props.disabled] - 버튼 비활성화 여부
 * @param {string} props.label - 버튼 라벨
 */

function Button({
  type = 'button',
  label,
  state = 'Basic',
  className = '',
  disabled = false,
}) {
  return (
    <button
      className={`${BUTTON_STATE[state]} ${className}`.trim()}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
