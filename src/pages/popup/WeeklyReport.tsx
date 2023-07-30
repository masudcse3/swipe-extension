
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
function WeeklyReport() {
  const navigate = useNavigate();
  const [WeekRange, setWeekRange] = useState(0);
  const [weekwidth, setweekwidth] = useState("");
  const [weeklyshow, setweeklyshow] = useState(false);

  const [weektotal, setweektotal] = useState(0)
  const [WeekWebsiteList, setWeekWebsiteList] = useState([]);
  const [WeekGrennShow, setWeekGrennShow] = useState(false);

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

    const swipesetnotification =  res.data[0]
   


      new ServiceStore().GetDataBYFilter('order/GetdataWeekly',{"userId":user.data.webuserID}).then((res:any) => {
        if(res){
         var weektotal = 0
         for (var i in res.data) {
          weektotal += Number(res.data[i].replace(/\$|,/g, '')) 
         
       }
       setweektotal(Math.round(weektotal))
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


      new ServiceStore().GetDataBYFilter('order/WeeklyWebsite',{"userId":user.data.webuserID}).then((res:any) => {
        console.log("res::::::::",res)
        setWeekWebsiteList(res.data)
        
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
        <p className="text-primary-274">Weekly Report</p>
        <div className="money-box-274 flex flex-x flex-center gap-8">
          <p className="text-secondary-274">Total spend</p>
          {/* <p className="money-txt-274">${weektotal}</p> */}
          {WeekGrennShow == true && weeklyshow == false  && 
            <p className="money-txt-274" style={{color:"green"}}>${weektotal}</p>
            }
            {WeekGrennShow == false && weeklyshow == false  && 
            <p className="money-txt-274" style={{color:"orange"}}>${weektotal}</p>
            }
             {weeklyshow == true &&  WeekGrennShow == false &&  
            <p className="money-txt-274" style={{color:"red"}}>${weektotal}</p>
            }
        </div>
        <div className="budget-containet-274">
          <p className="text-primary-274">Weekly Allowance Left</p>
          <div className="budget-box-274">
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
            {/* <div className="budget-rapper-274 flex"><p>$200</p></div> */}
          </div>
        </div>
          
        {WeekWebsiteList.length > 0 &&
        <div className="scrollable-div">
           <hr />
            {WeekWebsiteList.map((val, key) => {
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
        </div>
        <button className="notify-btn mb-16 font-6 pointer" onClick={(e) => {onNext(e)}}>
          Adjust Your Daily Filter
        </button>
        <a  className="link-text flex-center"
          >Learn More on SwipeSwipe.co</a>
      </section>
    </main>
    </>
  )
}

export default WeeklyReport
