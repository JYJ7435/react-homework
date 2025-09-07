import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import './App.css';
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

export default App;
