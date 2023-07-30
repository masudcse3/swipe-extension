
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import sideIco from '../../public/sideIco.svg'
import pana from '../../public/pana.png'
import Union from '../../public/Union.svg'
import control from '../../public/control.svg'

import user1 from '../../public/user-1.png'

import user2 from '../../public/user-2.png'
import ball from "../../public/ball.svg"
import ServiceStore from "../util/ServiceStore";

import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
function AddPurchase() {
  const navigate = useNavigate();
  const [datalist, setdatalist] = useState([]);

  const [purchasevalue, setpurchasevalue] = useState("");
  const [purchasemaxrang, setpurchasemaxrang] = useState(10);
  const [purchaseminrang, setpurchaseminrang] = useState(1);

  const [needvalue, setneedvalue] = useState("");
  const [needmaxrang, setneedmaxrang] = useState(10);
  const [needminrang, setneedminrang] = useState(1);
  const onNext = (e:any) => {
    navigate("/savings");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
React.useEffect(() => {
 
  getAlldata()
//     chrome.runtime.sendMessage({
//       info: localStorage['swipe-session'] //get from tab's local storage
//   });
//   chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     console.log("message ::: ", message);
//     // localStorage['swipe-session'] = message.key; //store into extension's local storage
// });
  chrome.storage.local.get('SIEGE_CSD_21a333', function (result) {
    console.log("User is " + JSON.stringify(result)); 
// you can use the variable or set to any state variable from here
});

chrome.storage.local.get(['swipe-session'], function(result) {
  console.log('Value currently is ' + result);
});

chrome.storage.sync.get("swipe-session", function(data) {
console.log("data ::: ", data['swipe-session'])
}) 

  console.log("From Notification :: ", localStorage.getItem('username'))

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
          console.log("data ::: ", data)  
        });
      });
    // });
  }, 5000);

}, []);
const getAlldata = () => {
const usertoken = localStorage.getItem("accessToken")
 const user =   JSON.parse(usertoken) 
 const data = {"userId":user.data._id}
  new ServiceStore().GetDataBYFilter('swipeaddpurchase/Getdatadaliy',data).then((res:any) => {
    if(res){
      console.log("montlymaxrang",res)
      setpurchasevalue(Number(res.data[0].purchaselimit))
      setpurchasemaxrang(Number(res.data[0].purchasemaxrang))
      setneedvalue(res.data[0].needlimit)
      setneedmaxrang(Number(res.data[0].needmaxrang))
  
      setdatalist(res.data)
    }
  });
}
const onChangepurchase = (event:any) => {
  event.preventDefault();
  console.log("event.target.value",event.target.value)
  setpurchasemaxrang(event.target.value)
  const dataobj = {"purchaselimit":event.target.value,id:datalist[0]._id}
    new ServiceStore().UpdateData('swipeaddpurchase/Update/'+datalist[0]._id,dataobj).then((res:any) => {
      getAlldata()
    });
    //  console.log("values",values ,Montlymaxrang)
    
}
const onChangeneedvalue = (event:any) => {
  event.preventDefault();
  console.log("event.target.value",event.target.value)
  setneedmaxrang(event.target.value)
  const dataobj = {"needlimit":event.target.value,id:datalist[0]._id}
    new ServiceStore().UpdateData('swipeaddpurchase/Update/'+datalist[0]._id,dataobj).then((res:any) => {
      getAlldata()
    });
    //  console.log("values",values ,Montlymaxrang)
    
}

  return (
    <>
    <main className="main-container">
      <header className="brand-container flex">
        <div className="brand-img pointer">
          <img src={logo} alt="" className="mr-40"/>
        </div>
        {/* <div style={{marginTop:"2px",marginLeft:"-8px",marginRight:"12px"}}> */}
        <div className="dropdowmt">
        <Dropdown></Dropdown>
        </div>
        {/* </div> */}
        <div className="pointer cros-mt">
        
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
      </header>
      <section className="main-section">
        <div className="banner-272">
          <img src={pana} alt="" />
        </div>
        <p className="text-secondary-272-272 pb-20">
          How much value does this purchase create for you?
        </p>
        <div className="input-container">
          <div>
          <img src={ball} alt="" style={{marginLeft:"-18px",marginBottom:"-22px"}}/>

            <input
              type="range"
              min={purchaseminrang}
              max={purchasemaxrang}
              value={purchasevalue}
              step="1"
              className="slider-range-288 w-full"
              onChange={(e) => onChangepurchase(e)} 

              id="slide-range"
            />
 
            <div className="flex flex-between text-secondary-272">
              <p>{purchaseminrang}</p>
              <p className="text-primary-272">{purchasevalue}</p>
              <p>{purchasemaxrang}</p>
            </div>
          </div>
          <p className="text-secondary-272 pb-20 pt-24">
            How much do you really need this?
          </p>
          <div>
          <img src={ball} alt="" style={{marginLeft:"-18px",marginBottom:"-22px"}}/>
            <input
              type="range"
              min={needminrang}
              max={needmaxrang}
              value={needvalue}
              step="1"
              className="slider-range-288 w-full"
              onChange={(e) => onChangeneedvalue(e)} 

              id="slide-range"
            />
            <div className="flex flex-between text-secondary-272">
              <p>{needminrang}</p>
              <p className="text-primary-272">{needvalue}</p>
              <p>{needmaxrang}</p>
            </div>
          </div>
          <p className="text-primary-272 pt-8">
            You can make a better decision by leaving your items in a cart just
            for an hour
          </p>
        </div>
      </section>
      <p className="link-text" onClick={(e) => {onNext(e)}}>Learn More on <a href="#">SwipeSwipe.com</a></p>
      {/* <button className="notify-btn font-6 center pointer" >
              Next
            </button> */}
    </main>
    </>
  )
}

export default AddPurchase
