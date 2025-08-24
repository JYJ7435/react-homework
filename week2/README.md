# React 2주차 과제

멋사 프론트엔드 14기 2주차 과제 문서입니다. <br/>

## 목차

- [Input Component](#input-component)
- [Button Component](#button-component)
- [Form Component](#form-component)
- [최종](#최종)
- [2주차 회고](#2주차-회고)

## Input Component

```jsx
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
```

### 분석

- props로 id,className,placeholder,label,type,isRequired,name,onChangeHandler 등 전달
- type이 password일 경우에만 아이콘 렌더링
- useState Hook을 사용하여 비밀번호 숨김/보임 토글 및 타입 변경

## Button Component

```jsx
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
```

### 분석

- props로 type,label,state,className,disabled 전달
- state 값에 따라 버튼 스타일 변경 (현재는 Basic타입만 있음)

## Form Component

```jsx
/**
 * Form 컴포넌트
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - React Node
 * @param {string} [props.className] - Form ClassName
 * @param {React.FormEventHandler} [props.onSubmit] - Form ClassName

 */

function Form({ className, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={`form-group ${className}`.trim()}>
      {children}
    </form>
  );
}
```

### 분석

- props로 className, children(React Node), onSubmit(FormEventHandler) 전달

## 최종

```jsx
// App.jsx
function App() {
  // (?=.*[a-zA-Z]): 최소 1개의 영문 알파벳이 포함
  // (?=.*[0-9]): 최소 1개의 숫자가 포함
  // .{6,}: 최소 6자리 이상(특수문자도 허용)
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

  return (
    <section className="app">
      <h1>리액트 2주차 과제</h1>
      <div className="container">
        <div>
          <h2>로그인</h2>
          <SignIn regex={passwordRegex} />
        </div>
        <div>
          <h2>회원가입</h2>
          <SignUp regex={passwordRegex} />
        </div>
      </div>
    </section>
  );
}

/**
 * SignUp 컴포넌트
 *
 * @param {Object} props
 * @param {RegExp} props.regex - 인풋 ID
 */

function SignUp({ regex }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeHandler = (e) => {
    // name,value 구조분해 할당
    const { name, value } = e.target;

    setForm({
      ...form, // 기존 form 객체 복사 (불변성 유지)
      [name]: value, // name과 일치하는 key의 value값 덮어씀
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // name, password, confirmPassword 구조분해 할당
    const { name, password, confirmPassword } = form;

    // name 유효성 검사
    if (name.trim().length < 2) {
      alert('이름은 두 글자 이상 입력해 주세요');
      return;
    }

    // 패스워드 유효성 검사
    if (!regex.test(password) || !regex.test(confirmPassword)) {
      alert('패스워드는 숫자,영문 조합으로 6자리 이상 입력해 주세요');
      return;
    }

    if (password !== confirmPassword) {
      alert('패스워드 확인 해주세요.');
      return;
    }

    alert('회원가입이 완료 되었습니다!!');
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        id="form-name"
        placeholder="2글자 이상 입력"
        type="text"
        label="이름"
        name="name"
        onChangeHandler={onChangeHandler}
      />
      <Input
        id="form-email"
        placeholder="use@comany.io"
        type="email"
        label="이메일"
        name="email"
        onChangeHandler={onChangeHandler}
      />
      <Input
        id="form-password"
        placeholder="숫자, 영문 조합 6자리 이상 입력"
        type="password"
        label="패스워드"
        isRequired={true}
        name="password"
        onChangeHandler={onChangeHandler}
      />
      <Input
        id="form-confirm-password"
        placeholder="입력한 패스워드 다시 입력"
        type="password"
        label="패스워드 확인"
        isRequired={true}
        name="confirmPassword"
        onChangeHandler={onChangeHandler}
      />
      <Button type="submit" label="회원가입" />
    </Form>
  );
}

/**
 * SignIn 컴포넌트
 *
 * @param {Object} props
 * @param {RegExp} props.regex - 인풋 ID
 */

function SignIn({ regex }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { password } = form;

    if (!regex.test(password)) {
      alert('패스워드는 숫자,영문 조합으로 6자리 이상 입력해 주세요');
      return;
    }

    alert('로그인이 완료 되었습니다!!');
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        id="form-email"
        placeholder="use@comany.io"
        type="email"
        label="이메일"
        name="email"
        onChangeHandler={onChangeHandler}
      />
      <Input
        id="form-password"
        placeholder="숫자, 영문 조합 6자리 이상 입력"
        type="password"
        label="패스워드"
        isRequired={true}
        name="password"
        onChangeHandler={onChangeHandler}
      />
      <Button type="submit" label="로그인" />
    </Form>
  );
}
```

### 분석

- useState Hook을 사용하여 form 객체 상태 관리
- Input 컴포넌트에 전달할 onChangeHandler 함수 작성
- Form 컴포넌트에 전달할 onSubmitHandler 함수 작성

## 2주차 회고

기존 Vanila JS로 실습과 프로젝트를 진행하며 규모가 커질수록 코드가 복잡해지고 유지보수가 어려워지는 점과 DOM을 직접 조작해야 하므로 성능 부담이 발생할 수 있다는 단점들을 체감하였습니다.<br/>하지만 리액트로 넘어오면서 이러한 문제들이 확실히 개선되었음을 느끼고 있습니다.<br/>
기존 리액트를 함수형 컴포넌트 위주로 학습을 진행했던터라 클래스 컴포넌트로도 실습을 진행하였을때엔 많이 힘들기도 하였습니다. 이번 과제도 함수형으로만 구현을 하였지만 꼭 클래스컴포넌트로도 구현을 해보는 연습을 해봐야겠다는 생각이 들었습니다.<br /> 앞으로의 리액트 수업이 더더욱 기대가 되는 한주였습니다.
