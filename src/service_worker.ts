// import {initializeCoursesFromApiAsync} from './api/courses-api'
// import {AlarmKeys} from "./models/alarm-keys";
import Alarm = chrome.alarms.Alarm;

const syncIntervalInMinutes = 30
const doGetMock = false
// chrome.browserAction.onClicked.addListener(function () {
//   chrome.tabs.create({ url: chrome.runtime.getURL("content/swipe-main-banner/App.tsx") });
// });

chrome.runtime.onInstalled.addListener(onInstalledAsync)

// chrome.alarms.create(AlarmKeys.SyncCourses, {
//   delayInMinutes: syncIntervalInMinutes,
//   periodInMinutes: syncIntervalInMinutes
// })
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   chrome.extension.getViews({ type: 'popup' }).forEach((popup) => {
//     popup.postMessage(message, window.location.origin);
// });  });



// let messageForPopup = null;

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.requestMessage) {
//     sendResponse({ message: messageForPopup });
    
//   } else {
//     messageForPopup = message;
//   }
// });

// async function getMessageForPopup() {
//   return messageForPopup;
// }

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // chrome.tabs.create({
//   //   url: chrome.runtime.getURL('pages/popup/index.html')
//   // });
//   // chrome.windows.create({
//   //   url: chrome.runtime.getURL('pages/popup/index.html'),
//   //   type: 'popup',
//   //   width: 600,
//   //   height: 400,
//   //   focused: true
//   // });
//   if (message.openPopup) {
//     //  chrome.tabs.create({ url: chrome.runtime.getURL("pages/popup/index.html") });

   
//   }
// })




chrome.alarms.onAlarm.addListener(onSyncCoursesAlarmAsync)

async function onSyncCoursesAlarmAsync(alarm: Alarm) {
  // if (alarm.name !== AlarmKeys.SyncCourses) return
  // await initializeCoursesFromApiAsync(doGetMock)
}

async function onInstalledAsync() {
  console.log('extension installed')

  // await initializeCoursesFromApiAsync(doGetMock)
}









