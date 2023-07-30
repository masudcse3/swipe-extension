
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


function ResetPassword() {
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
    const data = {email: formState.email,password:pwdInput.password}
    new ServiceStore().InsertData('swipeuserlogin',data).then((res:any) => {
    if(res){
      console.log("res",res)
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
          <h2>Reset Your Password</h2>
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
             
              
            </div>
            <button type="submit" className="btn active" >
                    Send Password Reset
            </button>
           
          </form>
          <div className="forgot log-in" onClick={(e) => {
             navigate("/login");
            }}>
        <a >Back</a>
      </div>
        </div>

       
      </div>
    </div>
    </>
  )
}

export default ResetPassword
