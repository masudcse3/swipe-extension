import React from 'react';
import { render } from 'react-dom';
import AllCheckout from "./AllCheckout";
import AppRouter from "./AppRouter";


const rootEle = document.createElement('div')
rootEle.id = "swipe-swipe-root"

document.body.appendChild(rootEle)

render(<AppRouter />, rootEle)
