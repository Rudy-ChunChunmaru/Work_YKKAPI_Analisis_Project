
import {Link} from "react-router-dom";
import routerList from "@/share/RouterList";

const Navbar = () => {
   return(
      <div className="w-full bg-blue-100 flex flex-col justify-left px-5">
        <div className="w-full py-1">
            M-Aru
        </div>
        <div className="w-full flex flex-row gap-2" >
            {
              routerList.map((value,index)=>{
                return(
                  <Link key={index} to={value.pageRoute} className='px-1 border-2 border-black rounded-md hover:px-2 delay-200 transition'>{value.title}</Link>
                )
              })
            }
            <Link to='/000000' className='px-1 border-2 border-black rounded-md hover:px-2 delay-200 transition'>No Where</Link>
        </div>
      </div>
   )
}

export default Navbar