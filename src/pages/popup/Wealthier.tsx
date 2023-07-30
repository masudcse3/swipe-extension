
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import edit from '../../public/edit.svg'
import budgetBox from '../../public/budgetBox-1.svg'
import { useNavigate } from "react-router-dom";
import back from '../../public/back.svg'
import Dropdown from "./Dropdown";
import ServiceStore from "../util/ServiceStore";

function Wealthier() {
  const navigate = useNavigate();
  const [DailyRange, setDailyRange] = useState(0);
  const [daywidth, setdaywidth] = useState("");
  const [dailyis, setdailyis] = useState(false);

  const [WeekRange, setWeekRange] = useState(0);
  const [weekwidth, setweekwidth] = useState("");
  const [weeklyshow, setweeklyshow] = useState(false);

  const [MonthRange, setMonthRange] = useState(0);
  const [monthwidth, setmonthwidth] = useState("");
  const [monthshow, setmonthshow] = useState(false);


  const [DayGrennShow, setDayGrennShow] = useState(false);
  const [WeekGrennShow, setWeekGrennShow] = useState(false);
  const [MonthGrennShow, setMonthGrennShow] = useState(false);

  const onNext = (e:any) => {
    navigate("/messages");
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
 console.log("user:::::::::::::::",user)
  new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy',data).then((res:any) => {
    // if(res){
    //   console.log("montlymaxrang",res)
    //   if(Number(res.data[0].monthlylimit) )
     
    // }
    const swipesetnotification =  res.data[0]
    console.log("swipesetnotification",swipesetnotification)
      new ServiceStore().GetDataBYFilter('order/Getdatadaliy',{"userId":user.data.webuserID}).then((res:any) => {
        if(res){
         var daytotal = 0
        for (var i in res.data) {
          console.log("JJJJJJJJJJJJ,",res.data[i].replace(/\$|,/g, ''))
           daytotal += Number(res.data[i].replace(/\$|,/g, '')) 
        }
     console.log("daytotaldaytotal",res.data)
        if(Number(swipesetnotification.dailylimit) <  Math.round(daytotal)){
          setdailyis(true)
          const dattotalrange = Math.round(daytotal)- Number(swipesetnotification.dailylimit) 
          setDailyRange(dattotalrange)
        }else{
          const dattotalrange = Number(swipesetnotification.dailylimit) - Math.round(daytotal)
          setDailyRange(dattotalrange)


          const daypercentage = Math.round(daytotal) * 100 / Number(swipesetnotification.dailylimit)
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


      new ServiceStore().GetDataBYFilter('order/GetdataWeekly',{"userId":user.data.webuserID}).then((res:any) => {
        if(res){
         var weektotal = 0
         for (var i in res.data) {
          weektotal += Number(res.data[i].replace(/\$|,/g, '')) 
         
       }
       console.log("weektotal",swipesetnotification)
       if(Number(swipesetnotification.weeklylimit) <  Math.round(weektotal)){
         setweeklyshow(true)
         const weektotalrange =  Math.round(weektotal) - Number(swipesetnotification.weeklylimit) 
        setWeekRange(weektotalrange)
       }else{
        const weektotalrange = Number(swipesetnotification.weeklylimit) - Math.round(weektotal)
        console.log("weektotalrange",weektotalrange)
        setWeekRange(weektotalrange)
        
        const weekpercentage = Math.round(weektotal) * 100 / Number(swipesetnotification.weeklylimit)
        if (weekpercentage >= 80 && weekpercentage <= 100) {
          setWeekGrennShow(false)
        }else{
          setWeekGrennShow(true)
        }
        var total = 0
        if(weektotalrange == Number(swipesetnotification.weeklylimit)){
          total = 95
          setWeekGrennShow(true)
        }else{
          total = Number(weektotalrange) * 100 / Number(swipesetnotification.weeklylimit)
         
        }
        if(Math.round(total) < 95){
         setweekwidth(total+"%")
        }else{
          setweekwidth("95%")
        }
       } 

        }
      });

      new ServiceStore().GetDataBYFilter('order/GetdataMonthly',{"userId":user.data.webuserID}).then((res:any) => {
        if(res){
        
         var monthtotal = 0
         for (var i in res.data) {
          monthtotal += Number(res.data[i].replace(/\$|,/g, '')) 
         
        }
        if(Number(swipesetnotification.monthlylimit) <  Math.round(monthtotal)){
          setmonthshow(true)
          const monthtotalrange =  Math.round(monthtotal) - Number(swipesetnotification.monthlylimit) 
         setMonthRange(monthtotalrange)
        }else{
         const monthtotalrange = Number(swipesetnotification.monthlylimit) - Math.round(monthtotal)
         setMonthRange(monthtotalrange)

         const monthpercentage = Math.round(monthtotal) * 100 / Number(swipesetnotification.monthlylimit)
         if (monthpercentage >= 80 && monthpercentage <= 100) {
          setMonthGrennShow(false)
        }else{
          setMonthGrennShow(true)
        }
         var total = 0
        if(monthtotalrange == Number(swipesetnotification.monthlylimit)){
          setMonthGrennShow(true)
          total = 95
        }else{
           total = Number(monthtotalrange) * 100 / Number(swipesetnotification.monthlylimit)

        }
         if(Math.round(total) < 95){
          setmonthwidth(total+"%")
         }else{
          setmonthwidth("95%")
         }
        } 

        }
      });
  });
}
  return (
    <>
        <main className="main-container">
      <header className="brand-container flex">
      {/* <div className="go-back backto-go"  onClick={(e) => {
             navigate("/addprosperity");
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
        <p className="title center font-5" style={{marginRight:"-10px"}}>We wish you Prosperity</p>
        <div className="budget-containet">
          <p className="budget-title center font-4">Left for today</p>
         
          <div className="budget-box-290">
          <img src={budgetBox} alt=""  />
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
        <div className="budget-containet">
          <p className="budget-title center font-4">Left for this week</p>
          <div className="budget-box-290">
          <img src={budgetBox} alt="" />
           {weeklyshow == false && WeekGrennShow == false && 
           <span>
            <div className="budget-rapper flex" style={{width : weekwidth}}></div>
               <p className="btp">${WeekRange}</p>
            </span>
           }  
           {weeklyshow == true && WeekGrennShow == false && 
           <span>
              <div className="budget-rapper flex"  style={{width : "95%",background:"red"}}>
                </div>
                <p  className="btp" style={{color: "white"}}>-${WeekRange}</p>
              </span>
            }
            {WeekGrennShow == true && weeklyshow == false && 
           <span>
               <div className="budget-rapper flex" style={{width : weekwidth,background:"green"}}></div>
               <p className="btp">${WeekRange}</p>
           
              </span>
            }
          </div>
        </div>
        <div className="budget-containet">
          <p className="budget-title center font-4">Left for this month</p>
          <div className="budget-box-290">
          <img src={budgetBox} alt="" />
            {/* <div className="budget-rapper flex"><p>$200</p></div> */}
            {monthshow == false && MonthGrennShow == false && 
             <span>
              <div className="budget-rapper flex" style={{width :monthwidth}}></div>
              <p  className="btp">${MonthRange}</p>
              </span>
           }  
           {monthshow == true && MonthGrennShow == false && 
            <span>
              <div className="budget-rapper flex"  style={{width : "95%",background:"red"}}>
                </div>
                <p className="btp" style={{color: "white"}}>-${MonthRange}</p>
                </span>
            }
          {monthshow == false && MonthGrennShow == true && 
             <span>
              <div className="budget-rapper flex" style={{width :monthwidth,background:"green"}}></div>
              <p  className="btp">${MonthRange}</p>
              </span>
           } 
            
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

export default Wealthier
