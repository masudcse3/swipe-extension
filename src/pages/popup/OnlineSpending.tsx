
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import slide1 from '../../public/slide-1.png'
import { useNavigate } from "react-router-dom";
import back from '../../public/back.svg'


function OnlineSpending() {
  const navigate = useNavigate();

  const onNext = (e:any) => {
    navigate("/swipemoney");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
  return (
    <>


<div className="main">
  
      <div className="header">
          {/* <div className="go-back" onClick={(e) => {
             navigate("/overSpending");
            }}>
          <img src={back} alt="go Back" />
        </div> */}
        <div className="logo-271" >
          <img src={logo} width="67" alt="logo" />
        </div>
        <div className="menu-header">
          {/* <img src={menu} alt="menu" className="menu" /> */}
          <img src={closes} alt="close" className="close" onClick={(e) => {onclose(e)}}/>
        </div>
      </div>
      <div className="container">
        <div className="slider-img">
          <img src={slide1} alt="slider" className="cash" />
        </div>
        <div className="slider-title w75">
          <h2>Be in control of your online spending</h2>
        </div>
        <div className="list">
          <div className="number">1</div>
          <div className="des">
            <p>Rescue your money to gain prosperity</p>
          </div>
        </div>
        <div className="list">
          <div className="number">2</div>
          <div className="des">
            <p>Monitor and control your online spending</p>
          </div>
        </div>
        <div className="list">
          <div className="number">3</div>
          <div className="des">
            <p>We make it as simple as 1, 2, 3</p>
          </div>
        </div>
        <button className="btn mt-32" onClick={(e) => {
              onNext(e)
             
            }}>Next</button>

        <div className="bullet-points">
          <div className="point"></div>
          <div className="point active"></div>
          <div className="point"></div>
          <div className="point"></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default OnlineSpending
