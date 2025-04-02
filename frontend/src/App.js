import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import OtpInput from 'otp-input-react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from './Firebase.config';
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth"

function App() {
  const [otp,setOtp]=useState("")
  const [ph,setPh]=useState(false)
  const [showOtp,setShowOtp]=useState(false)
  const [user,setUser]=useState(null)
  const [cartitems,setCartitems]=useState([]);

  function onVerify(){
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup()
        },
        'expired-callback': () => {}
       
      },
      auth
    );
    }
  }
const onSignup=()=>{
  onVerify()

  const appVerifier=window.recaptchaVerifier
  const formatph='+'+ph
  
  signInWithPhoneNumber(auth,formatph, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setShowOtp(true)
      toast.success("otp sent")
    }).catch((error) => {
      console.log(error)
    });
}

const onOTPVerify=()=>{
  window.confirmationResult.confirm(otp)
  .then(async(res)=>{
    console.log(res)
    setUser(res.user)
    toast.success("login")
  })
}


  return (
    <div className="App"> 
    <div>
    <div></div>
      {user?<h2>Login Success</h2>:
      <div>
      <label>Enter otp</label>
      <PhoneInput country={"in"} value={ph} onChange={setPh}></PhoneInput>
      <button onClick={onSignup}>send otp</button>
      <OtpInput 
        OTPLength={6} 
        otpType="number" 
        disabled={false} 
        autoFocus
        value={otp}
        onChange={setOtp}
      >
      </OtpInput>
      <button onClick={onOTPVerify}>
          <span>verify otp</span>
      </button>
      </div>
      
      }
      </div>
      <Router>
        <ToastContainer theme='dark' position='top-center' />
      <Header cartitems={cartitems}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Home />} />
          <Route path='/products/:id' element={<ProductDetails cartitems={cartitems} setCartitems={setCartitems}/>} />
          <Route path='/cart' element={<Cart cartitems={cartitems} setCartitems={setCartitems} />} />
        </Routes>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
