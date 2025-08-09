import './App.css'
import NavBar from "@/components/standard/NavBar.tsx";
import { Outlet } from 'react-router-dom';
import Footer from "@/components/standard/Footer.tsx";

function App() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default App
