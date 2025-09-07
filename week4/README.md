# React 4주차 과제

멋사 프론트엔드 14기 4주차 과제 문서입니다. <br/>
Bun + Vite + React + TypeScript로 구성된 템플릿 입니다.

```
bun create JYJ7435/react-ts-vite
```

React Router, Sonner Toast 라이브러리 사용 하였습니다.

## 목차

- [라우트 설정](#라우트-설정)
- [Context API](#context-api)
- [App.tsx](#apptsx)
- [4주차 회고](#4주차-회고)

## 라우트 설정

- React Router 라이브러리의 createBrowserRouter메서드를 사용하여 페이지 설정
- 잘못된 경로로 접근시 NotFound페이지를 화면에 렌더링

```tsx
// src/routes/route.tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);
```

- main.tsx파일에 RouterProvider를 이용하여 라우트 설정

```tsx
// main.tsx
import { router } from './routes/route';

const root = document.getElementById('root');
if (!root) throw new Error('문서에 #root 요소가 존재하지 않습니다.');

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

## Context API

- 데이터를 효율적으로 관리하고 전달하기 위해 사용

```tsx
// src/hooks/useAuthContext.ts
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

// src/context/auth-context.tsx
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
```

## App.tsx

- `<Outlet>`을 사용하여 `<App>`의 자식 라우트를 렌더링
- `AuthContextProvider`으로 Context를 사용하는 자식 컴포넌트들에게 데이터를 제공

```tsx
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import Navbar from './components/navbar/navbar';
import AuthContextProvider from './context/auth-context';

function App() {
  return (
    <AuthContextProvider>
      <div className="app">
        <Navbar />
        <Toaster position="top-center" duration={2000} />
        <Outlet />
      </div>
    </AuthContextProvider>
  );
}
```

## 4주차 회고

매번 과제를 수행할때마다 아쉬움이 있었는데 이번주는 더 크게 남는것 같습니다.
Supabase 인증 특성상 로그인시 LocalStorage에 토큰이 저장되는데 페이지 새로고침시에 유저 정보를 유지하지 못하는 문제가 있었습니다. 인증구독 로직을 구성했음에도 원하는대로 동작 하지 않아 많은 시간을 소모하였고, 구현하고 싶었던 대시보드 페이지를 손도 못된점, 코드 정리, 문서 정리 등... 그저 아쉬움만 남습니다.<br/>
자바스크립트의 비동기 함수 작성, 처음 접하는 라이브러리를 공식 문서를 참고하여 구현 하는 부분에서 어느정도 자신감이 있었지만 많은 부족함을 느낀 이번 과제 였습니다.<br/>
비동기 처리의 기본적인 원리를 제대로 이해하지 못해 생긴 결과라 생각하고 강사님과 수행한 예제, 과제등 다시 한번 작성해보며 복습할 필요성을 느낀 그런 과제 였습니다.
