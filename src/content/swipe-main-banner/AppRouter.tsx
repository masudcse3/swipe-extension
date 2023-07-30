import React from 'react';
import Banner from "../../components/banner/Banner";
import {Text} from "@chakra-ui/react";
import {ChakraProvider} from '@chakra-ui/react';
import AllCheckout from "./AllCheckout";
import SwipeModal from "./SwipeModal"
import theme from "../theme";
import App from   "./App"
function BannerContent() {
  return <Text as="span"  fontWeight="bold">swipe</Text>
}

function AppRouter() {
 
  return (
      
      <ChakraProvider>
        <AllCheckout></AllCheckout>
        <SwipeModal></SwipeModal>
        {/* <SwipeStart></SwipeStart> */}
        {/* <Banner actionButton={<SwipeModal/>} bgColor="#5624d0" bannerContent={<BannerContent/>}/> */}
      </ChakraProvider>
  );
}

export default AppRouter
