
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import edit from '../../public/edit.svg'
import banner from '../../public/banner.png'
import { useNavigate } from "react-router-dom";
import back from '../../public/back.svg'
import Dropdown from "./Dropdown";
function AddProsperity() {
  const navigate = useNavigate();

  const onNext = (e:any) => {
    navigate("/wealthier");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
  return (
    <>

      <main className="main-container">
      <header className="brand-container flex">
      {/* <div className="go-back backto-go"  onClick={(e) => {
             navigate("/addstore");
            }}>
            <img src={back} alt="go Back" />
        </div> */}
        <div className="brand-img pointer">
          <img src={logo} alt="" className="mr-40"/>
        </div>
        {/* <div className="menu pointer"><img src={menu} alt="" /></div> */}
        <Dropdown></Dropdown>
        <div className="cross-ico pointer cross-mt">
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
      </header>
      <section className="main-section" >
      <div className="setsection">
        <p className="title center font-6">You are all set!</p>
        <p className="title center font-6 pt-16">
          You are on you way to Prosperity!
        </p>
        <div className="banner-img-291">
        <img src={banner} alt="" />
        </div>
        </div>
        <button className="notify-btn font-6 center pointer" onClick={(e) => {onNext(e)}}>
          I will be Prosperous
        </button>
      </section>
    </main>
    </>
  )
}

export default AddProsperity
