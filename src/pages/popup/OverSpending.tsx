
import React ,{useState}from "react";
import '../style/main.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import logo from '../../public/main-logo.png'
import menu from '../../public/menu.svg'
import cross from '../../public/cross.svg'
import chart1 from '../../public/chart-1.svg'
import { useNavigate } from "react-router-dom";

function OverSpending() {

 
  const navigate = useNavigate();
  const onNext = (e:any) => {
    console.log("ddddddd",e)
    navigate("/onlinespending");
  };


  console.log("ddddddd")
  const onclose = (e:any) => 
  window.close();{
};
  return (
    <>

 <div className="main">
      <div className="header">
        <div className="logo-271">
          <img src={logo} width="67" alt="logo" />
        </div>
        <div className="menu-header">
          {/* <img src={menu} alt="menu" className="menu" /> */}
          <img src={cross} alt="close" className="close" onClick={(e) => {onclose(e)}}/>
        </div>
      </div>
      <div className="container">
        <div className="chart">
          <h2 className="title-271">Spending Smarter Leads to Wealth</h2>
          <img src={chart1} alt="chart" className="line-chart" />
          <div className="bottom">
            <div className="overspending">
              <div className="bullet one"></div>
              <div className="text-one">Overspending</div>
            </div>
            <div className="overspending">
              <div className="bullet two"></div>
              <div className="text-two"><p>Wealth</p></div>
            </div>
          </div>
        </div>

        <div className="list">
          <div className="number">1</div>
          <div className="des">
            <p>From day one you can make your life better</p>
          </div>
        </div>
        <div className="list">
          <div className="number">2</div>
          <div className="des">
            <p>Small changes in spending lead to big changes in wealth</p>
          </div>
        </div>
        <div className="list">
          <div className="number">3</div>
          <div className="des">
            <p>
              Use our tools everyday for maximum results, we make it as easy as
              1,2,3
            </p>
          </div>
        </div>
        <button className="btn" onClick={(e) => {
              onNext(e)
            }}>Next</button>

        <div className="bullet-points">
          <div className="point active"></div>
          <div className="point"></div>
          <div className="point"></div>
          <div className="point"></div>
        </div>
      </div>
    </div>
 
    </>
  )
}

export default OverSpending
