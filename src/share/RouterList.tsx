type routerListType = {
    id:number,
    title:string,
    pageRoute:string,
    page: JSX.Element,
    childernRoute?:routerListType[]
}

import Index_page from "@/pages/common/index";
import Standar_list from "@/pages/standard_list";
import React from "react";

const routerList:routerListType[] = [
    {
        id:1,
        title:"home",
        pageRoute:"/",
        page: React.createElement(Index_page),
        childernRoute:undefined
    },
    {
        id:2,
        title:"standard list",
        pageRoute:"/standardlist",
        page: React.createElement(Standar_list),
        childernRoute:undefined
    }
]
export default routerList;
