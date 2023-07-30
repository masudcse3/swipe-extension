
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import sideIco from '../../public/sideIco.svg'
import banner from '../../public/banner.png'
import Union from '../../public/Union.svg'
import control from '../../public/control.svg'

import user1 from '../../public/user-1.png'

import user2 from '../../public/user-2.png'
import back from '../../public/back.svg'
import ServiceStore from "../util/ServiceStore";

import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
function AvailableMoney() {
  const navigate = useNavigate();
  const [DailyRange, setDailyRange] = useState(0);
  const [daywidth, setdaywidth] = useState("");
  const [dailyis, setdailyis] = useState(false);
  const [daytotal, setdaytotal] = useState(0)

  const [WeekRange, setWeekRange] = useState(0);
  const [weekwidth, setweekwidth] = useState("");
  const [weeklyshow, setweeklyshow] = useState(false);

  const [WeekGrennShow, setWeekGrennShow] = useState(false);

  const onNext = (e:any) => {
    navigate("/spent");
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
     
        
      }
      });


      new ServiceStore().GetDataBYFilter('order/GetdataWeekly',{"userId":user.data.webuserID}).then((res:any) => {
        if(res){
         var weektotal = 0
         for (var i in res.data) {
          weektotal += Number(res.data[i].replace(/\$|,/g, '')) 
         
       }
       if(Number(swipesetnotification.weeklylimit) <  Math.round(weektotal)){
         setweeklyshow(true)
         const weektotalrange =  Math.round(weektotal) - Number(swipesetnotification.weeklylimit) 
        setWeekRange(weektotalrange)
       }else{
        const weektotalrange = Number(swipesetnotification.weeklylimit) - Math.round(weektotal)
        setWeekRange(weektotalrange)
        const weekpercentage = Math.round(weektotal) * 100 / Number(swipesetnotification.weeklylimit)
        if (weekpercentage >= 80 && weekpercentage <= 100) {
          setWeekGrennShow(false)
        }else{
          setWeekGrennShow(true)
        }
        var total = 0
        if(weektotalrange == Number(swipesetnotification.weeklylimit)){
          setWeekGrennShow(true)
          total =  95
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

  });
}
  return (
    <>
      <main className="main-container-269">
      <header className="brand-container-269 flex">
      {/* <div className="go-back" onClick={(e) => {
             navigate("/userDetails");
            }}>
            <img src={back} alt="go Back" />
        </div> */}
        <div className="brand-img-269 pointer">
          <img src={logo} alt="" />
        </div>
        {/* <div className="menu-269 pointer">
          <img src={menu} alt="" />
        </div> */}
        <div style={{marginTop:"-8px",marginLeft:"-8px",marginRight:"8px"}}>
        <Dropdown ></Dropdown>
        </div>
        <div className="pointer cross-mt">
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
      </header>
      <div>
        <div className="spend-container-269 flex" >
          <p className="text-secondary-269">Spent Today</p>
          {weeklyshow == false && WeekGrennShow == false  && 
          <p className="money-269" style={{color:"orange"}}>${daytotal}</p>
          }
           {weeklyshow == true && WeekGrennShow == false && 
          <p className="money-269" style={{color:"red"}}>${daytotal}</p>
           }
            {WeekGrennShow == true && weeklyshow == false && 
          <p className="money-269" style={{color:"green"}}>${daytotal}</p>
            }
        </div>
        <p className="title-269">Money Available this Week</p>
        <div className="budget-containet-269">
          <div className="budget-box-269">
             <img src={Union} alt="" />
             {weeklyshow == false && WeekGrennShow == false  && 
           <span>
            <div className="budget-rapper flex" style={{width : weekwidth ,marginTop:"-55px"}}></div>
               <p className="btp" style={{marginTop:"-35px"}}>${WeekRange}</p>
            </span>
           }  
           {weeklyshow == true && WeekGrennShow == false && 
           <span>
              <div className="budget-rapper flex"  style={{width : "95%",background:"red",marginTop:"-55px"}}>
                </div>
                <p  className="btp" style={{color: "white",marginTop:"-35px"}}>-${WeekRange}</p>
              </span>
            }
            {WeekGrennShow == true && weeklyshow == false && 
           <span>
               <div className="budget-rapper flex" style={{width : weekwidth,background:"green",marginTop:"-55px"}}></div>
               <p className="btp" style={{marginTop:"-35px"}}>${WeekRange}</p>
           
              </span>
            }
            {/* <div className="budget-rappers flex"><p>$200</p></div> */}
          </div>
        </div>
        <div className="flex-center" onClick={(e) => {onNext(e)}}>
          <a  className="learn-more">Learn more</a>
        </div>
      </div>
    </main>
    </>
  )
}

export default AvailableMoney
