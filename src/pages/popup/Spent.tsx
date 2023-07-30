
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
import ServiceStore from "../util/ServiceStore";

function Spent() {
  const navigate = useNavigate();

  const [daytotal, setdaytotal] = useState(0)
  const [weektotal, setweektotal] = useState(0)
  const [monthtotal, setmonthtotal] = useState(0)

  const [DayGrennShow, setDayGrennShow] = useState(false);
  const [WeekGrennShow, setWeekGrennShow] = useState(false);
  const [MonthGrennShow, setMonthGrennShow] = useState(false);
  

  
  const [weekshowred, setweekshowred] = useState(false);
  const [dayshowred, setdayshowred] = useState(false);
  const [monthshowred, setmonthshowred] = useState(false);



  const onNext = (e:any) => {
    navigate("/savings");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
React.useEffect(() => {
 
  getAlldata()
},[])

const getAlldata = () => {
  const usertoken = localStorage.getItem("accessToken")
     const user =   JSON.parse(usertoken)
     console.log("user:::",user) 
     new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy', {"userId":user.data._id}).then((res:any) => {
    
      const swipesetnotification =  res.data[0]
     const data = {"userId":user.data.webuserID}
      new ServiceStore().GetDataBYFilter('order/Getdatadaliy',data).then((res:any) => {
        if(res){
         
         var daytotal = 0
        for (var i in res.data) {
           daytotal += Number(res.data[i].replace(/\$|,/g, '')) 
          
        }
        setdaytotal(Math.round(daytotal))
        const daypercentage = Math.round(daytotal) * 100 / Number(swipesetnotification.dailylimit)
       
        if (Math.round(daypercentage) >= 80 && Math.round(daypercentage) <= 100) {
          setDayGrennShow(false)
        }else{
          setDayGrennShow(true)
        }
        if(Math.round(daypercentage) >= 101){
          setdayshowred(true)
          setDayGrennShow(false)
          console.log("daypercentage::::::::::::::::::",daypercentage)
        }
        

        }
      });


      new ServiceStore().GetDataBYFilter('order/GetdataWeekly',data).then((res:any) => {
        if(res){
        
         var weektotal = 0
         for (var i in res.data) {
          weektotal += Number(res.data[i].replace(/\$|,/g, '')) 
         
       }
      
         setweektotal(Math.round(weektotal))
        console.log(Math.round(weektotal)) 
        const weekpercentage = Math.round(weektotal) * 100 / Number(swipesetnotification.weeklylimit)
        console.log("weekpercentage:::::::::::",weekpercentage)
        if (weekpercentage >= 80 && weekpercentage <= 100) {
          setWeekGrennShow(false)
        }else{
          setWeekGrennShow(true)
        }
        if(weekpercentage >= 101){
          setweekshowred(true)
          setWeekGrennShow(false)
        }
        }
      });


      new ServiceStore().GetDataBYFilter('order/GetdataMonthly',data).then((res:any) => {
        if(res){
         
         var monthtotal = 0
         for (var i in res.data) {
          monthtotal += Number(res.data[i].replace(/\$|,/g, '')) 
         
       }
       const monthpercentage = Math.round(monthtotal) * 100 / Number(swipesetnotification.monthlylimit)
       if (monthpercentage >= 80 && monthpercentage <= 100) {
        setMonthGrennShow(false)
      }else{
        setMonthGrennShow(true)
      }
      if(monthpercentage >= 101){
        setmonthshowred(true)
        setMonthGrennShow(false)
      }
          setmonthtotal(Math.round(monthtotal))

        }
      });
    })
    }
  return (
    <>
     <main className="main-container">
      <header className="brand-container flex">
      {/* <div className="go-back backto-go"  onClick={(e) => {
             navigate("/availablemoney");
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
     <section className="main-section">
     <div className="setsection">
        <p className="title center font-5 ml-40">Spent</p>
        <div className="budget-box flex">
          <div>
            <p className="budget-title">Today</p>
            {/* <p className="budget-money">${daytotal}</p> */}
            {DayGrennShow == true && dayshowred == false  && 
            <p className="budget-money" style={{color:"green"}}>${daytotal}</p>
            }
            {DayGrennShow == false && dayshowred == false  && 
            <p className="budget-money" style={{color:"orange"}}>${daytotal}</p>
            }
             {dayshowred == true &&  DayGrennShow == false && 
            <p className="budget-money" style={{color:"red"}}>${daytotal}</p>
            }
          </div>
        </div>
        <div className="budget-box flex">
          <div>
            <p className="budget-title">This Week</p>
            {WeekGrennShow == true && weekshowred == false  && 
            <p className="budget-money" style={{color:"green"}}>${weektotal}</p>
            }
            {WeekGrennShow == false && weekshowred == false  && 
            <p className="budget-money" style={{color:"orange"}}>${weektotal}</p>
            }
             {weekshowred == true &&  WeekGrennShow == false &&  
            <p className="budget-money" style={{color:"red"}}>${weektotal}</p>
            }
          </div>
        </div>
        <div className="budget-box flex">
          <div>
            <p className="budget-title">This Month</p>
            {/* <p className="budget-money text-red">${monthtotal}</p> */}
            {MonthGrennShow == true && monthshowred == false  && 
            <p className="budget-money" style={{color:"green"}}>${monthtotal}</p>
            }
            {MonthGrennShow == false && monthshowred == false  && 
            <p className="budget-money" style={{color:"orange"}}>${monthtotal}</p>
            }
             { monthshowred == true &&  MonthGrennShow == false && 
            <p className="budget-money" style={{color:"red"}}>${monthtotal}</p>
            }
          </div>
        </div>
        </div>
        <button className="notify-btn font-6 center pointer" onClick={(e) => {onNext(e)}}>
          Show me how to get Wealthier
        </button>
        <div className="" >
          <a href="#" className="learn-more" style={{display:"block"}}>Learn more</a>
        </div>
      </section>
      </main>
    </>
  )
}

export default Spent
