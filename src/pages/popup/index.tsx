import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter  } from 'react-router-dom';

console.log('popup script::::::::::::::::::;')
// chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {message: "hello"});
// });

const root = document.querySelector('#root')

render(<BrowserRouter><App /></BrowserRouter>, root)
