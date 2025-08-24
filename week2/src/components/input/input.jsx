import { useState } from 'react';
import './input.css';

/**
 * Input 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.id - 인풋 ID
 * @param {string} [props.type] - 인풋 타입
 * @param {string} [props.className] - 인풋 클래스 이름
 * @param {boolean} [props.isRequired] - 입력 필수 여부
 * @param {string} [props.label] - 인풋 라벨
 * @param {string} [props.placeholder] - 인풋 텍스트
 * @param {string} [props.name] - 인풋 네임
 * @param {React.ChangeEventHandler} [props.onChangeHandler] - 인풋 네임
 */

function Input({
  id,
  className = '',
  placeholder = '',
  label = '',
  type = 'text',
  isRequired = false,
  name,
  onChangeHandler,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const visibleToggleButton = () => {
    setIsVisible(!isVisible);
  };

  const isPassword = type === 'password';

  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        className={`input ${className}`.trim()}
        placeholder={placeholder}
        type={isPassword && isVisible ? 'text' : type}
        required={isRequired}
        name={name}
        onChange={onChangeHandler}
      />
      {isPassword && (
        <button
          type="button"
          onClick={visibleToggleButton}
          className={`hide-btn ${isVisible ? 'eye-open' : 'eye-off'}`}
          aria-label={isVisible ? '비밀번호 숨김' : '비밀번호 보임'}
        ></button>
      )}
    </div>
  );
}

export default Input;
