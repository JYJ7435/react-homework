import SignIn from './components/signin/signin';
import SignUp from './components/signup/signup';
import './App.css';

function App() {
  return (
    <section className="app">
      <h1>리액트 2주차 과제</h1>
      <div className="container">
        <div>
          <h2>로그인</h2>
          <SignIn />
        </div>
        <div>
          <h2>회원가입</h2>
          <SignUp />
        </div>
      </div>
    </section>
  );
}

export default App;
