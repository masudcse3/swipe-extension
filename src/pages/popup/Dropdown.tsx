import React, { useState } from 'react';
import menu from '../../public/menu.svg'
import { useNavigate } from "react-router-dom";
import '../style/main.css'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Dropdown = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isNestedSubMenuOpen, setIsNestedSubMenuOpen] = useState(false);
  const [FilterTogal, setFilterTogal] = useState(false);
  const navigate = useNavigate();

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleNestedSubMenu = () => {
    console.log("dddddddddddddddddddddddddd")
    setIsOpen(!isOpen);
    setIsNestedSubMenuOpen(!isNestedSubMenuOpen);
  };


  const FilterstoggleNestedSubMenu = () =>{
    setisOpenFilters(!isOpenFilters)
    setFilterTogal(!FilterTogal);
  }


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFilters, setisOpenFilters] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="dropdown">
      {/* <button className="dropdown-toggle" onClick={toggleSubMenu}>
        Menu
      </button> */}
      <img src={menu} alt=""    onClick={toggleSubMenu}/>
      {isSubMenuOpen && (
        <div className="submenu">
          <button className="dropdown-item"  onClick={(e) => {navigate("/spending")}} >Overview</button>
          <button className="dropdown-item" onClick={toggleNestedSubMenu}>
            Reports
           
             {isOpen ? <IoIosArrowUp className='dropicone'/> : <IoIosArrowDown className='dropicone'/>}
             
          
        </button>
        {isNestedSubMenuOpen && (
            <div className="nested-submenu">
              <button className="dropdown-item" style={{width:"100%"}} onClick={(e) => {navigate("/dailyReport")}}>Daily</button>
              <button className="dropdown-item" style={{width:"100%"}} onClick={(e) => {navigate("/weeklyReport")}}>Weekly</button>
              <button className="dropdown-item" style={{width:"100%"}} onClick={(e) => {navigate("/monthlyReport")}}>Monthly</button>
            </div>
          )}
        <button className="dropdown-item" onClick={FilterstoggleNestedSubMenu}>
        Filters
       
        {isOpenFilters ? <IoIosArrowUp className='dropicone1'/> : <IoIosArrowDown className='dropicone1'/>}
     
           </button>
           {FilterTogal && (
            <div className="nested-submenu">
              <button className="dropdown-item" style={{width:"100%"}} onClick={(e) => {navigate("/notification")}}>Allowances</button>
              <button className="dropdown-item"  style={{width:"100%"}} onClick={(e) => {navigate("/monitor")}}>PurchaseSize</button>
              <button className="dropdown-item" style={{width:"100%"}} onClick={(e) => {navigate("/addstore")}}>Frequency</button>
            </div>
          )}
        <button className="dropdown-item" onClick={(e) => {navigate("/messages")}}>Message</button>
      
        </div>
      )}
    </div>
  );
};

export default Dropdown;