import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Utility/Hooks/UseAuth/useAuth";

const MainLayout = () => {
  const { user, signOutUser } = useAuth();
  // Sign Out User
  const signOut = () => {
    signOutUser().then().catch();
  };
  // Navigation Link
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/tasks"}>Manage Task</NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  bg-base-300">
          {/* Navbar */}
          <div className="container mx-auto navbar">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            {/* Website Logo */}
            <img
              src="https://i.ibb.co/Syy2tpj/logo.png"
              className="w-[40px] h-[40px]"
              alt=""
            />
            {/* Website Name */}
            <div className="flex-1 px-2 mx-2 lg:mx-0 font-bold text-2xl">
              Task Pulse
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal font-semibold">
                {/* Navbar menu content  */}
                {links}
                {user ? (
                  // Sign Out User Button
                  <button
                    onClick={signOut}
                    className="border-b-4  bg-black text-white border-b-main rounded-none px-4 py-2 text-center "
                  >
                    Sign out
                  </button>
                ) : (
                  <li>
                    <Link to={"/signIn"}>
                      {" "}
                      <button className="border-b-4 border-main hover:rounded-none">
                        Sign In
                      </button>{" "}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* Page content */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content */}
            {links}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
