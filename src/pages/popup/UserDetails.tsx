
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import edit from '../../public/edit.svg'
import banner from '../../public/banner.png'
import search from '../../public/search.svg'
import control from '../../public/control.svg'

import user1 from '../../public/user-1.png'

import user2 from '../../public/user-2.png'
import ServiceStore from "../util/ServiceStore";

import { useNavigate ,useParams } from "react-router-dom";
import back from '../../public/back.svg'
import Dropdown from "./Dropdown";
function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [MessgaeDetails, setMessgaeDetails] = useState({});


React.useEffect(() => {
  console.log("id:::::::::::::::;",id)
  if(id != undefined){
    new ServiceStore().GetDataByID('usermessage/',id).then((res:any) => {
      console.log("res",res.data)
      setMessgaeDetails(res.data)
    })
  }
  
}, []);
  const onNext = (e:any) => {
    navigate("/availablemoney");
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
             navigate("/messages");
            }}>
            <img src={back} alt="go Back" />
        </div> */}
        <div className="brand-img pointer">
          <img src={logo} alt="" className="mr-40"/>
        </div>
        {/* <div className="menu pointer">
          <img src={menu} alt="" />
        </div> */}
        <Dropdown></Dropdown>
        <div className="cross-ico pointer cross-mt">
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
      </header>
      <section className="main-section"  >
      <div className="setsection">
        <p className="title center font-5 mr-0" >Messages to help you become wealthier</p>
        <div className="user-details">
          <div className="flex user-container-293">
            <div><p className="arrow flex pointer">&#129168;</p></div>
            <div className="user-img">
              <img src={user1} alt="" />
            </div>
            <p className="user-name">{MessgaeDetails.name}</p>
          </div>
          <hr />
          <div className="mt-16">
            <p className="user-msg">Hello {MessgaeDetails.name}</p>
            <p className="user-msg">
              {MessgaeDetails.message}
            </p>
            {/* <p className="user-msg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p> */}
            {/* <p className="user-msg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p> */}
          </div>
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

export default UserDetails
