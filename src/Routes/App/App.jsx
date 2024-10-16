import { useEffect } from 'react';
import './App.css';
import Stars from '../../components/Stars/Stars';
import Navbar from '../../components/Navbar/Navbar';

function App() {
  useEffect(() => {
    document.body.classList.add('app-background');

    return () => {
      document.body.classList.remove('app-background');
    };
  }, []);

  return (
    <>
      <Navbar />
      <Stars />
    </>
  );
}

export default App;
