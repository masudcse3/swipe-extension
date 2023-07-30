
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
import back from '../../public/back.svg'
import ServiceStore from "../util/ServiceStore";

import { useNavigate ,generatePath } from "react-router-dom";
import Dropdown from "./Dropdown";
function Messages() {
  const navigate = useNavigate();
  
  const [MessgaeList, setMessgaeList] = useState([]);
  const onNext = (item:any) => {
    const id  = item._id
     navigate("/userDetails/"+id);
  

  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
React.useEffect(() => {
 
  getAlldata()
  
}, []);
const getAlldata = () => {
  const usertoken = localStorage.getItem("accessToken")
   const user =   JSON.parse(usertoken) 
   const data = {"userId":user.data._id}
   new ServiceStore().GetDataBYFilter('usermessage/GetAllmessgsge',{"webuserID":user.data.webuserID,userId:user.data._id}).then((res:any) => {
      console.log("::::::::::",res.data)
      setMessgaeList(res.data)
   })
      
      
  
    
  }
  return (
    <>
    
     <main className="main-container">
      <header className="brand-container flex">
      {/* <div className="go-back backto-go" style={{top:"-15px",marginLeft:"-30px"}} onClick={(e) => {
             navigate("/wealthier");
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
      <section className="mx-4 h-auto">
        <p className="title center font-5 mr-0">Messages to help you become wealthier</p>
        <div className="input-field flex">
          <span className="search-icon">
            <img src={search} alt="" />
          </span>
          <input type="text" className="search" placeholder="Search" />
          <span className="controller">
            <img src={control} alt="" />
          </span>
        </div>
        {MessgaeList.length  > 0  &&  
        MessgaeList.map((item) => {
                  // var days = setDeadlineDays(item.createdAt);
                  return (
                  <div className="user-container flex-between" key={item._id} onClick={(e) => {onNext(item)}}>
                    <div className="user-img-container flex item-center">
                      <div className="user-img">
                        <img src={user1} alt="" />
                      </div>
                      <div>
                        <p className="user-name">{item.name}</p>
                        <p className="user-msg">hello,your daily Purchases ...</p>
                      </div>
                    </div>
                    <div className="end">
                      <p className="time">{new Date(item.createdAt).toLocaleDateString()}</p>
                      {/* <p className="active-chat flex">2</p> */}
                    </div>
                  </div>
                  )}) 
    }

       
      </section>
    </main>
    </>
  )
}

export default Messages
