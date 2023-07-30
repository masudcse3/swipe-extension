
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo-2.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import sideIco from '../../public/sideIco.svg'
import banner from '../../public/banner.png'
import Union from '../../public/Union.svg'
import control from '../../public/control.svg'

import user1 from '../../public/user-1.png'

import user2 from '../../public/user-2.png'
import ServiceStore from "../util/ServiceStore";
import { PieChart, Pie, Cell, Tooltip, Legend  } from "recharts";
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
function Pocket() {
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
  const onNext = (e:any) => {
    navigate("/addpurchase");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
 
const data = [
  { name: 'week', value: WeekRange },
  
];
const Monthdata = [
  { name: 'Month', value: MonthRange },
  
];
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
        var total = 0
        if(weektotalrange == 400){
          total = 95
        }else{
          total = Number(weektotalrange) * 100 / Number(swipesetnotification.weeklymaxrang)

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
         var total = 0
        if(monthtotalrange == 1200){
          total = 95
        }else{
           total = Number(monthtotalrange) * 100 / Number(swipesetnotification.montlymaxrang)

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
         <main className="main-container-270">
      <header className="brand-container-270 flex">
        <div className="pointer">
          <img src={logo} alt=""  style={{marginLeft:"-200px"}}/>
        </div>
        <div style={{marginLeft:"120px",marginTop:"-7px"}}>
        <Dropdown></Dropdown>
        </div> 
        <div className="pointer cross-mt" style={{marginLeft:"20px"}}>
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div>
        {/* <div className="action flex pointer">
          <img src={menu} alt="" />
          <img src={closes} alt="" onClick={(e) => {onclose(e)}}/>
        </div> */}
      </header>
      <section>
        <div className="title-box-270 flex">
          <p className="title-270">
            Consider leaving your purchase in a Cart until tomorrow
          </p>
        </div>
        <div className="flex between">
          <div style={{width:"50%"}}>
            <p className="budget-title-270">This Week</p>
            
            <div style={{marginLeft:"90px",marginBottom:"-50px",marginTop:"10px"}}>
                <p className="text-sm font-5 pb-12 gray">
                  In a hole  {weeklyshow == false &&  <span className="font-6 orange">${WeekRange}</span>
                }
                {weeklyshow == true &&  <span className="font-6 orange">-${WeekRange}</span>
                }
                </p>
             
              </div>
              <div style={{marginTop:"40px"}}>
            <BarChart width={250} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ff7d36">
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
            </div>
          </div>
          <div style={{width:"50%"}}>
            <p className="budget-title-270">This Month</p>
         
            <div style={{marginLeft:"90px",marginBottom:"-50px",marginTop:"10px"}}>
                <p className="text-sm font-5 pb-12 gray">
                
                  In a hole {monthshow == false && <span className="font-6 orange">${MonthRange}</span>
                }
                 
                  {monthshow == true && <span className="font-6 orange">-${MonthRange}</span>
                }
                </p>
              </div>
              <div style={{marginTop:"40px"}}>
            <BarChart width={250} height={250} data={Monthdata}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ff7d36">
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
            </div>
          </div>
        </div>
        <div className="flex-center" onClick={(e) => {onNext(e)}}>
          <a  className="learn-more">Learn more</a>
        </div>
      </section>
        </main>
    </>
  )
}

export default Pocket
