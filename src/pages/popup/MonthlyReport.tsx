
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
function MonthlyReport() {
  const navigate = useNavigate();

  const [MonthRange, setMonthRange] = useState(0);
  const [monthwidth, setmonthwidth] = useState("");
  const [monthshow, setmonthshow] = useState(false);

  const [monthtotal, setmonthtotal] = useState(0)
  const [MonthWebsiteList, setMonthWebsiteList] = useState([]);
  const [MonthGrennShow, setMonthGrennShow] = useState(false);

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
   

    new ServiceStore().GetDataBYFilter('order/GetdataMonthly',{"userId":user.data.webuserID}).then((res:any) => {
      if(res){
      
       var monthtotal = 0
       for (var i in res.data) {
        monthtotal += Number(res.data[i].replace(/\$|,/g, '')) 
       
      }
      setmonthtotal(Math.round(monthtotal))
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


      new ServiceStore().GetDataBYFilter('order/MonthWebsite',{"userId":user.data.webuserID}).then((res:any) => {
        console.log("res::::::::",res)
        setMonthWebsiteList(res.data)
        
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
        <p className="text-primary-274">Monthly Report</p>
        <div className="money-box-274 flex flex-x flex-center gap-8">
          <p className="text-secondary-274">Total spend</p>
          {/* <p className="money-txt-274">${monthtotal}</p> */}
          {MonthGrennShow == true && monthshow == false  && 
            <p className="money-txt-274" style={{color:"green"}}>${monthtotal}</p>
            }
            {MonthGrennShow == false && monthshow == false  && 
            <p className="money-txt-274" style={{color:"orange"}}>${monthtotal}</p>
            }
             {monthshow == true &&  MonthGrennShow == false &&  
            <p className="money-txt-274" style={{color:"red"}}>${monthtotal}</p>
            }
        </div>
        <div className="budget-containet-274">
          <p className="text-primary-274">Monthly Allowance Left</p>
          <div className="budget-box-274">
          <img src={budgetBox} alt="" />
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
            {/* <div className="budget-rapper-274 flex"><p>$200</p></div> */}
          </div>
        </div>
        {MonthWebsiteList.length > 0 &&
        <div className="scrollable-div">
           <hr />
            {MonthWebsiteList.map((val, key) => {
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
        <a href="#" className="link-text flex-center"
          >Learn More on SwipeSwipe.co</a>
      </section>
    </main>
    </>
  )
}

export default MonthlyReport
