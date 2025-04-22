import { useEffect, useState,useContext } from "react";
import { motion } from "framer-motion";
import styles from "./Lander.module.css";
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from "../utils/AuthContext";

export default function Land() {
  const [activeSection, setActiveSection] = useState("hero");
  const [dropdown, setDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState("donors");
  const { valid, role } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "AuraHP - Home";
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <div className={styles.container}>
      

      <nav className={styles.navbar}>
        <div className={styles.logo}>AuraHP</div>
        <ul className={styles.navLinks}>
          {[
            "Why AuraHP",
            "Our Practices",
            "About Us",
            "Careers",
            "Insights",
          ].map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} ${
                activeSection === item.toLowerCase().replace(/ /g, "-")
                  ? styles.active
                  : ""
              }`}
              onMouseEnter={() => setDropdown(item)}
              onMouseLeave={() => setDropdown(null)}
            >
              {item} <span className={styles.dropdownArrow}>▼</span>
              {dropdown === item && (
                <motion.div
                  className={styles.dropdownMenu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>Submenu 1</p>
                  <p>Submenu 2</p>
                  <p>Submenu 3</p>
                </motion.div>
              )}
            </li>
          ))}
        </ul>
        <Link to = '/VLogin' style = {{textDecoration:'none'}}>
        <button className={styles.ctaButton}><span>Donate</span></button>
        </Link>
      </nav>

      <motion.section
        id="hero"
        className={styles.hero}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>One <span className={styles.highlight}>drop</span> at a time</h1>
        <p className={styles.subtitle}>AuraHP is your trusted partner for blood donation.</p>
        <motion.button
          className={styles.ctaButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
        <span onClick={() => window.location.href = '#first-impressions'} style={{cursor: 'pointer', color: '#ffffff'}}>
        Show Me How
         </span>

        </motion.button>
      </motion.section>

      <motion.section
        id="first-impressions"
        className={styles.darkSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>First Impressions</h2>
        <div className={styles.toggleContainer}>
          <span
            className={activeTab === "donors" ? styles.activeTab : ""}
            onClick={() => setActiveTab("donors")}
          >
            Supporting Blood Donors
          </span>
          <span
            className={activeTab === "facilities" ? styles.activeTab : ""}
            onClick={() => setActiveTab("facilities")}
          >
            Helping Medical Facilities
          </span>
        </div>
        <p className={styles.sectionText}>
          {activeTab === "donors"
            ? "AuraHP empowers blood donors by connecting them to those in need, ensuring a smooth donation process."
            : "AuraHP assists hospitals and medical facilities by providing a reliable blood donor network for urgent needs."}
        </p>
        <div className={styles.buttonContainer}>
          <motion.button
             className={styles.ctadarkButton}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() =>
             valid === "true" && role === "donor"
             ? navigate("/donor")
             : navigate("/VLogin")
            }
          >
             <span>AuraHP for Donors</span>
          </motion.button>

          <motion.button
           className={styles.ctadarkButtonAlt}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={() =>
            valid === "true" && role === "facility"
            ? navigate("/bloodbank")
            : navigate("/MFLogin")
           }
          >
           <span>AuraHP for Facilities</span>
          </motion.button>

        
        </div>
      </motion.section>

      <motion.section
  id="business-support"
  className={styles.lightSection}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h2 className={styles.sectionTitle}>Empowering Blood Donation</h2>
  <p className={styles.sectionText}>
    AuraHP connects donors with those in urgent need, streamlining the donation process and ensuring efficient medical support.
  </p>

  <div className={styles.featuresContainer}>
    <div className={styles.featureCard}>
      <h3>🩸 Real-Time Donor Matching</h3>
      <p>Find and connect with donors quickly based on location and blood type.</p>
    </div>
    <div className={styles.featureCard}>
      <h3>🏥 Medical Facility Support</h3>
      <p>Hospitals and clinics can request and manage blood supply effortlessly.</p>
    </div>
    <div className={styles.featureCard}>
      <h3>📊 Smart Analytics</h3>
      <p>Track donation history, upcoming drives, and availability of blood supply.</p>
    </div>
  </div>
            <br></br>
  <motion.button
    className={styles.ctaButton}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link to="/learn-more" style={{ textDecoration: "none", color: "white" }}>
      Learn More
    </Link>
  </motion.button>
</motion.section>


      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.footerContent}>
          <div>
            <h3>Contact Us</h3>
            <p>Email: info@aurahp.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <p>Why AuraHP</p>
            <p>Our Practices</p>
            <p>Careers</p>
          </div>
        </div>
        <p className={styles.copyright}>© AuraHP 2024</p>
      </motion.footer>
    </div>
  );
}
