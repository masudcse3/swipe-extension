
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import sideIco from '../../public/sideIco.svg'
import banner from '../../public/banner.jpg'
import Union from '../../public/Union.svg'
import control from '../../public/control.svg'

import user1 from '../../public/user-1.png'

import user2 from '../../public/user-2.png'

import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
function Savings() {
  const navigate = useNavigate();

  const onNext = (e:any) => {
    navigate("/dailyReport");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
  return (
    <>
         <main className="main-container">
      <header className="brand-container flex">
        <div className="brand-img pointer">
          <img src={logo} alt="" className="mr-40"/>
        </div>
        {/* <div className="flex gap-16 pointer">
          <img src={menu} alt="" />
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div> */}
       <div className="dropdowmt">
        <Dropdown></Dropdown>
        </div>
         <div className="pointer cros-mt">
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
      </header>
      <section className="main-section">
      <div className="setsection">
        <p className="text-primary-273">
          Did you know that many times we buy based on emotion and not value and
          need
        </p>
        <div className="banner-273 flex-center">
          <img src={banner} alt="" />
        </div>
        <p className="text-primary-273 font-4">
          One of the best habits to spend on what you need is to create a list
          of what you want to buy everyday
        </p>
        <p className="text-secondary-273 p-8">
          If something is not on that list Put it on tomorrow's list
        </p>
        <p className="text-primary-273">You might be surprised by the savings :</p>
        </div>
        <button className="notify-btn font-6  center pointer" onClick={(e) => {onNext(e)}}>
          Have a Great Life!
        </button>
      </section>
    </main>
    </>
  )
}

export default Savings
