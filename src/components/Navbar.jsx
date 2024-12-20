"use client";

import React, { useState, useEffect } from "react";

function Navbar() {
  const isBrowser = typeof window !== "undefined";
  const [theme, setTheme] = useState(
    isBrowser && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light",
  );

  const [isChecked, setIsChecked] = useState(theme === "synthwave");

  const toggleTheme = (e) => {
    const newTheme = e.target.checked ? "synthwave" : "light";
    console.log(newTheme);
    setTheme(newTheme);
    isBrowser && localStorage.setItem("theme", newTheme);
    setIsChecked(e.target.checked);
  };

  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="navbar bg-secondary p-4 mx-auto sticky top-0 z-50">
        <div className="navbar-start flex-1">
          <a href="/" className="btn btn-ghost normal-case text-white text-xl ">
            DoyeCodes
          </a>
        </div>
        <div className="navbar-end">
          <div className="text-zinc-100 text-sm hidden lg:block">
            <ul className=" flex gap-8">
              <li>
                <a href="/">Homepage</a>
              </li>
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a href="/#about-me">About</a>
              </li>
              <li>
                <a href="/#featured-section">Featured projects</a>
              </li>
              <li>
                <a href="/#contact-me">Contact me</a>
              </li>
              <li>
                <label className="flex cursor-pointer gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2"
                    onChange={toggleTheme}
                    checked={isChecked}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-md text-primary dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/">Homepage</a>
              </li>
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#about-me">About me</a>
              </li>
              <li>
                <a href="#featured-section">Featured projects</a>
              </li>
              <li>
                <a href="#contact-me">Contact me</a>
              </li>
              <li>
                <label className="flex cursor-pointer gap-2 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2"
                    onChange={toggleTheme}
                    checked={isChecked}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
