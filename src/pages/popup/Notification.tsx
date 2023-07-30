
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import edit from '../../public/edit.svg'
import ball from "../../public/ball.svg"
import { useNavigate } from "react-router-dom";
import ServiceStore from "../util/ServiceStore";
import InputRange from 'react-input-range';
import Modal from 'react-bootstrap/Modal';
import MultiRangeSlider from "./MultiRangeSlider";
import back from '../../public/back.svg'
import {
  Collapse,
  NavbarToggler,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Nav from "react-bootstrap/Nav";
import Dropdown from "./Dropdown"

function Notification() {
  const navigate = useNavigate();
  const [datalist, setdatalist] = useState([]);
  const [rang, setRang] = useState({ min: 2, max: 10 });
  const [Monthlyvalue, setMonthlyValue] = useState("");
  const [Montlymaxrang, setMontlymaxrang] = useState(1800);
  const [Montlyminrang, setMontlyminrang] = useState(0);

  const [Weeklyvalue, setWeeklyValue] = useState("");
  const [Weeklymaxrang, setWeeklymaxrang] = useState(600);
  const [Weeklyminrang, setWeeklyminrang] = useState(0);

  const [Dailyvalue, setDailyValue] = useState("");
  const [Dailymaxrang, setDailymaxrang] = useState(90);
  const [Dailyminrang, setDailyminrang] = useState(0);

  const [Montlyerror, setMontlyerror] = useState("");
  const [Weeklyerror, setWeeklyerror] = useState("");
  const [Dailyerror, setDailyerror] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e:any) => {
    setDropdownOpen(!dropdownOpen);
  };
  const onNext = (e:any) => {
    navigate("/monitor");
  };
  const onclose = (e:any) => 
    window.close();{
  };
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    
  }
  const handleClose = () => { 
    setShow(false);
    setMontlyerror("")
  }

  const [showWeek, setShowWeek] = useState(false);
  const handleShowWeek = () => {
    setShowWeek(true);
   
  }
  const handleCloseWeek = () => {
    setShowWeek(false);
    setWeeklyerror("")
  }
  
  

  const [showDay, setShowDay] = useState(false);
  const handleShowDay = () => {
    setShowDay(true) 
    
  }
  const handleCloseDay = () => {
    setShowDay(false);
    setDailyerror("")
  }
  
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
    new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy',data).then((res:any) => {
      if(res){
        console.log("montlymaxrang",res)
        setMonthlyValue(Number(res.data[0].monthlylimit))
        setMontlymaxrang(Number(res.data[0].montlymaxrang))
        setWeeklyValue(res.data[0].weeklylimit)
        setWeeklymaxrang(Number(res.data[0].weeklymaxrang))
        setDailyValue(res.data[0].dailylimit)
        setDailymaxrang(Number(res.data[0].dailymaxrang))
        setdatalist(res.data)
      }
    });
  }
  let values = 0

  const onChangeMonthlyMaxAmount =  (event:any) => {
    event.preventDefault();
    setMontlyerror("")
    if(Number(event.target.value) > Number(datalist[0].monthlylimit)){
      const dataobj = {"montlymaxrang":event.target.value,id:datalist[0]._id}
      new ServiceStore().UpdateData('swipesetnotification/Update/'+datalist[0]._id,dataobj).then((res:any) => {
        getAlldata()
        handleClose()
      });
    }else{
      setMontlyerror("Please decrease your monthly limit")
    }
  }
  const onChangeMonthly = (event:any) => {
    event.preventDefault();
    console.log("event.target.value",event.target.value)
      setMonthlyValue(event.target.value)
    const dataobj = {"monthlylimit":event.target.value,id:datalist[0]._id}
      new ServiceStore().UpdateData('swipesetnotification/Update/'+datalist[0]._id,dataobj).then((res:any) => {
        getAlldata()
      });
      //  console.log("values",values ,Montlymaxrang)
      
  }


  const onChangeWeeeklyMaxAmount =  (event:any) => {
    event.preventDefault();
    setWeeklyerror("")
    if(Number(event.target.value) > Number(datalist[0].weeklylimit)){
      const dataobj = {"weeklymaxrang":event.target.value,id:datalist[0]._id}
      new ServiceStore().UpdateData('swipesetnotification/Update/'+datalist[0]._id,dataobj).then((res:any) => {
        getAlldata()
        handleCloseWeek()
      });
    }else{
      setWeeklyerror("Please decrease your weekly limit")
    }
  }
  const onChangeWeeekly = (event:any) => {
    setWeeklyValue(event.target.value)
    const dataobj = {"weeklylimit":event.target.value,id:datalist[0]._id}
    new ServiceStore().UpdateData('swipesetnotification/Update/'+datalist[0]._id,dataobj).then((res:any) => {
      getAlldata()
      });
  }

  const onChangeDailyMaxAmount =  (event:any) => {
    event.preventDefault();
    setDailyerror("")
    if(Number(event.target.value) > Number(datalist[0].dailylimit)){
      const dataobj = {"dailymaxrang":event.target.value,id:datalist[0]._id}
      new ServiceStore().UpdateData('swipesetnotification/Update/'+datalist[0]._id,dataobj).then((res:any) => {
        getAlldata()
        handleCloseDay()
      });
    }else{
      setDailyerror("Please decrease your daily limit")
    }
  }
  const onChangeDaily = (event:any) => {
    setDailyValue(event.target.value)

    // let value  = 0
    // if(event.target.value >  datalist[0].dailylimit){
    //   value  = Math.round(Dailymaxrang + (datalist[0].dailylimit)/2);
    // }else{
    //   value = Math.round(Dailymaxrang - (datalist[0].dailylimit)/2);
    // }
    // setDailymaxrang(value)
    const dataobj = {"dailylimit":event.target.value,id:datalist[0]._id}
    new ServiceStore().UpdateData('swipesetnotification/Update/'+datalist[0]._id,dataobj).then((res:any) => {
      getAlldata()
      });
  }
  return (
   
    <>


<main className="main-container">
      <header className="brand-container flex">
        {/* <div className="go-back backto-go"  onClick={(e) => {
             navigate("/financial");
            }}>
            <img src={back} alt="go Back" />
        </div> */}
        <div className="brand-img pointer">
          <img src={logo} alt="" className="mr-40"/>
        </div>
        
        <Dropdown></Dropdown>
        {/* <div className="menu pointer">
          <img src={menu} alt="" />
         </div> */}
         <div className="cross-ico pointer cross-mt">
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
      </header>
      <section className="main-section">
        <div className="setsection">
          <p className="title center font-6">My Guilt Free Spending</p>
          <div className="limit-container mt-24">
            <p className="title font-5">Your Monthly Limit</p>
            {/* <MultiRangeSlider
                min={Montlyminrang}
                max={Montlymaxrang}
                onChange={({ min, max }) => onChangeMonthly(min, max)}
                /> */}
            <div className="limit-process">
            <img src={ball} alt="" style={{marginLeft:"-18px",marginBottom:"-22px"}}/>
  
              <input
                type="range"
                min={Montlyminrang}
                max={Montlymaxrang}
                value={Monthlyvalue}
                step="1"
                className="slider-range-288 w-full"
                onChange={(e) => onChangeMonthly(e)} 

                id="slide-range"
              />
              
              <div className="value-container flex-between item-center">
                <div className="flex gap-40 item-center">
                  <p className="primary-budget">${Montlyminrang}</p>
                
                </div>
                <p className="secondary-budget">${Monthlyvalue}</p>
                <div className="flex gap-8 item-center">
                {show == false && 
                  <p className="total-budget">${Montlymaxrang}</p>
                }
                  {show == false && 
                  <img src={edit} alt=""  onClick={(e) => handleShow()}/>
                  
                }
                  {show == true && 
                    <input
                      type="text"
                      name= "monthly"
                      onChange={(e) => onChangeMonthlyMaxAmount(e)} 
                      defaultValue={Montlymaxrang}
                      className="inputmarkets"
                    />
                  }
                  {show == true && 
                  <img src={closes} alt="" onClick={(e) => {handleClose()}}/>
                  }
                </div>
              
              </div>
              {Montlyerror && 
              <span style={{color:"red"}}>{Montlyerror}</span>
            }
            </div>
          
          </div>
          <div className="limit-container mt-24">
            <p className="title font-5">Your Weakly Limit</p>
            <div className="limit-process">
              {/* <input
                type="range"
                min="0"
                max="1000"
                value="550"
                className="slider-range-288 w-full"
                id="slide-range"
              /> */}
              <img src={ball} alt="" style={{marginLeft:"-18px",marginBottom:"-22px"}}/>
              <input
                type="range"
                min={Weeklyminrang}
                max={Weeklymaxrang}
                value={Weeklyvalue}
                className="slider-range-288 w-full"
                onChange={(e) => onChangeWeeekly(e)} 

                id="slide-range"
              />

              <div className="value-container flex-between item-center">
                <div className="flex gap-40 item-center">
                  <p className="primary-budget">${Weeklyminrang}</p>
                </div>
                <p className="secondary-budget">${Weeklyvalue}</p>
                <div className="flex gap-8 item-center">
                {showWeek == false && 
                    <p className="total-budget">${Weeklymaxrang}</p>
                }
                {showWeek == false && 
                    <img src={edit} alt=""  onClick={(e) => handleShowWeek()}/>
            
                }
                  {showWeek == true && 
                    <input
                      type="text"
                      name= "weekly"
                      onChange={(e) => onChangeWeeeklyMaxAmount(e)} 
                      defaultValue={Weeklymaxrang}
                      className="inputmarkets"
                    />
                  }
                  {showWeek == true && 
                  <img src={closes} alt="" onClick={(e) => {handleCloseWeek()}}/>
                  }
                </div>
              </div>
              {Weeklyerror && 
              <span style={{color:"red"}}>{Weeklyerror}</span>
            }
            </div>
          </div>
          <div className="limit-container mt-24">
            <p className="title font-5">Your Daily Limit</p>
            <div className="limit-process">
              {/* <input
                type="range"
                min="0"
                max="1000"
                value="300"
                className="slider-range-288 w-full"
                id="slide-range"
              /> */}
              <img src={ball} alt="" style={{marginLeft:"-18px",marginBottom:"-22px"}}/>
              <input
                type="range"
                min={Dailyminrang}
                max={Dailymaxrang}
                value={Dailyvalue}
                className="slider-range-288 w-full"
                onChange={(e) => onChangeDaily(e)} 

                id="slide-range"
              />
              <div className="value-container flex-between item-center">
                <div className="flex gap-40 item-center">
                  <p className="primary-budget">${Dailyminrang}</p>
                
                </div>
                <p className="secondary-budget">${Dailyvalue}</p>
                <div className="flex gap-8 item-center">
                {showDay == false && 
                  <p className="total-budget">${Dailymaxrang}</p>
                }
                {showDay == false && 
                  <img src={edit} alt=""  onClick={(e) => handleShowDay()}/>
                  }
                  {showDay == true && 
                    <input
                      type="text"
                      name= "daily"
                      onChange={(e) => onChangeDailyMaxAmount(e)} 
                      defaultValue={Dailymaxrang}
                      className="inputmarkets"
                    />
                  }
                  {showDay == true && 
                  <img src={closes} alt="" onClick={(e) => {handleCloseDay()}}/>
                  }
                </div>
              </div>
              {Dailyerror && 
              <span style={{color:"red"}}>{Dailyerror}</span>
            }
            </div>
          </div>
        </div>
        <button className="notify-btn  font-6 center pointer" onClick={(e) => {
              onNext(e)
              
            }}>
          Set notifications next
        </button>
      </section>
      
    </main>
    </>
  )
}
Notification.propTypes = {
  direction: PropTypes.string,
};
export default Notification
