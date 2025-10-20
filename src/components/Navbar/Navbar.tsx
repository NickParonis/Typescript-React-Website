import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isLightMode, setIsLightMode] = useState<boolean>(false);
    const [mobileMenuIsActive, setMobileMenuIsActive] = useState<boolean>(false);

    const switchLightMode = () => {
        const root = document.documentElement;
        if (root.getAttribute("data-theme") === "light") {
          root.removeAttribute("data-theme");
          setIsLightMode(false);
        } else {
          root.setAttribute("data-theme", "light");
          setIsLightMode(true);
        }
    };

    const toggleMenu = () => {
        setMobileMenuIsActive(!mobileMenuIsActive)
    };

    useEffect(() => {
        const links = document.querySelectorAll<HTMLAnchorElement>(".nav-link");
    
        links.forEach(link => {
            const handleClick = (e: Event) => {
                e.preventDefault();
    
                const href = link.getAttribute("href");
                if (!href) return; // skip if href is null
    
                const targetId = href.substring(1); // remove #
                const targetSection = document.getElementById(targetId);
    
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center",   // center vertically
                        inline: "nearest"  // default horizontal alignment
                    });
                }
            };
    
            link.addEventListener("click", handleClick);
    
            // Cleanup function
            // return () => {
            //     link.removeEventListener("click", handleClick);
            // };
        });
    }, []);

    
    return (
        <nav id="navbar" className="">
            <div className="nav-container">
                <div className="nav-items">


                    <div className={`nav-mobile nav-icon menu-btn-1 ${mobileMenuIsActive ? "active" : ""}`}
                        onClick={() => toggleMenu()}>
                        <span></span>
                    </div>

                    {/* <!-- Desktop Navigation --> */}
                    <div className="nav-desktop-menu">
                        <a href="#introductionSection" className="nav-link">Home</a>
                        <a href="#cardlistSection" className="nav-link">Experience</a>
                        <a href="#contactSection" className="nav-link">Contact</a>
                    </div>

                    <div className="nav-icons">
                        <a href="https://discord.gg/9ySCnmckXg" target="_blank">
                            <div className="nav-icon" aria-label="Source code">
                                <i className="fa-brands fa-discord"></i>
                            </div>
                        </a>

                        <div className="nav-icon" 
                            aria-label="Source code"
                            onClick={() => switchLightMode()}>
                            <i className={String(isLightMode ? "fas fa-sun" : "fas fa-moon")}></i>
                        </div>
                    </div>

                </div>
            </div>
                {/* <!-- Mobile Navigation Button --> */}
                <div className={`nav-mobile-menu ${mobileMenuIsActive ? "" : "nav-mobile-menu-inactive"}`}>
                        <a href="#introductionSection" className="nav-link" onClick={() => setMobileMenuIsActive(false)}>Home</a>
                        <a href="#cardlistSection" className="nav-link" onClick={() => setMobileMenuIsActive(false)}>Experience</a>
                        <a href="#contactSection" className="nav-link" onClick={() => setMobileMenuIsActive(false)}>Contact</a>
                </div>
        </nav>
    );
}
export default Navbar;