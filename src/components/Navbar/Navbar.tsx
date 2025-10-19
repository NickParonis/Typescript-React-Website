import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isLightMode, setIsLightMode] = useState<boolean>(false);

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
                    {/* <!-- Logo --> */}
                    {/* <div className="flex items-center">
                        <div className="text-xl font-medium bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                            FutureNav
                        </div>
                    </div> */}

                    {/* <!-- Desktop Navigation --> */}
                    <div className="nav-desktop hidden md:flex items-center space-x-1">
                        <a href="#introductionSection" className="nav-link">Home</a>
                        <a href="#cardlistSection" className="nav-link">About</a>
                        <a href="#contactSection" className="nav-link">Services</a>
                        <a href="#musicSection" className="nav-link">Contact</a>
                        {/* <div className="relative ml-4 group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                            <button className="contact-btn px-4 py-2 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 rounded-lg text-white text-sm font-medium relative z-10 flex items-center justify-center gap-2 group-hover:from-indigo-800/90 group-hover:to-purple-800/90 transition-all duration-300">
                                <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">Connect</span>
                            </button>
                        </div> */}
                    </div>

                    {/* <!-- Mobile Navigation Button --> */}
                    {/* <div className="flex md:hidden">
                        <button id="mobile-menu-button" className="relative w-10 h-10 focus:outline-none group" aria-label="Toggle menu">
                            <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                                <span className="block h-0.5 w-5 bg-cyan-400 mb-1 transform transition duration-300 ease-in-out" id="line1"></span>
                                <span className="block h-0.5 w-5 bg-cyan-400 mb-1 transform transition duration-300 ease-in-out" id="line2"></span>
                                <span className="block h-0.5 w-5 bg-cyan-400 transform transition duration-300 ease-in-out" id="line3"></span>
                            </div>
                        </button>
                    </div> */}

                    <div className="nav-icons">
                        <div className="nav-icon" aria-label="Source code" >
                            <svg className="nav-svg" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 16 16" 
                                fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </div>
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
        </nav>
    );
}
export default Navbar;