import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;


