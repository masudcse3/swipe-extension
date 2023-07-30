
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import edit from '../../public/edit.svg'
import budgetBox from '../../public/budgetBox-1.svg'
import { useNavigate } from "react-router-dom";
import back from '../../public/back.svg'

function header() {
  const navigate = useNavigate();

  const onNext = (e:any) => {
    navigate("/spent");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
  return (
    <>
        <main className="main-container">
      <header className="brand-container flex">
      <div className="go-back" style={{top:"-15px",marginLeft:"-30px"}} onClick={(e) => {
             navigate("/addprosperity");
            }}>
            <img src={back} alt="go Back" />
        </div>
        <div className="brand-img pointer">
          <img src={logo} alt="" />
        </div>
        <div className="menu pointer"><img src={menu} alt="" /></div>
        <div className="cross-ico pointer">
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
      </header>
      <section className="main-section" style={{marginTop:"-20px"}}>
        <p className="title center font-5">We wish you Prosperity</p>
        <div className="budget-containet">
          <p className="budget-title center font-4">Left for today</p>
         
          <div className="budget-box-290">
          <img src={budgetBox} alt="" />
            <div className="budget-rapper flex"><p>$200</p></div>
          </div>
        </div>
        <div className="budget-containet">
          <p className="budget-title center font-4">Left for this week</p>
          <div className="budget-box-290">
          <img src={budgetBox} alt="" />
         
            <div className="budget-rapper flex"><p>$200</p></div>
          </div>
        </div>
        <div className="budget-containet">
          <p className="budget-title center font-4">Left for this month</p>
          <div className="budget-box-290">
          <img src={budgetBox} alt="" />
            <div className="budget-rapper flex"><p>$200</p></div>
          </div>
        </div>
        <button className="notify-btn font-6 center pointer" onClick={(e) => {onNext(e)}}>
          Show me how to get Wealthier
        </button>
      </section>
    </main>
    </>
  )
}

export default header
