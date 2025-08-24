import SignIn from './components/signin/signin';
import SignUp from './components/signup/signup';
import './App.css';

function App() {
  // (?=.*[a-zA-Z]): 최소 1개의 영문 알파벳이 포함
  // (?=.*[0-9]): 최소 1개의 숫자가 포함
  // .{6,}: 최소 6자리 이상(특수문자도 허용)
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

  return (
    <section className="app">
      <h1>리액트 2주차 과제</h1>
      <div className="container">
        <div>
          <h2>로그인</h2>
          <SignIn regex={passwordRegex} />
        </div>
        <div>
          <h2>회원가입</h2>
          <SignUp regex={passwordRegex} />
        </div>
      </div>
    </section>
  );
}

export default App;
