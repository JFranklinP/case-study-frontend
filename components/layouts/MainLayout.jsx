
import { Navbar } from "../Navbar";


export const MainLayout = ({ children }) => {
    return (

        <div className="bg-gray-100 h-screen p-10">
            <Navbar/>
          <div className="container mx-auto h-full">
          {children}
          </div>
        </div>
        
      )
}