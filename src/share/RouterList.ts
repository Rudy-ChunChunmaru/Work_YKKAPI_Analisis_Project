import React from "react";

import Index_page from "@/pages/common/index";
import Standar_list from "@/pages/standard_list";
import Breakdown from "@/pages/breakdown";
import Bom from "@/pages/bom";
import Product from "@/pages/product";
import Order from "@/pages/order";

type routerListType = {
    id:number,
    title:string,
    pageRoute:string,
    page: JSX.Element,
    childernRoute?:routerListType[]
}


const routerList:routerListType[] = [
    {
        id:1,
        title:"Home",
        pageRoute:"",
        page: React.createElement(Index_page),
        childernRoute:undefined
    },
    {
        id:2,
        title:"Standard List",
        pageRoute:"standardlist",
        page: React.createElement(Standar_list),
        childernRoute:undefined
    },
    {
        id:3,
        title:"Breakdown",
        pageRoute:"bd",
        page: React.createElement(Breakdown),
        childernRoute:undefined
    },
    {
        id:4,
        title:"Build of Material",
        pageRoute:"Bom",
        page: React.createElement(Bom),
        childernRoute:undefined
    },
    {
        id:5,
        title:"Product",
        pageRoute:"Product",
        page: React.createElement(Product),
        childernRoute:undefined
    },
    {
        id:6,
        title:"Order",
        pageRoute:"Order",
        page: React.createElement(Order),
        childernRoute:undefined
    }
]
export default routerList;
