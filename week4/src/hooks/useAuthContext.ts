import React, { createContext, useContext } from 'react';
import { ProfilePartial } from '@/libs/supabase';

interface AuthContextType {
  user: ProfilePartial | null;
  setUser: React.Dispatch<React.SetStateAction<ProfilePartial | null>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const useAuthContext = () => useContext(AuthContext);
