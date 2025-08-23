import Button from '../button/button';
import Form from '../form/form';
import Input from '../input/input';
import React from 'react';

function SignUp() {
  return (
    <Form>
      <Input
        id="form-name"
        placeholder="2글자 이상 입력"
        type="text"
        label="이름"
      />
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
      <Input
        id="form-confirm-password"
        placeholder="입력한 패스워드 다시 입력"
        type="password"
        label="패스워드 확인"
        isRequired={true}
      />
      <Button type="submit" label="회원가입" />
    </Form>
  );
}

export default SignUp;
