
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
import Select from "react-select";
import { AiFillDelete } from "react-icons/ai";
import Dropdown from "./Dropdown";
function AddStore() {
  const navigate = useNavigate();
  const [datalist, setdatalist] = useState([]);
  const [Weeklyvalue, setWeeklyvalue] = useState("5");
  const [Weeklymaxrang, setWeeklymaxrang] = useState("10");
  const [Weeklyminrang, setWeeklyminrang] = useState("0");
  const [show, setShow] = useState(false);
  const [storename, setstorename] = useState("");
  const [list, setlist] = useState({});
  const [tablelist, settablelist] = useState([]);
  
  const [optionList, setoptionList] = useState([]);
  const [useroptionList, setuseroptionList] = useState([]);

const handleShow = () => setShow(true);
const handleClose = () => {
  setShow(false);
  setWeeklyerror("")
  setstoreerror("")
  setUserAddError("")
}
const [storeshow, setstoreShow] = useState(false);
const handlestoreShow = () => setstoreShow(true);
const handlestoreClose = () => setstoreShow(false);
  const onNext = (e:any) => {
    navigate("/addprosperity");
  };
  const [selectedUserOptions, setSelectedUserOptions] = useState();

  const [selectedOptions, setSelectedOptions] = useState();
  const handleSelect = (datas:any)=> {
    setSelectedOptions(datas);
    // setSelectedUserOptions(datas);
    if(datas.label != ""){
    // console.log("useroptionList",useroptionList.length)
    setUserAddError("")
    const usertoken = localStorage.getItem("accessToken")
   const user =   JSON.parse(usertoken) 

   var item =  useroptionList.filter(v => v.label === datas.label)
console.log("item",datas)
if(item.length  != 0){
  new ServiceStore().GetDataBYFilter('addstore/GetdatadaliyByID',{"userId":user.data._id,"storeId":datas.value}).then((res:any) => {
    if(res){
      setSelectedUserOptions({"value":res.data._id,"label":res.data.storename});
     console.log("setlist",res.data)
    setWeeklyvalue(res.data.shopWeeklylimit)
    setWeeklymaxrang(res.data.shopWeeklymaxrange)
      setlist(res.data)
      // getAlldata()
    }
  });
}
    if(useroptionList.length < 10){
      if(item.length  == 0){
            new ServiceStore().InsertData('addstore',{"userId":user.data._id,"storeId":datas.value,"storename":datas.label,"shopWeeklymaxrange":"10","shopWeeklylimit":"5",}).then((res:any) => {
              if(res){
                // console.log("res",res)
                getAlldata()
                setSelectedOptions("")
                // handlestoreClose()
              }
          });
        }else{
          // setUserAddError("Store allready added")
          
        }
    }else{
      setUserAddError("you should be able to add up to 10 retaile")
    }
    }
  }


  const handleUserSelect = (data:any)=> {
    setstoreerror("")
    setSelectedUserOptions(data);
    new ServiceStore().GetDataByID('addstore/',data.value).then((res:any) => {
      if(res){
        console.log("dddddddddddddd",res.data)
      //  console.log("Weeklyvalue",res.data)
       setWeeklyvalue(res.data.shopWeeklylimit)
       setWeeklymaxrang(res.data.shopWeeklymaxrange)
        setlist(res.data)
      }
    });
  }
  React.useEffect(() => {
 
    getAlldata()
    
  }, []);
  const getAlldata = () => {
const usertoken = localStorage.getItem("accessToken")
   const user =   JSON.parse(usertoken) 
   const data = {"userId":user.data._id}
   const arrayList = [];
    new ServiceStore().GetDataBYFilter('storemaster/Getdatadaliy',data).then((res:any) => {
      if(res){
        setdatalist(res.data)
        for(var i in res.data){
          arrayList.push( { value: res.data[i]._id, label: res.data[i].storename })
        }
        setoptionList(arrayList)
      }
    });
    const userstoreList = []
    new ServiceStore().GetDataBYFilter('addstore/Getdatadaliy',data).then((res:any) => {
      if(res){
        for(var i in res.data){
          userstoreList.push( { value: res.data[i]._id, label: res.data[i].storename })
        }
    //  console.log("res.data",res.data)
        settablelist(res.data)
        setuseroptionList(userstoreList)
        // setSelectedUserOptions(userstoreList[0])
        // console.log("Weeklyvalue",res.data)
       setWeeklyvalue(res.data[0].shopWeeklylimit)
        setWeeklymaxrang(res.data[0].shopWeeklymaxrange)
         setlist(res.data[0])
        //  setSelectedOptions({ value: res.data[0]._id, label: res.data[0].storename })
      }
    });
  }
  const getTabledata  = () => {
    const usertoken = localStorage.getItem("accessToken")
   const user =   JSON.parse(usertoken) 
   const data = {"userId":user.data._id}
    new ServiceStore().GetDataBYFilter('addstore/Getdatadaliy',data).then((res:any) => {

        console.log("DDDDDDDDDDDDDDD",res.data)
        settablelist(res.data)
      })
  }
  const [storeerror, setstoreerror] = useState("");
  const onChangeMonthly = (event:any) => {
    setWeeklyvalue(event.target.value)
    setstoreerror("")
    if(selectedUserOptions != undefined){
      const dataobj = {"shopWeeklylimit":event.target.value,id:selectedUserOptions.value}
        new ServiceStore().UpdateData('addstore/Update/'+selectedUserOptions.value,dataobj).then((res:any) => {
        console.log("UpdateDatares::::",res)
          getTabledata()

          });
    }else{
      setstoreerror("Please select store first then set the limit")
    }
  
  }
  const [Weeklyerror, setWeeklyerror] = useState("");

  const onChangeshoapweeklyMaxAmount =  (event:any) => {
    event.preventDefault();
    setWeeklyerror("")
    setstoreerror("")


    // console.log("selectedUserOptions",selectedUserOptions ,list)
    console.log("selectedUserOptions:::::::::::",selectedUserOptions)

    if(selectedUserOptions != undefined){
        if(Number(event.target.value) > Number(list.shopWeeklylimit)){
          const dataobj = {"shopWeeklymaxrange":event.target.value,id:selectedUserOptions.value}
          // console.log("dataobj",dataobj)
          new ServiceStore().UpdateData('addstore/Update/'+selectedUserOptions.value,dataobj).then((res:any) => {
            console.log("res",res)
            setWeeklymaxrang(event.target.value)
            // getAlldata()
            handleClose()
          });
        }else{
          setWeeklyerror("Please decrease your weekly limit")
        }
  }
    else{
      setstoreerror("Please select store first then set the limit")
    }
  }
  const onChangestorename = (event:any) => {
    setstorename(event.target.value)
  
  }
  const [UserAddError, setUserAddError] = useState("");

  const AddStore = () => {
    console.log("useroptionList",useroptionList.length)
    setUserAddError("")
    const usertoken = localStorage.getItem("accessToken")
   const user =   JSON.parse(usertoken) 

   var item =  useroptionList.filter(v => v.label === selectedOptions.label)
console.log("item",item ,useroptionList)
    if(useroptionList.length < 10){
      if(item.length  == 0){
            new ServiceStore().InsertData('addstore',{"userId":user.data._id,"storeId":selectedOptions.value,"storename":selectedOptions.label,"shopWeeklymaxrange":"10","shopWeeklylimit":"5",}).then((res:any) => {
              if(res){
                console.log("res",res)
                getAlldata()
                setSelectedOptions("")
                // handlestoreClose()
              }
          });
        }else{
          // setUserAddError("Store allready added")
        }
    }else{
      setUserAddError("you should be able to add up to 10 retaile")
    }

  };
  const AddStoreMAster = () => {
    new ServiceStore().InsertData('storemaster',{"storename":storename,"code":storename}).then((res:any) => {
      
      })
  }

  const DeleteData = (val:any) =>{
    setstoreerror("")
    // console.log("selectedUserOptions" ,val)
    if(selectedUserOptions != undefined){
      new ServiceStore().DeleteData('addstore/Delete/',val._id).then((res:any) => {
        getAlldata()
        handleClose()
        setSelectedUserOptions("")
      });
    }
    else{
      setstoreerror("Please select store first then Delete")
    }

  }
  const onclose = (e:any) => 
    window.close();{
  };
  return (
    <>
   
        <main className="main-container">
      <header className="brand-container flex">
          {/* <div className="go-back backto-go"  onClick={(e) => {
             navigate("/monitor");
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
        
        <p className="secondary-title font-5">
          Monitoring where we buy the most helps gain control
        </p>
        <p className="title pt-8 font-4">Notify me when I shop weekly more than</p>
        <div className="limit-container">
          <div className="limit-process">
          <input
              type="range"
              min={Weeklyminrang}
              max={Weeklymaxrang}
              value={Weeklyvalue}
              className="slider-range-288 w-full"
              onChange={(e) => onChangeMonthly(e)} 

              id="slide-range"
            />
            <div className="value-container flex-between item-center">
              <div className="flex gap-40 item-center">
                <p className="primary-budget">{Weeklyminrang}</p>
              </div>
              <p className="secondary-budget">{Weeklyvalue}</p>
              <div className="flex gap-8 item-center">
                {/* <p className="total-budget">${Weeklymaxrang}</p>
                <img src={edit} alt="" /> */}
                 {show == false && 
                <p className="total-budget">{Weeklymaxrang}</p>
               }
                {show == false && 
                <img src={edit} alt=""  onClick={(e) => handleShow()}/>
                
                }
                {show == true && 
                  <input
                    type="text"
                    name= "monthly"
                    onChange={(e) => onChangeshoapweeklyMaxAmount(e)} 
                    defaultValue={Weeklymaxrang}
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
                   {/* <input
                    type="text"
                    name= "storename"
                    onChange={(e) => onChangestorename(e)} 
                    className="inputmarkets"
                  />
                  <button className="store-btnadd font-6 center pointer" onClick={(e) => {AddStoreMAster()}}>Add</button> */}

                  
            {storeerror && 
            <span style={{color:"red"}}>{storeerror}</span>
            }
        <div className="flex-between py-4">
          <p className="secondary-title">Choose store</p>
          {/* <p className="remove-btn"><AiFillDelete size={20} onClick={(e) => {DeleteData()}}></AiFillDelete></p> */}
        </div>
       
          {/* <div className="py-4">
       
              <Select
                options={useroptionList}
                placeholder="Choose Store"
                value={selectedUserOptions}
                onChange={handleUserSelect}
                isSearchable={true}
                className="storemarket"
              />
          

          </div> */}
          <div className="py-4" >
              <Select
                options={optionList}
                placeholder="Select Store"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                className="storemarket"
              />
              <div className="storeerror">
                {UserAddError &&
                <span style={{color:"red"}}>{UserAddError}</span>
                }
              </div>
          </div>
        
         
        {/* {storeshow == true && 
        <div style={{display:"flex"}}>
        <button className="store-btnadd font-6 center pointer" onClick={(e) => {AddStore()}}>Add</button>
        <button className="store-btnCancele font-6 center pointer" onClick={(e) => {setstoreShow(false) }}>Cancel</button>
        </div>
        } */}
        
        {/* {storeshow == false && 
        <button className="store-btn font-6 center pointer"   onClick={(e) => {handlestoreShow()}}>Add a Store</button>
        } */}
        <div className="box-wrap">
        <div className="table-wrap">
          {tablelist.length > 0 &&
            <table className="table-wrapth">
                <tr >
                    <th className="thtd">No</th>
                    <th className="thtd">Name</th>
                    <th className="thtd">Limit</th>
                    <th className="thtd">Delete</th>
                </tr>
                {tablelist.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td className="thtd">{key + 1}</td>
                            <td className="thtd">{val.storename}</td>
                            <td className="thtd">{val.shopWeeklylimit}</td>
                            <td className="thtd"><p className="remove-btn"><AiFillDelete size={20} onClick={(e) => {DeleteData(val)}}></AiFillDelete></p>
</td>

                        </tr>
                    )
                })}
            </table>
          }
            </div>
         
    </div>
        <button className="notify-btn font-6 center pointer mb-10" onClick={(e) => {
              onNext(e)
              
            }}>
          Monitor where you buy
        </button>
      </section>
    </main>
    </>
  )
}

export default AddStore
