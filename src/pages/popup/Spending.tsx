
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
import ServiceStore from "../util/ServiceStore";

import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { Chart } from "react-google-charts";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Spending() {
  const navigate = useNavigate();
  const [WeekRange, setWeekRange] = useState(0);
  const [weekwidth, setweekwidth] = useState("");
  const [weeklyshow, setweeklyshow] = useState(false);
  const [weektotal, setweektotal] = useState(0)

  const [MonthRange, setMonthRange] = useState(0);
  const [monthwidth, setmonthwidth] = useState("");
  const [monthshow, setmonthshow] = useState(false);
  const [monthtotal, setmonthtotal] = useState(0)
  const [swipesetnotification, setswipesetnotification] = useState({});
  const [WeekChartdata, setWeekChartdata] = useState([]);
  const [Colordata, setColordata] = useState(["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"]);
  
  const [MonthChartdata, setMonthChartdata] = useState([]);
  const onNext = (e:any) => {
    navigate("/messages");
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};


// const options = {
//   legend: "none",
//   pieSliceText: "label",
//   title: "Swiss Language Use (100 degree rotation)",
//   pieStartAngle: 100,
// };
React.useEffect(() => {
 
  getAlldata()

}, []);
const getAlldata = () => {
const usertoken = localStorage.getItem("accessToken")
 const user =   JSON.parse(usertoken) 
 const data = {"userId":user.data._id}

 setColordata(["#ff7d36","#093d60","#FFBB28", "#FF8042", "#AF19FF"])

  new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy',data).then((res:any) => {

    const swipesetnotification =  res.data[0]
    console.log("swipesetnotification",swipesetnotification)
    setswipesetnotification(res.data[0])

    new ServiceStore().GetDataBYFilter('order/GetdataMonthly',{"userId":user.data.webuserID}).then((res:any) => {
      if(res){
      
       var monthtotal = 0
       for (var i in res.data) {
        monthtotal += Number(res.data[i].replace(/\$|,/g, '')) 
        console.log("monthtotal",res.data[i].replace(/\$|,/g, ''))
       
      }
      setmonthtotal(Math.round(monthtotal))
      const MonthChartdata = [
        { name: 'Spend', value: Math.round(monthtotal) },
        { name: 'Have', value:  Number(swipesetnotification.monthlylimit) }
      ];
      setMonthChartdata(MonthChartdata)
      
      

      }
    });

    new ServiceStore().GetDataBYFilter('order/GetdataWeekly',{"userId":user.data.webuserID}).then((res:any) => {
      if(res){
       var weektotal = 0
       for (var i in res.data) {
        weektotal += Number(res.data[i].replace(/\$|,/g, '')) 
       
     }
     setweektotal(Math.round(weektotal))
     const weekchartdata = [
      { name: 'Spend', value: Math.round(weektotal) },
      { name: 'Have', value:  Number(swipesetnotification.weeklylimit) }
    ];
    console.log("weekchartdata",weekchartdata)
    setWeekChartdata(weekchartdata)
    
    
      }
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
        <div className="progress-box">
          <div className="flex flex-between progress-section">
            <div>
              <p className="text-primary-274 text-start">Weekly Spending</p>
              <div>
                <p className="text-secondary-274 text-start">
                  <span className="yellow-txt fs-2">&#8226;</span> Spend
                </p>
                <p className="yellow-txt ps-15">${weektotal}</p>
              </div>
              <div>
                <p className="text-secondary-274 text-start">
                  <span className="text-primary-274 fs-2">&#8226;</span> Have
                </p>
                <p className="text-primary-274 ps-15 text-start">${swipesetnotification?.weeklylimit}</p>
              </div>
            </div>
            <PieChart width={140} height={140}>
             <Pie data={WeekChartdata}  color="#000000" dataKey="value"  nameKey="name" cx="50%" cy="50%"   
            outerRadius={70} fill="#ff7d36" >

             {WeekChartdata.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={Colordata[index % Colordata.length]}
            />
         ))}
             </Pie>
          </PieChart>
          </div>
   
        </div>
        <div className="progress-box my-fix">
          <div className="flex flex-between progress-section">
            <div>
              <p className="text-primary-274 text-start">Monthly Spending</p>
              <div>
                <p className="text-secondary-274 text-start">
                  <span className="yellow-txt fs-2">&#8226;</span> Spend
                </p>
                <p className="yellow-txt ps-15">${monthtotal}</p>
              </div>
              <div>
                <p className="text-secondary-274 text-start">
                  <span className="text-primary-274 fs-2">&#8226;</span> Have
                </p>
                <p className="text-primary-274 ps-15 text-start">${swipesetnotification?.monthlylimit}</p>
              </div>
            </div>
            {/* <div className="progress-chart">
              <div className="slice empty"></div>
            </div> */}
               <PieChart width={140} height={140}>
             <Pie data={MonthChartdata}  color="#000000" dataKey="value"  nameKey="name" cx="50%" cy="50%"   
            outerRadius={70} fill="#ff7d36" >

             {MonthChartdata.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={Colordata[index % Colordata.length]}
            />
         ))}
             </Pie>
          </PieChart>
          </div>
        </div>
      </div>
        <button className="notify-btn mb-16 font-6 pointer">
         I Will Spend Less
        </button>
        <a href="#" className="link-text flex-center"
          >Learn More on SwipeSwipe.co</a>
      </section>
    </main>
    </>
  )
}

export default Spending
