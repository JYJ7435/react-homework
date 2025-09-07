import supabase from '@/libs/supabase';

export async function signUpUser(
  email: string,
  password: string,
  options: { bio?: string; username: string }
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...options,
      },
    },
  });

  if (error) throw new Error(`회원가입 에러 발생 : ${error.message}`);

  const userId = data.user?.id;
  const metaData = data.user?.user_metadata;

  if (userId && metaData) {
    const { error } = await supabase.from('profiles').insert({
      id: userId,
      email: metaData.email,
      username: metaData.username,
      bio: metaData.bio,
      created_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error(`프로필 저장 에러 : ${error.message}`);
    }
  }
}

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`로그인 에러 발생: ${error.message}`);
  }

  return { data };
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(`로그아웃 에러 발생: ${error.message}`);
}

export async function updateProfileUser(
  userId: string,
  update: {
    username?: string;
    bio?: string;
  }
) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...update })
    .eq('id', userId)
    .select('username,email,bio,id')
    .single();

  if (error) throw new Error(`프로필 수정 에러 발생: ${error.message}`);

  return data;
}

export async function fetchUserProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('username, email, bio, id')
    .eq('id', userId)
    .single();
}
