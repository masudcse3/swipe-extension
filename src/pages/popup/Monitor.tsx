
import React ,{useState}from "react";
import '../style/main.css'
import logo from '../../public/logo.png'
import menu from '../../public/menu.svg'
import closes from '../../public/cross.svg'
import edit from '../../public/edit.svg'
import banner from '../../public/banner.jpg'
import { useNavigate } from "react-router-dom";
import ServiceStore from "../util/ServiceStore";
import back from '../../public/back.svg'
import Dropdown from "./Dropdown";
function Monitor() {
  const navigate = useNavigate();
  const [datalist, setdatalist] = useState([]);
  const [Purchasevalue, setPurchasevalue] = useState("");
  const [Purchasemaxrang, setPurchasemaxrang] = useState("1000");
  const [Purchaseminrang, setPurchaseminrang] = useState("0");
  const [Weeklyerror, setWeeklyerror] = useState("");

  const onNext = (e:any) => {
    navigate("/addstore");
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
  new ServiceStore().GetDataBYFilter('monitor/Getdatadaliy',data).then((res:any) => {
    if(res){
      setPurchasevalue(res.data[0].purchaselimit)
      setPurchasemaxrang(res.data[0].purchasemaxrang)
      setdatalist(res.data)
    }
const purchaselimit = res.data[0].purchaselimit
    new ServiceStore().GetDataBYFilter('order/Getdatadaliy',{"userId":user.data.webuserID}).then((res:any) => {
      if(res){
        var daytotal = 0
      for (var i in res.data) {
          daytotal += Number(res.data[i].replace(/\$|,/g, '')) 
        
      }
      new ServiceStore().GetDataBYFilter('usermessage/Getdatadaliy',{"webuserID":user.data.webuserID,userId:user.data._id}).then((res:any) => {
          console.log("::::::::::",res.data)
          console.log(Math.round(daytotal) , purchaselimit) 
            const totallimitcount = Math.round(daytotal)
            if(Number(purchaselimit) <  Math.round(daytotal)){
              const mes = "hello , your daily Purchases limit is"+ "  $"+purchaselimit+"  "+ "and you Purchases more then your limit, your Purchases order value is"+ "  $"+totallimitcount
              console.log("mes",mes)
              if(res.data.length == 0){
                new ServiceStore().InsertData('usermessage',{userId:user.data._id,"webuserID":user.data.webuserID,"message":mes,"type":"purchaselimit","name":user.data.email}).then((res:any) => {
                });
              }
            }
      })
      }

    });
  });

  
}




const onChangeMonthly = (event:any) => {
  setPurchasevalue(event.target.value)
  const dataobj = {"purchaselimit":event.target.value,id:datalist[0]._id}
  console.log("dataobj",dataobj)
  new ServiceStore().UpdateData('monitor/Update/'+datalist[0]._id,dataobj).then((res:any) => {
    console.log("res:::::::::",res)
    getAlldata()
    });
}

const onChangePurchaseMaxAmount =  (event:any) => {
  event.preventDefault();
  setWeeklyerror("")
  if(Number(event.target.value) > Number(datalist[0].purchaselimit)){
    const dataobj = {"purchasemaxrang":event.target.value,id:datalist[0]._id}
    new ServiceStore().UpdateData('monitor/Update/'+datalist[0]._id,dataobj).then((res:any) => {
      getAlldata()
      handleClose()
    });
  }else{
    setWeeklyerror("Please decrease your purchase limit")
  }
}

const [show, setShow] = useState(false);

const handleShow = () => setShow(true);
const handleClose = () => {
  setShow(false);
  setWeeklyerror("")
}
  return (
    <>

  <main className="main-container">
      
      <header className="brand-container flex">
        {/* <div className="go-back backto-go"  onClick={(e) => {
             navigate("/notification");
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
          <p className="title font-5">
            Notify me if any of my purchases are more than
          </p>
          <div className="limit-container">
            <div className="limit-process">
            <input
                type="range"
                min={Purchaseminrang}
                max={Purchasemaxrang}
                value={Purchasevalue}
                className="slider-range-288 w-full"
                onChange={(e) => onChangeMonthly(e)} 

                id="slide-range"
              />
              <div className="value-container flex-between item-center">
                <div className="flex gap-40 item-center">
                  <p className="primary-budget">${Purchaseminrang}</p>
                  <p className="secondary-budget">${Purchasevalue}</p>
                </div>
                <div className="flex gap-8 item-center">
                  {/* <p className="total-budget">${Purchasemaxrang}</p>
                  <img src={edit} alt="" /> */}
                  {show == false && 
                  <p className="total-budget">${Purchasemaxrang}</p>
                }
                  {show == false && 
                  <img src={edit} alt=""  onClick={(e) => handleShow()}/>
                  
                  }
                  {show == true && 
                    <input
                      type="text"
                      name= "monthly"
                      onChange={(e) => onChangePurchaseMaxAmount(e)} 
                      defaultValue={Purchasemaxrang}
                      className="inputmarkets"
                    />
                  }
                  {show == true && 
                  <img src={closes} alt="" onClick={(e) => {handleClose()}}/>
                  }
                </div>
              </div>
              {Weeklyerror && 
              <span style={{color:"red"}}>{Weeklyerror}</span>
            }
            </div>
          </div>
          <p className="text-secondary-274">Purchases add up very quickly</p>
          <div className="banner-img">
          <img src={banner} alt="" />
          </div>
          <p className="text-secondary-274 p-8" style={{marginTop:"10px"}}>
            Awareness and monitoring help us gain more control
          </p>
        </div>
        <button className="notify-btn font-6 center pointer" onClick={(e) => {
              onNext(e)
              
            }}>
          Monitor where you buy
        </button>
      </section>
    </main>
    </>
  )
}

export default Monitor
