import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { updateProfileUser } from '@/api/user';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import { useAuthContext } from '@/hooks/useAuthContext';
import { ProfilePartial } from '@/libs/supabase';

function Profile() {
  const { user, setUser, loading } = useAuthContext();
  const [modify, setModify] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState<ProfilePartial>({
    username: user?.username ?? '',
    email: user?.email ?? '',
    bio: user?.bio ?? '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        bio: user.bio,
      });
    }

    if (!user && !loading) {
      navigate('/');
    }
  }, [loading, navigate, user]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmit(true);
    try {
      const profile = await updateProfileUser(user.id!, {
        username: form.username ?? '',
        bio: form.bio ?? '',
      });

      setUser(profile);
      setIsSubmit(false);
      setModify(false);
      toast.success('프로필 수정이 완료 되었습니다.');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  if (loading) return <h1>로딩중....</h1>;

  return (
    <form className="form-group" onSubmit={onSubmitHandler}>
      <Input
        id="profile-email"
        label="이메일"
        type="email"
        value={form.email}
        readOnly
        name="email"
        autoComplete="off"
      />
      <Input
        id="profile-name"
        label="이름"
        type="text"
        value={form.username ?? ''}
        readOnly={!modify}
        onChange={onChangeHandler}
        name="username"
        autoComplete="off"
      />
      <label className="textarea-bio-label" htmlFor="input-bio">
        소개
      </label>
      <textarea
        id="input-bio"
        className="textarea-bio"
        name="bio"
        value={form.bio ?? ''}
        readOnly={!modify}
        onChange={onChangeHandler}
        autoComplete="off"
        rows={4}
      />
      {modify ? (
        <div
          className="form-btn-group"
          style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
        >
          <Button
            label="취소"
            type="button"
            onClick={() => {
              setModify(false);
            }}
          />
          <Button
            type="submit"
            label={isSubmit ? '수정중...' : '제출'}
            disabled={isSubmit}
            aria-disabled={isSubmit}
          />
        </div>
      ) : (
        <Button
          label="수정"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setModify(true);
          }}
        />
      )}
    </form>
  );
}

export default Profile;
