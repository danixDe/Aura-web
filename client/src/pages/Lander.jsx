import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import styles from "./Lander.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";
import CustomCursor from "../Components/CustomCursor";
import {FaGithub, FaInstagram, FaTwitter} from 'react-icons/fa'
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Land() {
  const [activeSection, setActiveSection] = useState("hero");
  const [dropdown, setDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState("donors");
  const { valid, role } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const menuItems = {
    "Why AuraHP": [
      { title: "Our Mission", link: "/mission" },
      { title: "Impact Stories", link: "/impact" },
      { title: "Blood Donation Process", link: "/process" },
    ],
    "Our Practices": [
      { title: "Safety Standards", link: "/safety" },
      { title: "Medical Guidelines", link: "/guidelines" },
      { title: "Quality Assurance", link: "/quality" },
      { title: "Research & Development", link: "/research" },
    ],
    "About Us": null,
    "Careers": null,
    "Insights": [
      { title: "Latest News", link: "/news" },
      { title: "Blood Supply Statistics", link: "/statistics" },
      { title: "Educational Resources", link: "/resources" },
      { title: "Research Publications", link: "/publications" },
    ],
  };
  
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
    <>
    <CustomCursor />
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>AuraHP</div>
        <ul className={styles.navLinks}>
          {Object.entries(menuItems).map(([item, submenu], index) => (
            <li
              key={index}
              className={`${styles.navItem} ${
                activeSection === item.toLowerCase().replace(/ /g, "-")
                  ? styles.active
                  : ""
              }`}
              onMouseEnter={() => setDropdown(item)}
              onMouseLeave={() => setDropdown(null)}
              data-cursor="pointer"
            >
              {item} 
              {submenu && <span className={styles.dropdownArrow}><ChevronDown size={12} /></span>}
              {dropdown === item && submenu && (
                <motion.div
                  className={styles.dropdownMenu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submenu.map((item, idx) => (
                    <Link 
                      key={idx} 
                      to={item.link} 
                      className={styles.dropdownItem}
                      data-cursor="pointer"
                    >
                      {item.title}<br />
                    </Link>
                  ))}
                </motion.div>
              )}
            </li>
          ))}
        </ul>
        <Link to='/VLogin' style={{ textDecoration: 'none' }} data-cursor="pointer">
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
        <div className={styles.heroContent}>
          <h1 className={styles.title}>One <span className={styles.highlight}>drop</span> at a time</h1>
          <p className={styles.subtitle}>AuraHP is your trusted partner for blood donation.</p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="pointer"
          >
            <a style={{textDecoration:'none'}} href='#first-impressions'> 
            <span style={{ color: '#ffffff' }}>
             Show Me How
            </span>
          </a>
          </motion.button>
        </div>
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
            data-cursor="pointer"
          >
            Supporting Blood Donors
          </span>
          <span
            className={activeTab === "facilities" ? styles.activeTab : ""}
            onClick={() => setActiveTab("facilities")}
            data-cursor="pointer"
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
            data-cursor="pointer"
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
            data-cursor="pointer"
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
          data-cursor="pointer"
        >
          <Link to="/learn-more" style={{ textDecoration: "none", color: "white" }}>
            Learn More
          </Link>
        </motion.button>
      </motion.section>

      <motion.section
        id="testimonials"
        className={styles.darkSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>Stories of Life</h2>
        <div className={styles.testimonialContainer}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p>"AuraHP helped me find a blood donor when my father needed emergency surgery. The platform connected us with a compatible donor within hours."</p>
              <h4>- Bharadwaj Dasari</h4>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p>`As a regular donor, AuraHP has made it easier than ever to contribute. I get notifications when my blood type is needed in my area.`</p>
              <h4>- Dileep Rambarki</h4>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p>"Our hospital has seen a 40% increase in donation rates since partnering with AuraHP. Their platform has revolutionized our blood supply management."</p>
              <h4>- Dr. Aravind, LifeZone Hospital</h4>
            </div>
          </div>
        </div>
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
            <p data-cursor="pointer">Why AuraHP</p>
            <p data-cursor="pointer">Our Practices</p>
            <p data-cursor="pointer">Careers</p>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a className={styles.socialLink} data-cursor="pointer"><FaGithub /></a>
              <a className={styles.socialLink} data-cursor="pointer"><FaInstagram /></a>
              <a className={styles.socialLink} data-cursor="pointer"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <p className={styles.copyright}>© AuraHP 2024</p>
      </motion.footer>
    </div>
  </>
  );
}