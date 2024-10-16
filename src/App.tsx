
import Standar_list from "@/pages/standard_list";
import Error_page from "@/pages/common/error";
import Index_page from "@/pages/common/index";
import Navbar from "@/components/navbar";


import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return(
    <div className="w-full h-full">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route index element={<Index_page />}></Route>
          <Route path="/standardlist" element={<Standar_list />}></Route>
          <Route path="*" element={<Error_page />}></Route>
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;