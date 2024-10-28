import React from "react";

import Index_page from "@/pages/common/index";
import Standar_list from "@/pages/standard_list";
import Bom from "@/pages/bom";

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
        title:"Build of Material",
        pageRoute:"Bom",
        page: React.createElement(Bom),
        childernRoute:undefined
    }
]
export default routerList;
