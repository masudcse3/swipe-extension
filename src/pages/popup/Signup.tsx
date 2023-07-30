
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import back from '../../public/back.svg'
import closes from '../../public/close.svg'
import eye from '../../public/eye.svg'
import { AiOutlineEyeInvisible ,AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from './PasswordStrengthMeter';
import {API_URL} from "../util/Constant";
import ServiceStore from "../util/ServiceStore";


function Signup() {
  const navigate = useNavigate();
  const [passState, setPassState] = useState(false);
  const [websiteuserid, setwebsiteuserid] = useState("");

  
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
    new ServiceStore().InsertData('swipeuserlogin',data).then((res:any) => {
    if(res){
      localStorage.setItem("accessToken", JSON.stringify(res.message));
      // new ServiceStore().InsertData('shoapweekly',{"shopWeeklymaxrange":"10","shopWeeklylimit":"5","userId":res.message.data._id}).then((res:any) => {
      //   if(res){
      //     console.log("res",res)
      //   }
      //   });

      new ServiceStore().InsertData('monitor',{"purchasemaxrang":"100","purchaselimit":"50","userId":res.message.data._id}).then((res:any) => {
        if(res){
          console.log("res",res)
        }
        });

        new ServiceStore().InsertData('swipeaddpurchase',{"purchasemaxrang":"10","purchaselimit":"5","needmaxrang":"10","needlimit":"5","userId":res.message.data._id}).then((res:any) => {
          if(res){
            console.log("res",res)
          }
          });
      const dataobj = {"montlymaxrang":"1800","weeklymaxrang":"600","dailymaxrang":"90","dailylimit":"60","weeklylimit":"400","monthlylimit":"1200","userId":res.message.data._id}
      new ServiceStore().InsertData('swipesetnotification',dataobj).then((res:any) => {
        if(res){
          console.log("res",res)
          navigate("/overSpending");
        }
        });
        
      // navigate("/overSpending");
    }
    });
     
  }

  console.log("ddddddd")
  return (
    <>
  <div className="main">
      <div className="header">
        <div className="go-back" onClick={(e) => {
             navigate("/*");
            }}>
          <img src={back} alt="go Back" />
        </div>
        <div className="title">
          <h2>Join with Email</h2>
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
            <PasswordStrengthMeter password={pwdInput.password} actions={initPwdInput} />
            <div className="check-strong">
              <ul>
                <li>Upper and lowercase letters</li>
                <li>Between 8 and 64 characters</li>
                <li>Contains a number and a symbol</li>
              </ul>
            </div>
            <div className="agree-terms">
              <input type="checkbox" name="terms" id="terms" onChange={handleChange}/>
              <p>I’m at least 18 years old and agree to the following terms</p>
            </div>
            <div className="privacy">
              <p>
                I have read and agree to the
                <a href="#" className="link">SwipeSwipe</a> policy, which provides
                that SwipeSwipe is an online service and that I will receive all
                account notices and information electronically. I understand
                that to continue, PayPal will share name and email address with
                us. I have also read and agree to the SwipeSwipe
                <a href="#" className="link">Terms of Service</a> and
                <a href="#" className="link">Privacy Policy</a>
              </p>
            </div>

            <div className="submit-btn">
              {checked == false && 
                <button type="button" className="btn-279 mt-24" >
                  Agree & Complete Sign Up
                </button>
              }
               {checked == true && 
                <button type="submit" className="btn mt-24 active" >
                    Agree & Complete Sign Up
                  </button>
               }
            </div>
          </form>
        </div>

        <div className="member top-16">
          <span>Already a member?</span>
          <span className="log-in" onClick={(e) => {navigate("/login")}}> <a >Log in</a></span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup
