import Button from '../button/button';
import Form from '../form/form';
import Input from '../input/input';
import React, { useState } from 'react';

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

export default SignIn;
