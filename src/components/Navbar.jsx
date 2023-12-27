"use client";

function Navbar() {
  return (
    <>
      <div className="navbar bg-neutral-focus p-4 mx-auto sticky top-0 z-10">
        <div className="navbar-start flex-1">
          <a className="btn btn-ghost normal-case text-white text-xl">
            doyeCodes
          </a>
        </div>
        <div class="navbar-end">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href='/'>Homepage</a>
              </li>
              <li>
                <a href='/portfolio'>Portfolio</a>
              </li>
              <li>
                <a href='#about-me'>About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
