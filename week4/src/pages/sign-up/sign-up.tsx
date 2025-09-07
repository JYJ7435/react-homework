import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { signUpUser } from '@/api/user';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import { useAuthContext } from '@/hooks/useAuthContext';

// (?=.*[a-zA-Z]): 최소 1개의 영문 알파벳이 포함
// (?=.*[0-9]): 최소 1개의 숫자가 포함
// .{6,}: 최소 6자리 이상(특수문자도 허용)
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

interface FormType {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  bio?: string;
}

function SignUp() {
  const { user } = useAuthContext();
  const [form, setForm] = useState<FormType>({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    bio: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const { email, password, passwordConfirm, bio, username } = form;

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim().length < 2) {
      toast.error('이름은 두 글자 이상 입력해 주세요');
      nameRef.current?.focus();
      return;
    }

    if (!passwordRegex.test(password) || !passwordRegex.test(passwordConfirm)) {
      toast.error('패스워드는 숫자,영문 조합으로 6자리 이상 입력해 주세요');
      passwordRef.current?.focus();
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('패스워드 확인 해주세요.');
      passwordConfirmRef.current?.focus();
      return;
    }
    setIsSubmit(true);

    try {
      const options = {
        username,
        bio,
      };

      await signUpUser(email, password, options);

      setIsSubmit(false);
      setForm({
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        bio: '',
      });
      toast.success('회원가입에 성공했습니다.');
      navigate('/signin');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <form className="form-group" onSubmit={onSubmitHandler}>
      <Input
        id="input-name"
        label="이름"
        type="text"
        name="username"
        value={username}
        onChange={onChangeHandler}
        autoComplete="off"
        required
        ref={nameRef}
      />
      <Input
        id="input-email"
        label="이메일"
        placeholder="example@example.com"
        type="email"
        name="email"
        value={email}
        onChange={onChangeHandler}
        autoComplete="off"
        required
      />
      <Input
        id="input-password"
        label="비밀번호"
        placeholder="숫자,영문 조합으로 6자리 이상 입력"
        type="password"
        name="password"
        value={password}
        onChange={onChangeHandler}
        autoComplete="off"
        required
        ref={passwordRef}
      />
      <Input
        id="input-password-confirm"
        label="비밀번호 확인"
        placeholder="숫자,영문 조합으로 6자리 이상 입력"
        type="password"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={onChangeHandler}
        autoComplete="off"
        required
        ref={passwordConfirmRef}
      />
      <label className="textarea-bio-label" htmlFor="input-bio">
        소개
      </label>
      <textarea
        id="input-bio"
        className="textarea-bio"
        name="bio"
        value={bio}
        onChange={onChangeHandler}
        autoComplete="off"
        rows={4}
      />
      <Button
        type="submit"
        label={isSubmit ? '가입중...' : '회원가입'}
        disabled={isSubmit}
        aria-disabled={isSubmit}
      />
    </form>
  );
}

export default SignUp;
