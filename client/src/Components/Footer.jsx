import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => (
  <>
    <style>{`
      .footer {
        background: #020202;
        color: #ffffff;
        text-align: center;
        padding: 1rem 0;
      }

      .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 1rem;
      }

      .app-name {
        font-size: 1rem;
      }

      .contact-links {
        display: flex;
        gap: 1rem;
      }

      .icon-wrapper {
        position: relative;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
      }

      .icon-wrapper svg {
        width: 24px;
        height: 24px;
      }

      .icon-wrapper .tooltip {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        background: #ffffff;
        color: #000000;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        white-space: nowrap;
        transition: opacity 0.2s ease-in-out;
        font-size: 0.75rem;
        pointer-events: none;
        z-index: 10;
      }

      .icon-wrapper:hover .tooltip {
        visibility: visible;
        opacity: 1;
      }

      .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: #ffffff transparent transparent transparent;
      }
    `}</style>

    <footer className="footer">
      <div className="footer-container">
        <div className="app-name">&copy; 2025 AuraHP</div>
        <div className="contact-links">
          <a
            href="https://github.com/bharadwaj-dasari"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-wrapper"
          >
            <Github />
            <span className="tooltip">Github</span>
          </a>

          <a
            href="mailto:danixde0@gmail.com"
            className="icon-wrapper"
          >
            <Mail />
            <span className="tooltip">Email</span>
          </a>

          <a
            href="https://linkedin.com/in/arvix17"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-wrapper"
          >
            <Linkedin />
            <span className="tooltip">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;