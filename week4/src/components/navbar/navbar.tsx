import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { signOutUser } from '@/api/user';
import { useAuthContext } from '@/hooks/useAuthContext';
import './navbar.css';

function Navbar() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const onClickHandler = async () => {
    try {
      await signOutUser();
      toast.success('로그아웃 되었습니다.');
      navigate('/signin');
    } catch (error) {
      toast.error(`로그아웃 에러! ${(error as Error).message}`);
    }
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <Link
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          to="/"
        >
          홈
        </Link>
        {!user ? (
          <>
            <Link
              className={`nav-item ${location.pathname === '/signup' ? 'active' : ''}`}
              to="/signup"
            >
              회원가입
            </Link>
            <Link
              className={`nav-item ${location.pathname === '/signin' ? 'active' : ''}`}
              to="/signin"
            >
              로그인
            </Link>
          </>
        ) : (
          <>
            <button className="nav-item logout-btn" onClick={onClickHandler}>
              로그아웃
            </button>
          </>
        )}
        {user && (
          <Link
            className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
            to="/profile"
          >
            프로필
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
