import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { signInUser } from '@/api/user';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import { useAuthContext } from '@/hooks/useAuthContext';

// (?=.*[a-zA-Z]): 최소 1개의 영문 알파벳이 포함
// (?=.*[0-9]): 최소 1개의 숫자가 포함
// .{6,}: 최소 6자리 이상(특수문자도 허용)
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

function SignIn() {
  const { user } = useAuthContext();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const { email, password } = form;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      alert('패스워드는 숫자,영문 조합으로 6자리 이상 입력해 주세요');
      return;
    }

    try {
      const {
        data: { user },
      } = await signInUser(email, password);

      toast.success(
        `${user.user_metadata.username}님 로그인이 성공되었습니다.`
      );
      navigate('/profile');
    } catch (error) {
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <form className="form-group" onSubmit={onSubmitHandler}>
      <Input
        id="input-email"
        label="이메일"
        placeholder="example@example.com"
        type="email"
        name="email"
        value={email}
        onChange={onChangeHandler}
        autoComplete="off"
      />
      <Input
        id="input-password"
        label="비밀번호"
        placeholder="6자이상 입력해주세요"
        type="password"
        name="password"
        value={password}
        onChange={onChangeHandler}
        autoComplete="off"
      />
      <Button type="submit" label="로그인" />
    </form>
  );
}

export default SignIn;
