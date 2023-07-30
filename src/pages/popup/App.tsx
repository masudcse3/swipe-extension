import React ,{useState}from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import SwipeScreen from "./SwipeScreen"
import Signup from "./Signup"
import OverSpending from "./OverSpending";
import OnlineSpending from "./OnlineSpending"
import SwipeMoney from "./SwipeMoney"
import Financial from "./Financial"
import Notification from "./Notification"
import Monitor from "./Monitor"
import AddStore from "./AddStore"
import AddProsperity from "./AddProsperity"
import Wealthier from "./Wealthier"
import Spent from "./Spent"
import Messages from "./Messages"
import UserDetails from "./UserDetails"
import AvailableMoney from "./AvailableMoney"
import Pocket from "./Pocket"
import AddPurchase from "./AddPurchase"
import Savings from "./Savings"
import DailyReport from "./DailyReport"
import WeeklyReport from "./WeeklyReport"
import MonthlyReport from "./MonthlyReport"
import Spending from "./Spending"
import Login from "./Login"
import ResetPassword from "./ResetPassword"




const App = (): JSX.Element => {
const auth = localStorage.getItem("accessToken")
// console.log("auth::::::::",auth)
const navigate = useNavigate();

// window.addEventListener('message', (event) => {
//   console.log('Received data:', event.data);
//   navigate("/pocket");
// });
// React.useEffect(() => {
//   chrome.runtime.sendMessage({ requestMessage: true }, (response) => {
//     console.log("response.message",response.message)
//     navigate("/pocket");
//   });
  
// }, []);
const [message, setMessage] = useState(null);

// React.useEffect(() => {
//   const openPopupDirectly = () => {
//     chrome.windows.getCurrent((currentWindow) => {
//       const isPopupOpen = chrome.extension.getViews({ type: 'popup' }).length > 0;
//       if (!isPopupOpen && currentWindow.type === 'normal') {
//         chrome.windows.create({
//           url: chrome.runtime.getURL('popup.html'),
//           type: 'popup',
//           width: 600,
//           height: 400
//         });
//       }
//     });
//   };

//   const storedMessage = chrome.extension.getBackgroundPage().getMessageForPopup();
//   if (storedMessage) {
//     setMessage(storedMessage);
//   } else {
//     openPopupDirectly();
//   }
// }, []);

  return (
   
 
      // <Router>
        <Routes>
          
            <Route path="/*" element={<Navigate to={localStorage.getItem("accessToken") ? "notification" : "/swipeScreen"} />} />
           <Route path="/swipeScreen" element={<SwipeScreen />} />
           <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="overSpending" element={<OverSpending />} />
          <Route path="/onlinespending" element={<OnlineSpending />} />
          <Route path="/swipemoney" element={<SwipeMoney />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/addstore" element={<AddStore />} />
          <Route path="/addprosperity" element={<AddProsperity />} />
          <Route path="/wealthier" element={<Wealthier />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/userDetails/:id" element={<UserDetails />} />
          <Route path="/availablemoney" element={<AvailableMoney />} />
          <Route path="/spent" element={<Spent />} />


          {/* <Route path="/pocket" element={<Pocket />} />
          <Route path="/addpurchase" element={<AddPurchase />} /> */}
          <Route path="/savings" element={<Savings />} />
          <Route path="/dailyReport" element={<DailyReport />} />
          <Route path="/weeklyReport" element={<WeeklyReport />} />
          <Route path="/monthlyReport" element={<MonthlyReport />} />
          <Route path="/spending" element={<Spending />} />

     

          
          
          
          
          
          
          <Route path="/" element={<Navigate replace to="/" />} />
        </Routes>
      // </Router>

    );
  
}

export default App