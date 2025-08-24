import Button from '../button/button';
import Form from '../form/form';
import Input from '../input/input';
import React, { useState } from 'react';

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
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { name, password, confirmPassword } = form;

    if (name.trim().length < 2) {
      alert('이름은 두 글자 이상 입력해 주세요');
      return;
    }

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

export default SignUp;
