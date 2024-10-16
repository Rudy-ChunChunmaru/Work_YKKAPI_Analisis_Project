import { Link } from "react-router-dom";

const Error_page = () => {
    return (
        <div className="w-full h-full">
            <div className="mx-auto my-[5%] w-[45%] bg-red-300 rounded-xl flex flex-col justify-between py-2">
                <div className="text-center font-bold">404</div>
                <div className="text-center font-normal">Page Not Found</div>
                <br></br>
                <div className="text-center">
                    <Link to="" className="border-2 px-2 hover:underline rounded-md">Back To Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Error_page