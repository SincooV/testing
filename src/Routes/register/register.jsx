
import './register.css'
import TunnelEffect from '../../components/intro/TunnelEffect';
import Navbar from '../../components/Navbar/Navbar';
import Form from '../../components/Form/Form'
import Stars from '../../components/Stars/Stars'
import { useEffect } from 'react';
import Webcam from '../../components/Webcam/Webcam';
function Maintenance() {
  useEffect(() => {
    document.body.classList.add('register-background');

    return () => {
      document.body.classList.remove('register-background');
    };
  }, []);

  return (
    <>
    
   
    <Navbar/>
    <br></br>
    <Form></Form>

    <Webcam></Webcam>
    <Stars/>
   
    </>
  )
}

export default Maintenance
