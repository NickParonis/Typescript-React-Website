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
                        {/* <a href="#musicSection" className="nav-link">Contact</a> */}
                        {/* <div className="relative ml-4 group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                            <button className="contact-btn px-4 py-2 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 rounded-lg text-white text-sm font-medium relative z-10 flex items-center justify-center gap-2 group-hover:from-indigo-800/90 group-hover:to-purple-800/90 transition-all duration-300">
                                <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">Connect</span>
                            </button>
                        </div> */}
                    </div>

                    <div className="nav-icons">
                        {/* <div className="nav-icon" aria-label="Source code" >
                            <i className="fa-brands fa-github"></i>
                        </div> */}
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
                        {/* <div className='darkMode'>
                            <input type="checkbox" 
                                className="checkbox" 
                                id="checkbox"
                                onChange={() => switchLightMode()}>
                            </input>
                            <label htmlFor="checkbox" className="checkbox-label">
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                                <span className="ball"></span>
                            </label>
                        </div> */}
                    </div>

                </div>

                {/* <!-- Mobile Menu --> */}
                {/* <div id="mobile-menu" className="mobile-menu md:hidden h-0 overflow-hidden transition-all duration-300 ease-in-out">
                    <div className="pt-2 pb-4 space-y-1">
                        <a href="#home" className="mobile-nav-link block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-4 py-2 rounded-md transition-colors duration-200">Home</a>
                        <a href="#about" className="mobile-nav-link block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-4 py-2 rounded-md transition-colors duration-200">About</a>
                        <a href="#services" className="mobile-nav-link block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-4 py-2 rounded-md transition-colors duration-200">Services</a>
                        <a href="#portfolio" className="mobile-nav-link block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-4 py-2 rounded-md transition-colors duration-200">Portfolio</a>
                        <a href="#contact" className="mobile-nav-link block text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 px-4 py-2 rounded-md transition-colors duration-200">Contact</a>
                        <div className="px-4 pt-2">
                            <button className="contact-btn w-full px-4 py-2 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                                <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">Connect</span>
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
                {/* <!-- Mobile Navigation Button --> */}
                <div className={`nav-mobile-menu ${mobileMenuIsActive ? "" : "nav-mobile-menu-inactive"}`}>
                        <a href="#introductionSection" className="nav-link">Home</a>
                        <a href="#cardlistSection" className="nav-link">Experience</a>
                        <a href="#contactSection" className="nav-link">Contact</a>
                </div>
        </nav>
    );
}
export default Navbar;