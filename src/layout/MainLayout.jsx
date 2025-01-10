import { Outlet } from 'react-router-dom';
import Navbar from '../components-shared/Navbar';
import Footer from '../components-shared/Footer';
const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen ">
            <header className='z-50 p-2 py-4 border-2 sticky top-0 bg-slate-100 bg-opacity-50 w-full'>
                <Navbar />
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default MainLayout;
