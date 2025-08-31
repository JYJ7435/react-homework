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
 * @param {React.ChangeEventHandler} [props.onChangeHandler] - 인풋 이벤트핸들러
 * @param {boolean} [props.srOnly] - Label sr-only 클래스 추가 유무
 * @param {string | number} [props.value] - 인풋 값
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
  srOnly = false,
  value,
}) {
  return (
    <div className="input-group">
      <label htmlFor={id} className={`input-label ${srOnly ? 'sr-only' : ''}`}>
        {label}
      </label>
      <input
        id={id}
        className={`input ${className}`.trim()}
        placeholder={placeholder}
        type={type}
        required={isRequired}
        name={name}
        onChange={onChangeHandler}
        autoComplete="off"
        value={value}
      />
    </div>
  );
}

export default Input;
