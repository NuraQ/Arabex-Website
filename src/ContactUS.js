import React from 'react';
import './Eleme.css'
import Beere from './Beere.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
function SocialFollow() {
    return (
      <div className="social-container">
        <a
          href="https://www.youtube.com/c/jamesqquick"
          className="youtube social"
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a
          href="https://www.facebook.com/Arabex-Arab-Experts-For-Architecture-Consultations-377223399037285/"
          className="facebook social"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com/jamesqquick" className="twitter social">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://www.instagram.com/learnbuildteach"
          className="instagram social"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <br></br>
        <a href="mailto:arabex.eng@gmail.com"
          className="social">
  
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
          arabex.eng@gmail.com
          </a>
      </div>
    );
  }
    const Contact = () => (
        <div style={{
            display: "flex",
            
            backgroundSize:"100% ",
            backgroundRepeat:"no-repeat",
            backgroundImage: `url(${Beere})`,
            justifyContent: "center",
            alignItems: "center",
            //   backgroundColor: "rgb(250, 235, 215)",
            height: 600
        }}
        >
            <div
    
                style={{
                    height: 400,
                    width: "75%",
                    backgroundColor: "#e2e7ec",/* fallback color */
                    background: "#e2e7ec",
                    opacity: 0.8,
    
                }}
    
            >
                <p style={{
                    fontSize: "1.4em",
    
                    marginTop: "14px",
    
                    marginLeft: "10px",
                }}>Contact Us
                </p>
                <pre >{
                    `EXPERTS FOR ARCHITECTURE AND CONSULTATION- ARABEX`}
                </pre>
                <SocialFollow />
            </div>
        </div>
    );
export default Contact;
