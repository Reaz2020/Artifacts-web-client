import { Outlet } from 'react-router-dom';
import Navbar from '../components-shared/Navbar';
import Footer from '../components-shared/Footer';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className='z-10'>
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
