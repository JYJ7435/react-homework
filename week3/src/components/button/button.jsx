// @ts-nocheck
import './button.css';

/**
 * Button 컴포넌트
 * 상태에 따라 다른 색상의 버튼 표시.
 *
 * @param {Object} props
 * @param {'button' | 'submit' | 'reset'} [props.type] - 버튼 타입
 * @param {string} [props.className] - 버튼 클래스 이름
 * @param {boolean} [props.disabled] - 버튼 비활성화 여부
 */

function Button({ type = 'button', className = '', disabled = false }) {
  return (
    <button
      className={`button ${className}`.trim()}
      type={type}
      disabled={disabled}
      aria-label="검색 버튼"
    >
      <span className="btn-img"></span>
    </button>
  );
}

export default Button;
