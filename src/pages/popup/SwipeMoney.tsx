
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import slide2 from '../../public/slide-2.png'
import { useNavigate } from "react-router-dom";
import back from '../../public/back.svg'


function SwipeMoney() {
  const navigate = useNavigate();

  const onNext = (e:any) => {
    navigate("/financial");
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
             navigate("/onlinespending");
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
      <div className="container" >
        <div className="slider-img">
          <img src={slide2} alt="slider" className="cash" />
        </div>
        <div className="slider-title w90">
          <h2>Keep more of your money for what matters</h2>
        </div>
        <div className="list">
          <div className="number">1</div>
          <div className="des">
            <p>Gain financial independence by spending smarter</p>
          </div>
        </div>
        <div className="list">
          <div className="number">2</div>
          <div className="des">
            <p>Build wealth and buy what has value for you</p>
          </div>
        </div>
        <div className="list">
          <div className="number">3</div>
          <div className="des">
            <p>Our shopping radar, limits and notifications will guide you</p>
          </div>
        </div>
        <button className="btn" onClick={(e) => {
              onNext(e)
            }}>Next</button>

        <div className="bullet-points">
          <div className="point"></div>
          <div className="point"></div>
          <div className="point active"></div>
          <div className="point"></div>
        </div>
      </div>
    </div>
 
    </>
  )
}

export default SwipeMoney
