import Button from '../button/button';
import Form from '../form/form';
import Input from '../input/input';
import React from 'react';

function SignIn() {
  return (
    <Form>
      <Input
        id="form-email"
        placeholder="use@comany.io"
        type="email"
        label="이메일"
      />
      <Input
        id="form-password"
        placeholder="숫자, 영문 조합 6자리 이상 입력"
        type="password"
        label="패스워드"
        isRequired={true}
      />
      <Button type="submit" label="로그인" />
    </Form>
  );
}

export default SignIn;
