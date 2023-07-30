
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/main-logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
 
import slide3 from '../../public/slide-3.png'
import { useNavigate } from "react-router-dom";
import back from '../../public/back.svg'

function Financial() {

  const navigate = useNavigate();

  const onNext = (e:any) => {
    navigate("/notification");
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
             navigate("/swipemoney");
            }}>
            <img src={back} alt="go Back" />
        </div> */}
        <div className="logo-271" >
          <img src={logo} width="67" alt="logo" />
        </div>
        <div className="menu-header">
          {/* <img src={menu} alt="menu" className="menu" /> */}
          <img src={closes} alt="close" className="close"  onClick={(e) => {onclose(e)}}/>
        </div>
      </div>
      <div className="container" >
        <div className="slider-img">
          <img src={slide3} alt="slider" className="cash" />
        </div>
        <div className="slider-title w70">
          <h2>Get financial freedom you deserve</h2>
        </div>
        <div className="list">
          <div className="number">1</div>
          <div className="des">
            <p>Grow your money and reach your goals</p>
          </div>
        </div>
        <div className="list">
          <div className="number">2</div>
          <div className="des">
            <p>Stop being stressed about money and future</p>
          </div>
        </div>
        <div className="list">
          <div className="number">3</div>
          <div className="des">
            <p>Build good money habits with our tools for life</p>
          </div>
        </div>
        <button className="btn" onClick={(e) => {
              onNext(e)
              
            }}>Next</button>

        <div className="bullet-points">
          <div className="point"></div>
          <div className="point"></div>
          <div className="point"></div>
          <div className="point active"></div>
        </div>
      </div>
    </div>
 
    </>
  )
}

export default Financial
