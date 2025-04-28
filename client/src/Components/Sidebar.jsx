import styles from './Sidebar.module.css';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext'; 
import '../App.css'

const Sidebar = ({ menuItems=[], onClose, title = 'Menu' }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode(); 

  return (
    <div className={`${styles.sidebar} ${isDarkMode ? 'dark' : 'light'}`}>
      <button className={styles.closeButton} onClick={onClose}>
        <X size={24} />
      </button>
      <div className={styles.menu}>
        <h2 className={styles.menuTitle}>{title}</h2>
        <ul className={styles.menuList}>
          {menuItems.map((item,index)=>(
            <li key = {index} className={styles.menuItem} onClick={()=>{
              if(item.navigate) navigate(item.navigate);
            }}> <item.icon size = {20} />
                {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
