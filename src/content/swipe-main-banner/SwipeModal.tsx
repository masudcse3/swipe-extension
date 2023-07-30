import {
    Box,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Heading,
    Stack,
    useDisclosure
  } from "@chakra-ui/react";
  import React ,{useState}from "react";
  import logo from '../../public/logo-2.png'
  import menu from '../../public/menu.svg'
  import closes from '../../public/cross.svg'
  import sideIco from '../../public/sideIco.svg'
  import banner from '../../public/banner.png'
  import Union from '../../public/Union.svg'
  import control from '../../public/control.svg'
  import pana from '../../public/pana.png'
  import {  ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, extendTheme } from '@chakra-ui/react';
  import ReactDOM from 'react-dom';
  import '../../pages/style/main.css'
  import { PieChart, Pie, Cell, Tooltip, Legend  } from "recharts";
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
  import ball from "../../public/ball.svg"

  import ServiceStore from "../../pages/util/ServiceStore";
//   import Dropdown from "../../pages/popup/Dropdown";
  function SwipeModal() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isaddOpen, setAddIsOpen] = React.useState(false);
    const [isdayOpen, setIsdayOpen] = React.useState(false);

  
    const handleClose = () => {
      setIsOpen(false);
     
    }
const AddPurchaseSubmit = () =>{
  setAddIsOpen(false)
}
const AddDayShowSubmit = () =>{
  console.log("OOOOOOOOOOOOOOOOOOoo")
  setIsdayOpen(false)
}

    const FormSubmit = () => {
        handleClose();
      };
      React.useEffect(() => {
 
        Alldata()
      
      }, []);
      const Alldata = () => {
        var swipesession =  localStorage.getItem('swipe-session');
        const sessiondata = JSON.parse(swipesession)
           new ServiceStore().GetDataBYFilter('swipeuserlogin/Getdatadaliy',{webuserID:sessiondata._id}).then((res:any) => {
            console.log("sessiondata",res.data)
          const swipeuserdata =  res.data[0]
          setIsdayOpen(true)
        new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy',{"userId":swipeuserdata._id}).then((res:any) => {
       
          const swipesetnotification =  res.data[0]
          
            new ServiceStore().GetDataBYFilter('order/GetdataWeekly',{"userId":swipeuserdata.webuserID}).then((res:any) => {
              if(res){
               var weektotal = 0
                  for (var i in res.data) {
                    weektotal += Number(res.data[i].replace(/\$|,/g, '')) 
                  }
                 
                
                    const spendingLimit = Number(swipesetnotification.weeklylimit) // Weekly spending limit
                    const percentOverLimit = 0.5; // 50% over the limit
                    const totalLimit = spendingLimit + (spendingLimit * percentOverLimit);

                    const weeklySpending = Math.round(weektotal) // Example: Total amount spent during the week
                    
                    if (weeklySpending > totalLimit) {
                      const buttons = document.querySelectorAll('.a-button-input');

                            buttons.forEach(function(button) {
                            button.addEventListener('click', function() {
                                // Code to execute when the button is clicked
                                console.log('Button clicked!');
                                 setIsOpen(true)
                            });
                        });
                    } 

                    const lowerPercentOverLimit = 0.2; // 20% over the limit
                    const upperPercentOverLimit = 0.5; // 50% over the limit
                    
                    const lowerLimit = spendingLimit + (spendingLimit * lowerPercentOverLimit);
                    const upperLimit = spendingLimit + (spendingLimit * upperPercentOverLimit);
                    
                    console.log('Weekly spending is 50% over the limit' ,weeklySpending ,lowerLimit ,upperLimit);
                    if (weeklySpending > lowerLimit && weeklySpending <= upperLimit) {
                      const buttons = document.querySelectorAll('.a-button-input');
                      buttons.forEach(function(button) {
                        button.addEventListener('click', function() {
                            console.log('Button clicked!');
                            setAddIsOpen(true)
                        });
                      });
                      
                    } 

                 
      
              }
            });
      
            new ServiceStore().GetDataBYFilter('order/GetdataMonthly',{"userId":swipeuserdata.webuserID}).then((res:any) => {
              if(res){
              
               var monthtotal = 0
               for (var i in res.data) {
                monthtotal += Number(res.data[i].replace(/\$|,/g, '')) 
               
                }
    
              
                    const spendingLimit = Number(swipesetnotification.monthlylimit) // Weekly spending limit
                    const percentOverLimit = 0.5; // 50% over the limit
                    const totalLimit = spendingLimit + (spendingLimit * percentOverLimit);

                    const weeklySpending = Math.round(monthtotal) // Example: Total amount spent during the week
                    
                  
                    if (weeklySpending > totalLimit) {
                      const buttons = document.querySelectorAll('.a-button-input');
                      buttons.forEach(function(button) {
                          button.addEventListener('click', function() {
                              // Code to execute when the button is clicked
                              console.log('Button clicked!');
                               setIsOpen(true)
                          });
                      });
                    }

                    const lowerPercentOverLimit = 0.2; // 20% over the limit
                    const upperPercentOverLimit = 0.5; // 50% over the limit
                    
                    const lowerLimit = spendingLimit + (spendingLimit * lowerPercentOverLimit);
                    const upperLimit = spendingLimit + (spendingLimit * upperPercentOverLimit);
                    
                    console.log('Monthly spending is 50% over the limit' ,weeklySpending ,lowerLimit ,upperLimit);

                    if (weeklySpending > lowerLimit && weeklySpending <= upperLimit) {
                      const buttons = document.querySelectorAll('.a-button-input');
                      buttons.forEach(function(button) {
                        button.addEventListener('click', function() {
                            console.log('Button clicked!');
                            setAddIsOpen(true)
                        });
                      });
                      
                    } 

                   
             
              }
              
            });
        });
      })
      }
    return (
      <>
     <ChakraProvider >
        <Modal isOpen={isOpen} onClose={handleClose} >
          <ModalOverlay />
          <ModalContent maxH="700px" maxW="1100px">
         
                <ModalBody>
                <Pocket onSubmit={FormSubmit} />
                </ModalBody>
           
          </ModalContent>
        </Modal>

        <Modal isOpen={isaddOpen} onClose={handleClose} >
          <ModalOverlay />
          <ModalContent maxH="600px" maxW="430px">
         
                <ModalBody>
                <AddPurchase onSubmit={AddPurchaseSubmit} />
                </ModalBody>
           
          </ModalContent>
        </Modal>

        <Modal isOpen={isdayOpen} onClose={handleClose} >
          <ModalOverlay />
          <ModalContent maxH="400px" maxW="250px"   position="absolute"
        top="-10px"
        right="5px">
         
                <ModalBody>
                <AddDayShow onSubmit={AddDayShowSubmit} />
                </ModalBody>
           
          </ModalContent>
        </Modal>
      </ChakraProvider>
       
      </>
    )
  }
  
  export default SwipeModal
  
  const Pocket = ({ onSubmit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClose = () => {
        onSubmit();
      };
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
  };
  const onclose = (e:any) => 
  window.close();{
};
const [data, setdata] = useState([{ name: 'week', value:   [WeekRange,WeekRange] }]);
const [Monthdata, setMonthdata] = useState([{ name: 'week', value:   [MonthRange,MonthRange] }]);


const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <text x={x} y={y} dy={6} fill={payload.value < 0 ? 'red' : 'black'}>
      {payload.value < 0 ? '-$' + Math.abs(payload.value) : '$' + payload.value}
    </text>
  );
};
// const Monthdata = [
//   { name: 'Month', value: MonthRange },
  
// ];
React.useEffect(() => {
 
  getAlldata()

}, []);
  const getAlldata = () => {
    var swipesession =  localStorage.getItem('swipe-session');

    const sessiondata = JSON.parse(swipesession)
       new ServiceStore().GetDataBYFilter('swipeuserlogin/Getdatadaliy',{webuserID:sessiondata._id}).then((res:any) => {
        console.log("sessiondata",res.data)
      const swipeuserdata =  res.data[0]

    new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy',{"userId":swipeuserdata._id}).then((res:any) => {
   
      const swipesetnotification =  res.data[0]
      
        new ServiceStore().GetDataBYFilter('order/GetdataWeekly',{"userId":swipeuserdata.webuserID}).then((res:any) => {
          if(res){
           var weektotal = 0
              for (var i in res.data) {
                weektotal += Number(res.data[i].replace(/\$|,/g, '')) 
              
              }
             
                const value =  Math.round(weektotal);
                const totalamount = Number(swipesetnotification.weeklylimit);
                
                const percentage = (value / totalamount) * 100;
                console.log(percentage); 

                if(Number(swipesetnotification.weeklylimit) <  Math.round(weektotal)){
                    setweeklyshow(true)
                    const weektotalrange =  Number(swipesetnotification.weeklylimit) - Math.round(weektotal)   
                   setWeekRange((Math.round(weektotal)- Number(swipesetnotification.weeklylimit)))
                   const arraylist = []
                   arraylist.push({ name: 'week', value:  [0,weektotalrange]})
                   arraylist.push({ name: 'week', value:  [-Number(weektotalrange),-Number(weektotalrange)] })
                    console.log("arraylist",arraylist)
                    setdata(arraylist)
                  }else{
                   const weektotalrange = Number(swipesetnotification.weeklylimit) - Math.round(weektotal)
                   setWeekRange(weektotalrange)
                    const arraylist = []
                   arraylist.push({ name: 'week', value:  [0,weektotalrange]})
                   arraylist.push({ name: 'week', value:  [-Number(weektotalrange),-Number(weektotalrange)] })
                    console.log("arraylist",arraylist)
                    setdata(arraylist)
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
                if(percentage > 50){
                  // chrome.runtime.sendMessage({ message: 'Hello from content script!' });


                }else{
                  if (percentage >= 20 && percentage <= 50) {

                  }
                }
  
          }
        });
  
        new ServiceStore().GetDataBYFilter('order/GetdataMonthly',{"userId":swipeuserdata.webuserID}).then((res:any) => {
          if(res){
          
           var monthtotal = 0
           for (var i in res.data) {
            monthtotal += Number(res.data[i].replace(/\$|,/g, '')) 
           
            }

               const monthvalue =  Math.round(monthtotal);
                const monthmax = Number(swipesetnotification.monthlylimit);
                
                const monthpercentage = (monthvalue / monthmax) * 100;
                console.log(monthpercentage); 
                if(Number(swipesetnotification.monthlylimit) <  Math.round(monthtotal)){
                    setmonthshow(true)
                    const monthtotalrange = Number(swipesetnotification.monthlylimit) - Math.round(monthtotal) 
                   setMonthRange((Math.round(monthtotal) - Number(swipesetnotification.monthlylimit)))
                   const montharraylist = []
                   montharraylist.push({ name: 'week', value:  [0,monthtotalrange]})
                   montharraylist.push({ name: 'week', value:  [-Number(monthtotalrange),-Number(monthtotalrange)] })
                    console.log("arraylist",montharraylist)
                    setMonthdata(montharraylist)
                  }else{
                   const monthtotalrange = Number(swipesetnotification.monthlylimit) - Math.round(monthtotal)
                   setMonthRange(monthtotalrange)
                   
                   const montharraylist = []
                   montharraylist.push({ name: 'week', value:  [0,monthtotalrange]})
                   montharraylist.push({ name: 'week', value:  [-Number(monthtotalrange),-Number(monthtotalrange)] })
                    console.log("arraylist",montharraylist)
                    setMonthdata(montharraylist)
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
                if(monthpercentage > 50){
                  

                }else{
                  if (monthpercentage >= 20 && monthpercentage <= 50) {
                  }
                }
         
          }
          
        });
    });
  })
  }
    return (
        <main className="main-container-270">
        <header className="brand-container-270 flex">
            <div className="pointer">
            <img src={logo} alt=""  style={{marginLeft:"-200px"}}/>
            </div>
            <div style={{marginLeft:"120px",marginTop:"-7px"}}>   
            </div> 
            <div className="pointer cross-mt" style={{marginRight:"-40px",marginTop:"-25px"}}>
            <img src={closes} alt="" onClick={handleClose}/>
            </div>
            
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
                    <div style={{marginLeft:"200px",marginBottom:"-30px",marginTop:"10px"}}>
                        <p className="text-sm font-5 pb-12 gray">
                        In a hole  {weeklyshow == false &&  <span className="font-6 orange">${WeekRange}</span>
                        }
                        {weeklyshow == true &&  <span className="font-6 orange">-${WeekRange}</span>
                        }
                        </p>
                    
                    </div>
                  
                    <div style={{marginTop:"40px"}}>
                    <BarChart width={800} height={250} data={data} > 
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    {/* <XAxis dataKey="name" /> */}
                    {/* <YAxis tickFormatter={formatYAxisTick} /> */}

                    <YAxis tick={<CustomYAxisTick />} axisLine={false}/>
                    {/* <Tooltip /> */}
                    <Legend />
                    <Bar dataKey="value" fill="#ff7d36" barSize={90}  margin={{ left: 400 }}>
                        {/* <LabelList dataKey="value"  /> */}
                    </Bar>
                    </BarChart>
                    </div>
                </div>
                <div style={{width:"50%"}}>
                    <p className="budget-title-270">This Month</p>
                    <div style={{marginLeft:"200px",marginBottom:"-30px",marginTop:"10px"}}>
                        <p className="text-sm font-5 pb-12 gray">
                        
                        In a hole {monthshow == false && <span className="font-6 orange">${MonthRange}</span>
                        }
                        
                        {monthshow == true && <span className="font-6 orange">-${MonthRange}</span>
                        }
                        </p>
                    </div>
                    
                    <div style={{marginTop:"40px"}}>
                    <BarChart width={800} height={250} data={Monthdata}  >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    {/* <XAxis dataKey="name" /> */}
                    <YAxis tick={<CustomYAxisTick />} axisLine={false}/>
                    {/* <Tooltip /> */}
                    <Legend />
                    <Bar dataKey="value" fill="#ff7d36" barSize={90}  margin={{ left: 400 }} >
                        {/* <LabelList dataKey="value" position="top" /> */}
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
        )
    
};



const AddPurchase = ({ onSubmit }) => {
    const handleClose = () => {
        onSubmit();
      };
      const [datalist, setdatalist] = useState([]);

      const [purchasevalue, setpurchasevalue] = useState("");
      const [purchasemaxrang, setpurchasemaxrang] = useState(10);
      const [purchaseminrang, setpurchaseminrang] = useState(1);
    
      const [needvalue, setneedvalue] = useState("");
      const [needmaxrang, setneedmaxrang] = useState(10);
      const [needminrang, setneedminrang] = useState(1);

      React.useEffect(() => {
        getAlldata()
      }, []);
      
      const getAlldata = () => {
   
       var swipesession =  localStorage.getItem('swipe-session');

       const sessiondata = JSON.parse(swipesession)
          new ServiceStore().GetDataBYFilter('swipeuserlogin/Getdatadaliy',{webuserID:sessiondata._id}).then((res:any) => {
          
         const swipeuserdata =  res.data[0]
         console.log("swipeuserdata",res.data)
         const data = {"userId":swipeuserdata._id}
console.log("data",data)
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
    })
      }
     
      const onChangepurchase = (event:any) => {
        event.preventDefault();
        console.log("event.target.value",event.target.value)
        // setpurchasemaxrang(event.target.value)
        const dataobj = {"purchaselimit":event.target.value,id:datalist[0]._id}
          new ServiceStore().UpdateData('swipeaddpurchase/Update/'+datalist[0]._id,dataobj).then((res:any) => {
             getAlldata()
          });
          //  console.log("values",values ,Montlymaxrang)
          
      }
      const onChangeneedvalue = (event:any) => {
        event.preventDefault();
        console.log("event.target.value",event.target.value)
        // setneedmaxrang(event.target.value)
        const dataobj = {"needlimit":event.target.value,id:datalist[0]._id}
          new ServiceStore().UpdateData('swipeaddpurchase/Update/'+datalist[0]._id,dataobj).then((res:any) => {
             getAlldata()
          });
          //  console.log("values",values ,Montlymaxrang)
          
      }
      
    return (
        <main >
        <header className="brand-container flex">
          <div className="brand-img pointer">
            <img src={logo} alt="" className="mr-40"/>
          </div>
          {/* <div style={{marginTop:"2px",marginLeft:"-8px",marginRight:"12px"}}> */}
          <div className="dropdowmt">
          </div>
          {/* </div> */}
          <div className="pointer cros-mt">
          
            <img src={closes} alt="" onClick={handleClose}/>
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
                onInput={(e) => onChangepurchase(e)} 
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
                 onInput={(e) => onChangeneedvalue(e)} 
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
        <p className="link-text" >Learn More on <a href="#">SwipeSwipe.com</a></p>
    
      </main>
        )
    
};

const AddDayShow = ({onSubmit}) =>{
  const handleClose = () => {
    console.log("dddddddddddddddddd")
    onSubmit();
  };


  const [DailyRange, setDailyRange] = useState(0);
  const [daywidth, setdaywidth] = useState("");
  const [dailyis, setdailyis] = useState(false);
  const [daytotal, setdaytotal] = useState(0)

  const [WeekRange, setWeekRange] = useState(0);
  const [weekwidth, setweekwidth] = useState("");
  const [weeklyshow, setweeklyshow] = useState(false);

  const [WeekGrennShow, setWeekGrennShow] = useState(false);

  const onNext = (e:any) => {
  };
  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
React.useEffect(() => {
 
  getAlldata()

}, []);
const getAlldata = () => {

 var swipesession =  localStorage.getItem('swipe-session');

       const sessiondata = JSON.parse(swipesession)
          new ServiceStore().GetDataBYFilter('swipeuserlogin/Getdatadaliy',{webuserID:sessiondata._id}).then((res:any) => {
          
         const swipeuserdata =  res.data[0]
         console.log("swipeuserdata",res.data)
         const data = {"userId":swipeuserdata._id}

  new ServiceStore().GetDataBYFilter('swipesetnotification/Getdatadaliy',data).then((res:any) => {
    // if(res){
    //   console.log("montlymaxrang",res)
    //   if(Number(res.data[0].monthlylimit) )
     
    // }
    const swipesetnotification =  res.data[0]
    console.log("swipesetnotification",swipesetnotification)
      new ServiceStore().GetDataBYFilter('order/Getdatadaliy',{"userId":swipeuserdata.webuserID}).then((res:any) => {
        if(res){
         var daytotal = 0
        for (var i in res.data) {
           daytotal += Number(res.data[i].replace(/\$|,/g, '')) 
        }
        console.log("daytotal",daytotal)
        setdaytotal(Math.round(daytotal))
     
        
      }
      });


      new ServiceStore().GetDataBYFilter('order/GetdataWeekly',{"userId":swipeuserdata.webuserID}).then((res:any) => {
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
          setweekwidth("85%")
        }
       } 

        }
      });

  });
})
}
  return (
    <>
      <main >
      <header className="brand-container-269 flex">
      
        <div className="brand-img-269 pointer">
          <img src={logo} alt="" />
        </div>
        
       
        <div className="pointer" >
            <img src={closes} alt="" onClick={handleClose} style={{marginTop:"-10px",marginLeft:"20px",width:"20px"}}/>
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
            <div className="budget-rapper flex" style={{width : weekwidth ,marginTop:"-50px",marginRight:"10px"}}></div>
               <p className="btp" style={{marginTop:"-35px"}}>${WeekRange}</p>
            </span>
           }  
           {weeklyshow == true && WeekGrennShow == false && 
           <span>
              <div className="budget-rapper flex"  style={{width : "85%",background:"red",marginTop:"-50px",marginRight:"10px"}}>
                </div>
                <p  className="btp" style={{color: "white",marginTop:"-35px"}}>-${WeekRange}</p>
              </span>
            }
            {WeekGrennShow == true && weeklyshow == false && 
           <span>
               <div className="budget-rapper flex" style={{width : weekwidth,background:"green",marginTop:"-50px",marginRight:"10px"}}></div>
               <p className="btp" style={{marginTop:"-35px"}}>${WeekRange}</p>
           
              </span>
            }
          </div>
        </div>
        <div className="flex-center">
          <a  className="learn-more">Learn more</a>
        </div>
      </div>
    </main>
    </>
  )
}