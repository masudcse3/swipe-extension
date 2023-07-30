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
import React ,{useState} from "react";
import uuid from 'react-native-uuid';
import $ from 'jquery';
import ServiceStore from "../../pages/util/ServiceStore"
import {useChromeStorageLocal} from 'use-chrome-storage';
import axios from 'axios';
import cheerio from 'cheerio';

function AllCheckout() {
  // chrome.runtime.onMessage.addListener(
  //   function(request, sender) {
  //     console.log("Data::::::",request.message)
  //     // alert("Contentscript has received a message from from background script: '" + request.message + "'");
  //  });
 
  React.useEffect(() => {
 
    Alldata()
  
  }, []);

  const Alldata = () => {


  var webName = window.location.href.split(".")[1]

//  var APIURL = "http://localhost:3002/"
 var APIURL = " https://app.swipeswipe.co/"

var uniqueID = uuid.v4()
localStorage.setItem('username', uniqueID);
 var userId =  localStorage.getItem('username');
  var data = {"userId": userId}
  chrome.storage.sync.get(['value'], function(items) {
    console.log('session retrieved',items.value);
    if(Object.keys(items).length == 0){
         const requestOptions = {
          method: 'POST',
          headers: { 'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST',"Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
          body: JSON.stringify(data)
      };
      fetch(APIURL+'admin/user', requestOptions)
          .then(response => response.json())
          .then(datas =>{
            console.log("sucesss",datas)
            chrome.storage.sync.set({'key': 'swipe-session', 'value': datas.message}, function() {
              console.log('Settings saved');
              localStorage.setItem('swipe-session', JSON.stringify(datas.message));
            });
          });

    }else{
      localStorage.setItem('swipe-session', JSON.stringify(items.value));
    }
  });
  var swipesession =  localStorage.getItem('swipe-session');
  

  // React.useEffect(() => {
  // }, []);
 

  if(webName == 'amazon'){


      
    var div = document.getElementsByClassName('a-row a-spacing-none item-row')
     console.log("div",div)
    if(div.length > 0){
      var dataamount  = document.getElementsByClassName('a-color-price a-size-medium a-text-right grand-total-price aok-nowrap a-text-bold a-nowrap')[0].innerHTML
      console.log("dataamount",dataamount)
      var UL = document.getElementsByClassName('displayAddressLI displayAddressFullName')[0].innerHTML +  document.getElementsByClassName('displayAddressLI displayAddressAddressLine1')[0].innerHTML +  document.getElementsByClassName('displayAddressLI displayAddressCityStateOrRegionPostalCode')[0].innerHTML
        for (var i = 0; i < div.length; i++) {
          var name = div[i].getElementsByClassName('a-text-bold')[0].innerHTML.split("\n")[1]
          var amount = div[i].getElementsByClassName('a-color-price')[0].getElementsByClassName('a-text-bold')[0].innerHTML.replace(/\s/g, "")
    
          var obj = {"website":"amazon","username": userId,"totalitempurchase":div.length,"address":UL,"Amount":amount,
          "userId":JSON.parse(swipesession)._id,"itemName":name,"TotalAmount":dataamount.replace(/\s/g, "") }
          console.log("obj",obj)

          const requestOptions = {
            method: 'POST',
            headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
            body: JSON.stringify(obj)
        };
        fetch(APIURL+'admin/order', requestOptions)
            .then(response => response.json())
            .then(data =>{
              console.log("data",data)
            });
        }
      }
 
  }
if(webName == 'walmart'){

  setTimeout(() => {
   
  var item =  $('div[class="flex w-60"]')
    console.log("item",item)
    if(item.length > 0){
        var labels = $('[class="f4-l word-wrap green b"]');
          var price = labels[0].innerHTML;  
    console.log('price',price)

  var address = ""
      for (let i = 0; i < item.length; i++) {
        var itemname  = item[i].getElementsByClassName("w_V_DM")[0].innerHTML
        console.log("itemname",itemname)
        var itemprice  = $('div[class="column3"]')[i].getElementsByClassName("f5")[0].innerText
      console.log("itemprice",itemprice)  

      var obj = {"website":"walmart","username": userId,"totalitempurchase":item.length,"address":address,"Amount":itemprice,
          "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":price.replace(/\s/g, "") }

          const requestOptions = {
            method: 'POST',
            headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
            body: JSON.stringify(obj)
        };
        fetch(APIURL+'admin/order', requestOptions)
            .then(response => response.json())
            .then(data =>{
            });
        
      }
    }
    // var items = $('div[class="pt3 pt4-hdkp"]').find('ul');
    //  var element = items[0];
    //   var subitem = element.getElementsByClassName("w_V_DM")
    //   var subprice = element.getElementsByClassName("f5 black b black tr")
    //   for (let i = 0; i < subitem.length; i++) {
    //     var itemname  = subitem[i].innerHTML
    //     var itemprice  = subprice[i].innerText
    //     var obj = {"website":"walmart","username": userId,"totalitempurchase":subprice.length,"address":address,"Amount":itemprice,
    //     "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":price.replace(/\s/g, "") }

    //     const requestOptions = {
    //       method: 'POST',
    //       headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
    //       body: JSON.stringify(obj)
    //   };
    //   fetch(APIURL+'admin/order', requestOptions)
    //       .then(response => response.json())
    //       .then(data =>{
    //       });
    //   }
      
    
    // var detailss = $($('[class="pa0 mv0"]')[0]).find('.li');
    // console.log("detailss",detailss)
  }, 2* 1000);

        
      

   
    
  }



  // if(webName == 'walmart'){
  //   var elemFound = false;
  //   // console.log('waiting for 5 seconds...');
  //   setTimeout(() => {
  //     var labels = $('[for=grandTotal-label]');
  //     var price = labels[0].nextSibling.innerHTML;  

  //      var details = $($('[class="pa3 pa4-hdkp "]')[0]).find('.mid-gray');
  //      var name = details[0].innerHTML;
  //      var address = name + " " +details[1].innerHTML;

  //      $('button.f5-hdkp').click();
  //     //  console.log('clicking "View Details"');
  //     //  console.log('waiting for 2 seconds...');
  //      setTimeout(() => {
  //         var items = $('div[class="pt3 pt4-hdkp"]').find('ul');
  //          var element = items[0];
  //           var subitem = element.getElementsByClassName("w_V_DM")
  //           var subprice = element.getElementsByClassName("f5 black b black tr")
  //           for (let i = 0; i < subitem.length; i++) {
  //             var itemname  = subitem[i].innerHTML
  //             var itemprice  = subprice[i].innerText
  //             var obj = {"website":"walmart","username": userId,"totalitempurchase":subprice.length,"address":address,"Amount":itemprice,
  //             "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":price.replace(/\s/g, "") }
    
  //             const requestOptions = {
  //               method: 'POST',
  //               headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
  //               body: JSON.stringify(obj)
  //           };
  //           fetch(APIURL+'admin/order', requestOptions)
  //               .then(response => response.json())
  //               .then(data =>{
  //               });
  //           }
            
         
  //         // var detailss = $($('[class="pa0 mv0"]')[0]).find('.li');
  //         // console.log("detailss",detailss)
  //       }, 2* 1000);

        
  //     }, 5 * 1000);

   
    
  // }

  if(webName == 'homedepot'){

    setTimeout(() => {
      var item  =  document.getElementsByClassName("u__truncate-text")
      var pricetotal  = document.getElementsByClassName("u--hide")[0].innerHTML
      for (var i = 0; i < item.length; i++) {
        var name = item[i].innerHTML.split("</span>")[1].split(">")
        var itemname = ""
        if(name.length == 2){
          itemname = name[1]
        }else{
          itemname = name[0]
        }
        var itemprice  = document.getElementsByClassName("u__cell u__vertical-top u__p-top-xsmall u__text-right col__3-12 u__padding-off")[i].innerHTML
        console.log("name",itemname,itemprice)
        var obj = {"website":"homedepot","username": userId,"totalitempurchase":item.length,"address":"","Amount":itemprice,
        "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":pricetotal.replace(/\s/g, "") }
        console.log("obj________________",obj)

        const requestOptions = {
          method: 'POST',
          headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
          body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
          .then(response => response.json())
          .then(data =>{
            console.log("data",data)
          });
      

      }
    
    }, 2 * 1000);
    
  }

  if(webName =="target"){

    // var items = $('div[class="hYDMwM"]')

    //   
    setTimeout(() => {
      var items = $('[data-test="cartItem-title"]').children();
      var price = $('div[class="styles__StyledCol-sc-fw90uk-0 ksPCx"]').find('[data-test="cartItem-price"]')
      var totalprice = $('p[class="h-text-lg h-text-bold"]')[0].innerHTML

      for (let i = 0; i < items.length; i++) {
        var obj = {"website":"target","username": userId,"totalitempurchase":items.length,"address":"","Amount":price[i].innerHTML,
        "userId":JSON.parse(swipesession)._id,"itemName":items[i].innerHTML,"TotalAmount":totalprice }
  console.log("obj",obj)
        const requestOptions = {
          method: 'POST',
          headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
          body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
          .then(response => response.json())
          .then(data =>{
          });
      
      
      }
    }, 5 * 1000);

  }
  if(webName =="etsy"){
    console.log("dddddddddd")
    setTimeout(() => {
    var items = $('p[class="wt-display-block wt-pb-xs-1 wt-text-truncate"]')
    var itemsprice = $('div[class="wt-grid__item-xs-5 wt-hide-xs wt-show-md wt-pl-xs-3"]').find(".currency-value")
    var totalamount = $('td[class="wt-p-xs-0 wt-b-xs-none wt-text-right-xs wt-no-wrap"]').find(".currency-value")

    for (let i = 0; i < items.length; i++) {


      var obj = {"website":"etsy","username": userId,"totalitempurchase":items.length,"address":"","Amount":itemsprice[i].innerHTML,
      "userId":JSON.parse(swipesession)._id,"itemName":items[i].getElementsByTagName("a")[0].innerHTML.replace(/\s/g, ""),"TotalAmount":totalamount[0].innerHTML }

      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
        });
    }
  }, 5 * 1000);
  }
  if(webName =="ebay"){
    setTimeout(() => {
    var items = $('h3[class="item-title-header regular-text"]').children()
    var itemsprice = $('div[class="item-price"]').find(".text-display")
    var totalamount = $('tr[data-test-id="TOTAL"]').find(".text-display")
    var address  = $('div[class="shipping-address-summary"]') .find(".text-display")
var finaladress = address[1].getElementsByTagName("span")[0].innerHTML + " " +address[2].getElementsByTagName("span")[0].innerHTML + " "+ address[3].getElementsByTagName("span")[0].innerHTML


    for (let i = 0; i < items.length; i++) {
var itemname = items[i].getElementsByClassName("text-display")[0].getElementsByTagName("span")[0].innerHTML
var price = itemsprice[i].getElementsByTagName("span")[0].innerHTML

      var obj = {"website":"ebay","username": userId,"totalitempurchase":items.length,"address":finaladress,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount[0].getElementsByTagName("span")[0].innerHTML }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
        });
    }
  }, 5 * 1000);
  }

  if(webName =="lowes"){
    setTimeout(() => {
    var items = $('p[class="sc-csTnXy dcgduI"]')
    var itemsprice = $('div[ class="sc-cSrtSx ghFcpF"]')
    var totalamount = $('div[data-selector="art-sc-estTotal-below"]')
var finaltotal = "$"+""+totalamount[0].getElementsByTagName("span")[2].innerHTML+"."+totalamount[0].getElementsByTagName("sup")[1].innerHTML.split("<!-- -->")[1]
    for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerHTML
       var price = "$"+""+itemsprice[i].getElementsByTagName("span")[2].innerHTML+""+itemsprice[i].getElementsByTagName("sup")[1].innerHTML
      // var price = itemsprice[i].getElementsByTagName("span")[0].innerHTML
      var obj = {"website":"lowes","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":finaltotal }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
        });
     }
  }, 5 * 1000);
  }
  if(webName =="bestbuy"){
    setTimeout(() => {
    var items = $('div[class="fulfillment-list-entry__bd"]').find(".item-list__entry")
    var totalamount = $('div[class="order-summary__total"]').find(".cash-money")[0].innerHTML
   console.log("items",totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].getElementsByClassName("item-list__spacer text-left item-list__title")[0].innerHTML
          var price = items[i].getElementsByClassName("cash-money")[0].innerHTML
          console.log("itemname",itemname,price)
      var obj = {"website":"bestbuy","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
        });
     }
  }, 5 * 1000);
  }
  if(webName =="macys"){
    setTimeout(() => {
    var items = $('div[class="bag-product bagItem padding-top-s padding-bottom-s "]').find(".subtitle")
     var totalamount = $('div[id="cx-at-SUM_SUB_TOTAL-value"]')[0].innerHTML
  //  console.log("items",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].getElementsByClassName("pdp-link")[0].innerHTML
          var price =  $('div[class="SALE cell margin-bottom-xxs"]')[i].innerText
          // console.log("itemname",itemname,price)
      var obj = {"website":"macys","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  }, 5 * 1000);
  }


  if(webName =="wayfair"){
    
    setTimeout(() => {
      console.log("hhhh")
      $('button[id="CollapseToggle-0"]').attr("aria-expanded","true").show();
      $('div[ id="CollapsePanel-0"]').attr("aria-hidden","false")
      $('div[ id="CollapsePanel-0"]').attr('style',"height: auto; overflow: hidden; transition-property: height; transition-duration: 300ms; transition-timing-function: cubic-bezier(0.09, 1.03, 0.57, 0.97);")
     
      setTimeout(() => {
     var items = $('span[class="ConfirmationProductCard-name"]')
      var totalamount = $('span[class="OrderSummaryTable-subtotal"]')[0].innerHTML
    console.log("items",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].innerHTML
          var price =  $('span[class="ConfirmationProductCard-price"]')[i].innerText
           console.log("itemname",itemname,price)
      var obj = {"website":"wayfair","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
    }, 2 * 1000);
  }, 5 * 1000);
  }
 

  if(webName =="nordstrom"){
    
    setTimeout(() => {
   
     var items = $('div[id="item-details"]')
      var totalamount = $('div[class="c0yaU"]')[0].getElementsByClassName("Qboo9")[0].innerText
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].getElementsByClassName("v0B0y")[0].innerText
          var price =  $('p[class="_CpEk"]')[i].innerText
      var obj = {"website":"nordstrom","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }


  if(webName =="kohls"){
    
    setTimeout(() => {
   
     var items = $('div[class="product-details-block"]')
      var totalamount = $('span[class="cart-block-item-value"]')[0].innerText
      // console.log("ddddddddddddddddddd",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].getElementsByClassName("product-name")[0].innerText
          var price =  $('span[class="product-footer-block-price-list-sale-price red-color"]')[i].innerText
          // console.log("ddddddddddddddddddd",itemname,price)
            var obj = {"website":"kohls","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }
 

  if(webName =="samsclub"){
    
    setTimeout(() => {
   
     var items = $('div[class="sc-cart-item-details"]')
      var totalamount = $('div[class="sc-cart-order-summary-price sc-cart-estimated-total-price"]')[0].innerText
    //  console.log("ddddddddddddddddddd",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].getElementsByClassName("sc-cart-item-title")[0].innerText
          var price =  $('p[class="sc-cart-price-info-sub-total"]')[i].innerText
          //  console.log("ddddddddddddddddddd",itemname,price)
            var obj = {"website":"samsclub","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }


  if(webName =="doordash"){
    
    setTimeout(() => {
     var items = $('div[data-telemetry-id="OrderItemContainerItemTitle"]')
      var totalamount = $('span[data-anchor-id="OrderCartTotal"]')[0].innerText
      //  console.log("ddddddddddddddddddd",items,Address)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].getElementsByClassName("fltXDR")[0].innerText
          var price =  items[i].getElementsByClassName("klBvON")[0].innerText
            // console.log("ddddddddddddddddddd",itemname,price)
            var obj = {"website":"doordash","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }


  if(webName =="costco"){
    setTimeout(() => {
     var items = $('span[automation-id="descriptionOutput"]')
      var totalamount = $('p[class="h6-style-guide summary-right surchargeOrderTotal"]')[0].innerText
       console.log("ddddddddddddddddddd",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].innerText
          var price =  $('div[class="h7-style-guide-v2"]')[i].innerText
            console.log("ddddddddddddddddddd",itemname,price)
            var obj = {"website":"costco","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }

// console.log("webName:::::::::::::",webName)
  if(webName =="bloomingdales"){
    setTimeout(() => {
     var items = $('p[class="bag-product-description"]')
      var totalamount = $('div[class="end order-summary-values"]')[0].innerText
      //  console.log("ddddddddddddddddddd",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].innerText
          var price =  $('div[class="ITEM_TOTAL center-item-total small-6 cell text-right"]')[i].innerText
            // console.log("ddddddddddddddddddd",itemname,price)
            var obj = {"website":"bloomingdales","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }


  if(webName =="bloomingdales"){
    setTimeout(() => {
     var items = $('p[class="bag-product-description"]')
      var totalamount = $('div[class="end order-summary-values"]')[0].innerText
      //  console.log("ddddddddddddddddddd",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].innerText
          var price =  $('div[class="ITEM_TOTAL center-item-total small-6 cell text-right"]')[i].innerText
            // console.log("ddddddddddddddddddd",itemname,price)
            var obj = {"website":"bloomingdales","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }


  if(webName =="saksfifthavenue"){
    setTimeout(() => {
     var items = $('div[class="line-item-name bfx-product-name"]')
      var totalamount = $('span[class="text-right sub-total bfx-price bfx-total-subtotal bfx-converted"]')[0].innerText
    console.log("ddddddddddddddddddd",items,totalamount)
for (let i = 0; i < items.length; i++) {
       var itemname = items[i].innerText
          var price =  $('span[class="base-price bfx-price bfx-product-subtotal bfx-converted"]')[i].innerText
            console.log("ddddddddddddddddddd",itemname,price)
            var obj = {"website":"saksfifthavenue","username": userId,"totalitempurchase":items.length,"address":"","Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
  
  }, 5 * 1000);
  }

  if(webName =="nordstromrack"){
    setTimeout(() => {
    $(document).ready(function() {
      $(".rr99D").click(function(){
        setTimeout(() => {
          var address = $('div[class="GRLEO"]').find(".lqIrL")[0].innerText
            var items = $('div[class="iMH4y"]').find(".pqwss")
          var totalamount = $('div[class="c0yaU"]').find(".Qboo9")[0].innerText
        for (let i = 0; i < items.length; i++) {
       var itemname = items[i].innerText
          var price = $('div[class="iMH4y"]').find(".hEFaX")[0].innerText
            var obj = {"website":"nordstromrack","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
    };
    fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
     }
        }, 5 * 1000);
      /// your code for click event here ///
      });
      
      })

  
  }, 5 * 1000);
  }

  if(webName =="jcrew"){
    setTimeout(() => {
      var address = $('div[class="address-name"]')[0].innerText
      var address1 = $('div[class="address-addressLine1 address-details"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('li[class="cart-item ng-star-inserted"]').find(".item-name")
    var totalamount = $('div[class="charge charge__total ng-tns-c133-2 ng-star-inserted"]').find(".currency-text")[0].innerText

        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('li[class="cart-item ng-star-inserted').find(".currency-text")[0].innerText
            var obj = {"website":"jcrew","username": userId,"totalitempurchase":items.length,"address":address+"  "+address1,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="asos"){
    setTimeout(() => {
      var address = $('span[data-bind="html:$data"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('span[class="item-description"]')
    var totalamount = $('div[data-bind="currency: total"]')[0].innerText
console.log("items",address ,items ,totalamount )
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('span[class="item-price')[0].innerText
            var obj = {"website":"asos","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="lulus"){
    setTimeout(() => {
      var address = $('div[class="o-col--1"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('[class="u-margin-bottom-sm u-text-short u-block"]')
    var totalamount = $('span[id="c-bag-totals__total"]')[0].innerText
console.log("items",address ,items ,totalamount )
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('div[class="u-text-accent u-text-lg"]')[0].innerText
            var obj = {"website":"lulus","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }


  if(webName =="gap"){
    setTimeout(() => {
      $('button.deliveryGroupList__detailsToggle').click();
      setTimeout(() => {
      var address = $('div[class="shippingAddressRadio_HelpText"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('span[class="lineItemBagInfo lineItemBagBrand"]')
    var totalamount = $('div[class="sds_tx_right orderSummary__totalText"]')[0].innerText
// console.log("items",address ,items ,totalamount )
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('span[class="lineItemBagInfo lineItemBagPrice"]')[0].innerText
            var obj = {"website":"gap","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }
}, 2 * 1000);
  
  }, 5 * 1000);
  }


  if(webName =="shein"){
    setTimeout(() => {
     
      var address = $('div[class="c-address-item default-address"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('div[class="item-name"]')
    var totalamount = $('span[class="she-fr total item-right"]')[0].innerText
// console.log("items",address ,items ,totalamount )
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('span[class="price price-discount"]')[0].innerText
            var obj = {"website":"shein","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }


  if(webName =="dsw"){
    setTimeout(() => {
     
      var address = $('div[class="billing-address__details__container__address"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('h5[class="order-summary__product-name title5--checkout-title"]')
    var totalamount = $('div[class="order-summary__row order-summary__row--total"]')[0].innerText.split("\n")[1]
 console.log("items",address ,items ,totalamount )
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('span[class="order-summary__product-price"]')[0].innerText
            var obj = {"website":"dsw","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="adidas"){
    setTimeout(() => {
     
      var address = $('p[data-auto-id="delivery-address"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('div[data-auto-id="glass-order-summary-line-item-title"]')
    var totalamount = $('[data-auto-id="glass-cart-summary-price-value"]')[0].innerText
 console.log("items",address ,items ,totalamount )
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('div[class="gl-price-item gl-price-item--sale notranslate"]')[0].innerText
            var obj = {"website":"adidas","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="saksoff5th"){
    setTimeout(() => {
     
      var address = $('div[class="address1"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('div[class="card order-product-summary"]')
    var totalamount = $('span[class="grand-total-sum bfx-price bfx-total-grandtotal"]')[0].innerText

        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].getElementsByClassName("line-item-name")[i].innerText
          var price =  items[i].getElementsByClassName('pricing pli-final-price line-item-total-price-amount')[i].innerText
          console.log("items",address ,itemname ,price )
            var obj = {"website":"saksoff5th","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="newbalance"){
    setTimeout(() => {
     
      var address = $('span[class="address1 font-body shippingAddress1 text-capitalize"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('h3[class="col-lg-9 p-0 mb-lg-2 mb-0 item-name"]')
    var totalamount = $('span[class="grand-total-sum grand-total font-body-large font-weight-semibold mobile-font-small mt-0 mb-0"]')[0].innerText

        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('div[class="item-prices col-12 mb-lg-0 mb-2 price"]').find('.line-item-total-price-amount')[i].innerText
          console.log("items",price )

            var obj = {"website":"newbalance","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }


  if(webName =="converse"){
    setTimeout(() => {
     
      var address = $('div[class="miniinfo__details "]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('a[class="text--underline set--quickview-ready"]')
    var totalamount = $('span[class="value--highlight"]')[0].innerText

        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('span[class="product-price--sales"]')[i].innerText
          //console.log("items",price ,itemname)

            var obj = {"website":"converse","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }


  if(webName =="vans"){
    setTimeout(() => {
     
      var address = $('p[class="vf-text vf-text--sm--text-align vf-text--md--text-align vf-text--lg--text-align"]')[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('a[class="vf-product-line__name vf-product-line__name vf-product-line__name vf-link"]')
    var totalamount = $('span[class="vf-text vf-text--sm--text-align vf-text--md--text-align vf-text--lg--text-align vf-price--regular"]')[0].innerText

        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =   ""
          //console.log("items",price ,itemname)

            var obj = {"website":"vans","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="reebok"){
    setTimeout(() => {
     
      var address = $('p[class="payment-address-details--24l9O"]').find(".flex-row--1XndU")[0].innerText
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('span[class="orderDetails-line-products-line-details-Name--35DMu"]')
    var totalamount = $('p[class="tag_p_bold--v2mye  line-item--p8kAnp_bold"]')[0].innerText

        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('small[class="tag_small--3x-DJ  orderDetails-price--2gfDi"]')[i].innerText
          //console.log("items",price ,itemname)

            var obj = {"website":"reebok","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="puma"){
    setTimeout(() => {
     
      var address = ""
      //  var address2 = $('div[class="address-addressLine2"]')[0].innerText

      var items = $('h3[data-test-id="cart-product-title"]')
    var totalamount = $('p[data-test-id="estimated-total"]')[0].innerText

        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('span[data-test-id="item-price"]')[i].innerText
          //console.log("items",price ,itemname)

            var obj = {"website":"puma","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }


  if(webName =="sauconyindia"){
    setTimeout(() => {
      var address = ""
        // var address = $('div[class="billing-shipping-address-card-body"]')[0].innerText
      var items = $('div[class="product-name-container"]')
    var totalamount = $('div[class="order-total-content"]').find(".product-price")[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('span[class="actual-price ng-star-inserted"]')[i].innerText
          //console.log("items",price ,itemname)
            var obj = {"website":"sauconyindia","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 15 * 1000);
  }

  if(webName =="asics"){
    setTimeout(() => {
      var address = ""
        // var address = $('div[class="billing-shipping-address-card-body"]')[0].innerText
      var items = $('div[class="p-title"]')
    var totalamount = $('td[id="PartialAmount"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('div[class="p_price"]')[i].innerText
          //console.log("items",price ,itemname)
            var obj = {"website":"asics","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }

  if(webName =="fashionnova"){
    setTimeout(() => {
      var address = ""
      var address = $('address[class="address address--tight"]')[0].innerText
      var items = $('span[class="product__description__name order-summary__emphasis"]')
    var totalamount = $('span[class="payment-due__price skeleton-while-loading--lg"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('span[class="order-summary__emphasis skeleton-while-loading"]')[i].innerText
          //console.log("items",price ,itemname)
            var obj = {"website":"fashionnova","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 15 * 1000);
  }

  if(webName =="anthropologie"){
    setTimeout(() => {
      var address = ""
      // var address = $('span[class="c-pwa-address__address1"]')[0].innerText
      var items = $('a[class="c-pwa-link c-pwa-link--client c-pwa-item-title__link"]')
    var totalamount = $('li[class="c-pwa-order-totals__item c-pwa-order-totals__item--strong"]').find(".c-pwa-order-totals__value") [0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('p[class="c-pwa-item-price__line"]')[i].innerText
          //console.log("items",price ,itemname)
            var obj = {"website":"anthropologie","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }
  if(webName =="samsung"){
    setTimeout(() => {
      var address = ""
      // var address = $('span[class="c-pwa-address__address1"]')[0].innerText
      var items = $('p[class="shopping-c-i-h-p-name"]')
    var totalamount = $('p[class="os-price-value"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('p[class="shopping-c-i-h-p-price"]')[i].innerText
          //console.log("items",price ,itemname)
            var obj = {"website":"samsung","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }
  if(webName =="apple"){
    setTimeout(() => {
      var address = ""
      // var address = $('span[class="c-pwa-address__address1"]')[0].innerText
      var items = $('a[data-autom="bag-item-name"]')
    var totalamount = $('div[class="rs-summary-labelandvaluecontainer rs-summary-total"]').find(".rs-summary-value")[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('div[class="rs-iteminfo-price"]')[i].innerText
          //console.log("items",price ,itemname)
            var obj = {"website":"apple","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }
  if(webName =="hp"){
    setTimeout(() => {
      var address = ""
      // var address = $('span[class="c-pwa-address__address1"]')[0].innerText
      var items = $('strong[class="product-item-name stellar-body__medium"]')
    var totalamount = $('tr[class="grand totals"]').find(".price")[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('span[class="cart-price"]').find(".price")[i].innerText
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"hp","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }
  if(webName =="bhphotovideo"){
    setTimeout(() => {
      var address = ""
       var address = $('li[data-selenium="address1"]')[0].innerText
      var items = $('span[data-selenium="shippingItemName"]')
      console.log("items",items)
    var totalamount = $('span[data-selenium="youPay"]').find(".bold")[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('span[data-selenium="shippingItemTotal"]')[i].innerText
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"bhphotovideo","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }
  if(webName =="newegg"){
    setTimeout(() => {
      var address = ""
       var address = $('address[class="address"]')[0].innerText
      var items = $('div[class="item-container"]').find(".item-title")
      console.log("items",items)
    var totalamount = $('li[class="summary-content-total"]')[0].innerText.split("\n")[1]
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('li[class="price-current"]')[i].innerText
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"newegg","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }
  if(webName =="ring"){
    setTimeout(() => {
      var address = ""
       var address = $('address[class="address address--tight"]')[0].innerText
      var items = $('span[class="product__description__name order-summary__emphasis"]')
      console.log("items",items)
    var totalamount = $('span[class="payment-due__price skeleton-while-loading--lg"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price =    $('span[class="order-summary__emphasis skeleton-while-loading"]')[i].innerText
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"ring","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }
  if(webName =="pandora"){
    setTimeout(() => {
      var address = ""
       var address = $('span[data-auto="lblSummaryShippingStreet"]')[0].innerText
      var items = $('div[data-auto="divShippingProductCardWrapper"]')
      console.log("items",items)
    var totalamount = $('p[data-auto="lblOrderGrandTotal"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = items[i].innerText.split("\n")[7]
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"pandora","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }
  if(webName =="swarovski"){
    setTimeout(() => {
      var address = ""
      //  var address = $('span[data-auto="lblSummaryShippingStreet"]')[0].innerText
      var items = $('div[class="swa-checkout-product-tile__information"]')
      console.log("items",items)
    var totalamount = $('div[class="swa-checkout__total-section-item swa-checkout__total-price swa-label-sans--small-strong"]')[0].innerText.split("\n")[1]
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('span[class="swa-checkout-product-tile__information__price-current"]')[0].innerText.split("\n")[0] 
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"swarovski","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }

  if(webName =="tiffany"){
    setTimeout(() => {
      var address = ""
      //  var address = $('span[data-auto="lblSummaryShippingStreet"]')[0].innerText
      var items = $('div[class="item-name"]')
      console.log("items",items)
    var totalamount = $('div[id="grand_total_value"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('div[class="itemRow__extras"]').find(".align-self-center")[i].innerText
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"tiffany","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }
console.log("webName",window.location.href.split(".")[0])
  if(window.location.href.split(".")[0] =="https://thesleepcompany"){
    setTimeout(() => {
      var address = ""
        var address = $('address[class="address address--tight"]')[0].innerText
      var items = $('th[class="product__description"]')
      console.log("items",items)
    var totalamount = $('span[class="payment-due__price skeleton-while-loading--lg"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = $('td[class="product__price"]').find(".order-summary__emphasis")[i].innerText
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"thesleepcompany","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 5 * 1000);
  }
  
  if(webName =="kay"){
    setTimeout(() => {
      var address = ""
      //  var address = $('span[data-auto="lblSummaryShippingStreet"]')[0].innerText
      var items = $('div[class="product-title body-one"]')
      console.log("items",items)
    var totalamount = $('span[class="text-outline text-font-size body-one TOTAL-PAYABLE-FIN-CALC"]')[0].innerText
        for (let i = 0; i < items.length; i++) {
      var itemname = items[i].innerText
          var price = ""
          console.log("items",price ,itemname ,totalamount)
            var obj = {"website":"kay","username": userId,"totalitempurchase":items.length,"address":address,"Amount":price,
      "userId":JSON.parse(swipesession)._id,"itemName":itemname,"TotalAmount":totalamount }
      const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST', "Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify(obj)
      };
      fetch(APIURL+'admin/order', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("data",data)
        });
      }

  
  }, 10 * 1000);
  }
  }
  return (
    <>
     
    </>
  )
}

export default AllCheckout
