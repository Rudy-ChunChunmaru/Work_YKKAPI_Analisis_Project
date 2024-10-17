type routerListType = {
    title:string,
    pageRoute:string,
    page: JSX.Element,
    childerRoute?:routerListType[]
}

import Index_page from "@/pages/common/index";
import Standar_list from "@/pages/standard_list";

const routerList:routerListType[] = [
    {
        title:"home",
        pageRoute:"/",
        page: <Index_page/>,
        childerRoute:undefined
    },
    {
        title:"standard list",
        pageRoute:"/standardlist",
        page: <Standar_list/>,
        childerRoute:undefined
    }
]
export default routerList;
