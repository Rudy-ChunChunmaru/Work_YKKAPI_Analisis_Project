
import {Link} from "react-router-dom";

const Navbar = () => {
   return(
      <div className="w-full bg-blue-100 flex flex-col justify-left px-5">
        <div className="w-full py-1">
            M-Aru
        </div>
        <div className="w-full flex flex-row gap-2">
            <Link to='' className='px-1 border-2 border-black rounded-md hover:px-2 delay-200 transition'>Home</Link>
            <Link to='/standardlist' className='px-1 border-2 border-black rounded-md hover:px-2 delay-200 transition'>Standard List</Link>
            <Link to='/000000' className='px-1 border-2 border-black rounded-md hover:px-2 delay-200 transition'>No Where</Link>
        </div>
      </div>
   )
}

export default Navbar