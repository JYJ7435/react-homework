import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '@/api/user';
import { AuthContext } from '@/hooks/useAuthContext';
import supabase, { ProfilePartial } from '@/libs/supabase';

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<ProfilePartial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    supabase.auth.getUser().then(async ({ error, data }) => {
      if (error || !data.user) {
        setLoading(false);
        setUser(null);
        return;
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN': {
          const user = session?.user;

          if (user) {
            fetchUserProfile(session.user.id)
              .then(({ data }) => {
                setUser(data);
              })
              .catch((error) => {
                console.log(error);
                setUser(null);
              })
              .finally(() => {
                setLoading(false);
              });
          }

          break;
        }
        case 'SIGNED_OUT':
          setUser(null);
          setLoading(false);
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
