
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import budgetBox from '../../public/budgetBox.svg'
import banner from '../../public/banner.png'
import Union from '../../public/Union.svg'
import control from '../../public/control.svg'

import user1 from '../../public/user-1.png'

import user2 from '../../public/user-2.png'
import ServiceStore from "../util/ServiceStore";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
function DailyReport() {
  const navigate = useNavigate();
  const [DailyRange, setDailyRange] = useState(0);
  const [daywidth, setdaywidth] = useState("");
  const [dailyis, setdailyis] = useState(false);
  const [daytotal, setdaytotal] = useState(0)
  const [DailyWebsiteList, setDailyWebsiteList] = useState([]);
  const [DayGrennShow, setDayGrennShow] = useState(false);

  
  const onNext = (e:any) => {
    navigate("/notification");
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
  new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy',data).then((res:any) => {
    // if(res){
    //   console.log("montlymaxrang",res)
    //   if(Number(res.data[0].monthlylimit) )
     
    // }
    const swipesetnotification =  res.data[0]
      new ServiceStore().GetDataBYFilter('order/Getdatadaliy',{"userId":user.data.webuserID}).then((res:any) => {
        if(res){
         var daytotal = 0
        for (var i in res.data) {
           daytotal += Number(res.data[i].replace(/\$|,/g, '')) 
        }
        setdaytotal(Math.round(daytotal))
        if(Number(swipesetnotification.dailylimit) <  Math.round(daytotal)){
          setdailyis(true)
          const dattotalrange = Math.round(daytotal)- Number(swipesetnotification.dailylimit) 
          setDailyRange(dattotalrange)
        }else{
          const dattotalrange = Number(swipesetnotification.dailylimit) - Math.round(daytotal)
          setDailyRange(dattotalrange)


          const daypercentage = Math.round(daytotal) * 100 / Number(swipesetnotification.dailylimit)
          console.log("daypercentage",daypercentage)
        if (daypercentage >= 80 && daypercentage <= 100) {
          setDayGrennShow(false)
        }else{
          setDayGrennShow(true)
        }
          var total = 0
          if(dattotalrange == Number(swipesetnotification.dailylimit)){
            setDayGrennShow(true)
            total = 95
          }else{
           total = Number(dattotalrange) * 100 / Number(swipesetnotification.dailylimit)
          }
          if(Math.round(total) < 95){
            setdaywidth(dattotalrange+"%")
          }else{
            setdaywidth("95%")
          }
        }
      }
      });


      new ServiceStore().GetDataBYFilter('order/DailyWebsite',{"userId":user.data.webuserID}).then((res:any) => {
        console.log("res::::::::",res)
        setDailyWebsiteList(res.data)
        
        });

    
  });
}
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
        <p className="text-primary-274">Daily Report</p>
        <div className="money-box-274 flex flex-x flex-center gap-8">
          <p className="text-secondary-274">Total spend</p>
          {/* <p className="money-txt-274">${daytotal}</p> */}
          {DayGrennShow == true && dailyis == false  && 
            <p className="money-txt-274" style={{color:"green"}}>${daytotal}</p>
            }
            {DayGrennShow == false && dailyis == false  && 
            <p className="money-txt-274" style={{color:"orange"}}>${daytotal}</p>
            }
             {dailyis == true &&  DayGrennShow == false && 
            <p className="money-txt-274" style={{color:"red"}}>${daytotal}</p>
            }
        </div>
        <div className="budget-containet-274">
          <p className="text-primary-274">Daily Allowance Left</p>
          <div className="budget-box-274">
          <img src={budgetBox} alt="" />
            {/* <div className="budget-rapper-274 flex"><p>$200</p></div> */}

            {dailyis == false && DayGrennShow == false && 
           <span>
              <div className="budget-rapper flex"  style={{width : daywidth}}></div>
                <p className="btp">${DailyRange}</p> 
            </span>   
          }
          {dailyis == true && DayGrennShow == false && 
          <span>
              <div className="budget-rapper flex"  style={{width : "95%",background:"red"}}></div>
              <p className="btp" style={{color: "white"}}>-${DailyRange}</p>
              </span>
          }
            {DayGrennShow == true && dailyis == false && 
            <span>
            <div className="budget-rapper flex"  style={{width : daywidth,background:"green"}}></div>
              <p className="btp">${DailyRange}</p> 
          </span>  
              }

          </div>
        </div>
       
        {DailyWebsiteList.length > 0 &&
        <div className="scrollable-div">
           <hr />
            {DailyWebsiteList.map((val, key) => {
                    return (
                      <div>
                      
                        <div className="m-12 flex-between" key={key}>
                          <p className="text-secondary-274">{val.website}</p>
                          <p className="text-primary-274">${val.totalcount}</p>
                        </div>
                     <hr />
                     </div>
                    )}) }
                   
            </div>
          }
        {/* <div className="m-12 flex-between">
          <p className="text-secondary-274">Wallmart</p>
          <p className="text-primary-274">$75</p>
        </div>
        <hr />
        <div className="m-12 flex-between">
          <p className="text-secondary-274">Ebay</p>
          <p className="text-primary-274">$75</p>
        </div> */}
        </div>
        <button className="notify-btn mb-16 font-6 pointer" onClick={(e) => {onNext(e)}}>
          Adjust Your Daily Filter
        </button>
        <a className="link-text flex-center" 
          >Learn More on SwipeSwipe.co</a>
      </section>
    </main>
    </>
  )
}

export default DailyReport
