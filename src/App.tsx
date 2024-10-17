import Error_page from "@/pages/common/error";
import Navbar from "@/components/navbar";

import { BrowserRouter,Routes,Route } from "react-router-dom";
import routerList from "./share/RouterList";
import { localforageConfig } from "./share/StoreageList";

function App() {
  localforageConfig();

  return(
    <div className="w-full h-full">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {
            routerList.map((valueRouter,indexRouter)=>{
              if(indexRouter == 0)
                return(
                  <Route key={indexRouter} index element={valueRouter.page}></Route>
                )
              else
                return(
                  <Route key={indexRouter} path={valueRouter.pageRoute} element={valueRouter.page}></Route>
                )
            })
          }
          <Route path="*" element={<Error_page />}></Route>
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;