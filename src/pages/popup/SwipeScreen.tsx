
import React ,{useState}from "react";
import '../style/main.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import logo from '../../public/main-logo.png'
import google from '../../public/google.svg'
import closes from '../../public/close.svg'
import facebook from '../../public/facebook.svg'
import paypal from '../../public/paypal.svg'
import apple from '../../public/apple.svg'
import email from '../../public/email.svg'
import { useNavigate } from "react-router-dom";
import ServiceStore from "../util/ServiceStore";
import uuid from 'react-native-uuid';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useGoogleLogin } from "react-google-login";
const clientId =
  '918034318673-i5egsvp94pkoq6dic34d972g6k60g8ko.apps.googleusercontent.com';
function SwipeScreen() {
 
  const navigate = useNavigate();
  const [ user, setUser ] = useState([]);
  var uniqueID = uuid.v4()
  var data = {"userId": uniqueID}
  chrome.storage.sync.get(['key', 'value'], function(items) {
    console.log('Settings retrieved', Object.keys(items).length);
    if(Object.keys(items).length == 0){
      new ServiceStore().InsertData('user',data).then((res:any) => {
         chrome.storage.sync.set({'key': 'swipe-session','value': res.message}, function() {
            console.log('Session emit');
          });
          localStorage.setItem('swipe-session', JSON.stringify(res.message));
      })
    }else{
      localStorage.setItem('swipe-session', JSON.stringify(items.value));

    }
    let storage = localStorage.getItem("swipe-session");
    console.log("storage ::: ", storage);
    if(!storage) localStorage.setItem(items.key, JSON.stringify(items.value));
  });
  if(localStorage.getItem("swipe-session")) {
    let storage = localStorage.getItem("swipe-session");
    console.log("emit session id ::: ", storage)
    // chrome.storage.sync.set({'value': storage}, function() {
    //   console.log('Session emit');
    // });
  }

  const onSuccess = (res:any) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
  };

  const onFailure = (res:any) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz ${res}`
    // );
  };
  // const { signIn } = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   clientId,
  //   cookiePolicy: "single_host_origin",
  // });
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  const onNext = (e:any) => {
    navigate("/signup");
  };
  console.log("ddddddd")
  const responseFacebook = (response:any) => {
    console.log(response);
  }

  const responseGoogle = (response:any) => {
    console.log("response",response);
  }
  const onclose = (e:any) => 
    window.close();{
  };
  return (
    <>


<div className="main-278">
      <div className="header flex-row">
        <img className="logo" alt="" src={logo} />
        <img className="close-icon" alt="" src={closes} onClick={(e) => {onclose(e)}}/>
      </div>
      <div className="title-278">
        <h2>Join Swipe Swipe</h2>
      </div>
      <div className="social-container" >
        <div className="social-row" onClick={signIn}>
          <div className="icon">
            <img src={google} alt="Google" />
          </div>
          <div className="social-link"><a href="#">Join with Google</a></div>
        </div>
        
        <div className="social-row">
          <div className="icon">
            <img src={facebook} alt="Facebook" />
          </div>
          <div className="social-link"><a href="#">Join with Facebook</a></div>
        </div>
        <div className="social-row">
          <div className="icon">
            <img src={paypal} alt="Paypal" />
          </div>
          <div className="social-link"><a href="#">Join with Paypal</a></div>
        </div>
        <div className="social-row">
          <div className="icon">
            <img src={apple} alt="Apple" />
          </div>
          <div className="social-link"><a href="#">Join with Apple</a></div>
        </div>
        <div className="social-row" onClick={(e) => {
              onNext(e)
            }}>
          <div className="icon">
            <img src={email} alt="Email" />
          </div>
          <div className="social-link"><a href="#">Join with Email</a></div>
        </div>
      </div>

      <div className="member top-80">
        <span>Already a member?</span>
        <span className="log-in" onClick={(e) => {navigate("/login")}}> <a>Log in</a></span>
      </div>
    </div>
    </>
  )
}

export default SwipeScreen
