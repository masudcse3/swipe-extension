
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import back from '../../public/back.svg'
import closes from '../../public/close.svg'
import eye from '../../public/eye.svg'
import google from '../../public/google.svg'
import facebook from '../../public/facebook.svg'
import paypal from '../../public/paypal.svg'
import apple from '../../public/apple.svg'
import email from '../../public/email.svg'
import { AiOutlineEyeInvisible ,AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from './PasswordStrengthMeter';
import {API_URL} from "../util/Constant";
import ServiceStore from "../util/ServiceStore";


function Login() {
  const navigate = useNavigate();
  const [passState, setPassState] = useState(false);
  const [password, setPassword] = useState({});
  const [pwdInput, initValue] = useState({
    password: "",
  });
  const [formState, setFormState] = React.useState({
    email: "",
    password: ""
  })
  const [isError, setError] = useState("");
  const [isEmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [websiteuserid, setwebsiteuserid] = useState("");
  const [LoginError, setLoginError] = useState("");
  
  React.useEffect(() => {
    setTimeout(function() {
      // chrome.windows.getCurrent(w => {
      //   console.log("w::: ", w)
      //   chrome.tabs.query({active: true, windowId: w.id}, async  tabs => {
      //     console.log("tabs::: ", tabs)
      //     const tab = tabs[0];
      //     // use tabId here...
      //     let tabId = tab.id || 0;
      //     let key = "swipe-session";
      //     const fromPageLocalStore = await chrome.tabs.executeScript(tabId, { code: `localStorage['${key}']` });
      //     console.log("fromPageLocalStore ::: ", fromPageLocalStore);
          
      //   });
        chrome.tabs.query({active:true}, function(tabs) {
            let tabId = tabs[0].id || 0; 
            // let data : chrome.tabs.executeScript(tabId, {code: 'localStorage.getItem("swipe-session");'});
            
            chrome.tabs.executeScript(tabId, {
              code: 'localStorage.getItem("swipe-session");'
          }, function (data) {
            console.log("data ::: ",JSON.parse(data[0])._id) 
            setwebsiteuserid(JSON.parse(data[0])._id) 
          });
        });
      // });
    }, 5000);
  })
  React.useEffect(() => {
    if(localStorage.getItem("swipe-session")) {
      let storage = localStorage.getItem("swipe-session");
      console.log("emit session id ::: ", storage)
      setwebsiteuserid(JSON.parse(storage)._id) 
      // chrome.storage.sync.set({'value': storage}, function() {
      //   console.log('Session emit');
      // });
    }
  }, []);
  const onChange = (e:any) => {
    let password = e.target.value;
    initValue({
      ...pwdInput,
      password: e.target.value,
    });
    setError("");
    setPasswordError("")
    let caps, small, num, specialSymbol;
    if (password.length < 4) {
      setError("Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &");
      return;
    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;
      if (caps < 1) {
        setError("Must add one UPPERCASE letter");
        return;
      } else if (small < 1) {
        setError("Must add one lowercase letter");
        return;
      } else if (num < 1) {
        setError("Must add one number");
        return;
      } else if (specialSymbol < 1) {
        setError("Must add one special symbol: @$! % * ? &");
        return;
      }
    }
  };
  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData:any) => {
    initRobustPassword(childData);
  };
  const [checked, setChecked] = useState(false);
  const handleChange = () => { 
    setChecked(!checked); 
    
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [type]: e.target.value
    })
    
  }
  const onclose = (e:any) => 
    window.close();{
    // navigate("/overSpending");
  };
  const getErrors = (): string[] => {
    const errors = [];
   
    if (!formState.email) {
      errors.push("Email required");
      setEmailError("Email required")
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.push("Invalid email");
      setEmailError("Invalid email")

    }
    if (!pwdInput.password){
      errors.push("Password required");
      setPasswordError("Password required")
    } 
    return errors;
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = getErrors();
    if (errors.length || isError.length) return;
    const data = {webuserID:websiteuserid,email: formState.email,password:pwdInput.password}
    new ServiceStore().InsertData('swipeuserlogin/checkLogin',data).then((res:any) => {
    if(res){
      // console.log("res::::::::::::::",res)
      if(res.message == 'authentication successful'){
        new ServiceStore().GetDataByID('user/',res.data.data.webuserID).then((res:any) => {
          console.log("res::::::::::::::",res.data)
          chrome.storage.sync.set({'key': 'swipe-session','value': res.data}, function() {
            console.log('Session emit');
          });
          localStorage.setItem('swipe-session', JSON.stringify(res.data));
        })
         localStorage.setItem("accessToken", JSON.stringify(res.data));
         navigate("/notification");

      }else{
        setLoginError("incorrect email or password...")

      }
    

     
    }
    });
     
  }
  const onNext = (e:any) => {
    navigate("/signup");
  };
  console.log("ddddddd")
  return (
    <>
  <div className="main">
      <div className="header">
        <div className="go-back" onClick={(e) => {
             navigate("/signup");
            }}>
          <img src={back} alt="go Back" />
        </div>
        <div className="title">
          <h2>  Sign In </h2>
        </div>
        <div className="close"  onClick={(e) => {onclose(e)}}>
          <img src={closes} alt="Close" />
        </div>
      </div>
      <div className="container">
        <div className="login-form">
          <form  onSubmit={onSubmit}>
            <div className="input-field">
              <input type="email" className="email" placeholder="Email" onChange={(e) => onChangeInput(e, "email")}/>
              <span style={{color:"red"}}>{isEmailError}</span>
              <input  type={passState ? "text" : "password"} className="password" placeholder="Password"  onChange={onChange}/>
              <span style={{color:"red"}}>{PasswordError}</span>
              <span style={{color:"red"}}>{isError}</span>
              <span style={{color:"red"}}>{LoginError}</span>
              
              <a
                   
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className="eye"
                  >
                    {passState == false && 
                    <AiOutlineEyeInvisible size={25} ></AiOutlineEyeInvisible>
                    }
                    {passState == true && 
                    <AiOutlineEye size={25} ></AiOutlineEye>
                    }
                  </a>
            </div>
            {/* <PasswordStrengthMeter password={pwdInput.password} actions={initPwdInput} /> */}
            <button type="submit" className="btn active"  style={{marginTop:"-10px"}}>
                    Sign In
            </button>
            
          </form>
        </div>
        <div className="forgot log-in" onClick={(e) => {
             navigate("/resetpassword");
            }}>
        <a >Forgot Password</a>
      </div>
            <div style={{textAlign:"center"}}>OR</div>
      <div className="social-container" >
        <div className="social-row" >
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
      
      </div>

        <div className="member top-16">
          <span>Not a member?</span>
          <span className="log-in" onClick={(e) => {
             navigate("/signup");
            }}> <a >Sign up</a></span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
