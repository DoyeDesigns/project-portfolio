"use client";

function Navbar() {
  return (
    <>
      <div className="navbar bg-neutral-focus p-4 mx-auto sticky top-0 z-50">
        <div className="navbar-start flex-1">
          <a className="btn btn-ghost normal-case text-white text-xl">
            DoyeCodes
          </a>
        </div>
        <div className="navbar-end">
          <div className="text-zinc-100 hidden lg:block">
            <ul className=" flex gap-8">
              <li>
                <a href="/">Homepage</a>
              </li>
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#about-me">About</a>
              </li>
              <li>
                <a href="#featured-section">Featured projects</a>
              </li>
              <li>
                <a href="#contact-me">Contact me</a>
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
              className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
