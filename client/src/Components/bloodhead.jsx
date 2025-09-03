import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './bloodhead.css';
import { 
  Home, Droplet, Users, PieChart, 
  Settings, Info, Menu, ChevronRight, 
  User
} from 'lucide-react';

function Bloodhead() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  // Optional: auto-close menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="mobile-header">
        <h1 className="header-title">AuraHP</h1>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Menu">
          <FaBars size={24} />
        </button>
      </header>

      <aside className={`mobile-dropdown ${menuOpen ? 'open' : ''}`}>
        <ul className="navItems">
          <li className="navItem" >
          <Link to='/bloodbank'>
            <Home className='icon' />
            <span>Dashboard</span>
             </Link>
            </li>
          <li className="navItem">
            <Link to='bloodRequests'>
            <Droplet className='icon' />
            <span >Blood Requests</span>
            </Link>
          </li>
          <li className="navItem" >
          <Link to='donorsList'>
            <User className='icon' />
            <span>Donors</span></Link>
          </li>
          <li className="navItem" > 
          <Link to='/analytics'>
            <PieChart className='icon' />
            <span >Analytics</span>
          </Link>
          </li>
          <li className="navItem">
          <Link to='settings'>
            <Settings className='icon' />
            <span>Settings</span>
            </Link>
          </li>
          <li className="navItem">
          <Link to='About'>
            <Info className='icon' />
            <span >About</span>
          </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Bloodhead;
