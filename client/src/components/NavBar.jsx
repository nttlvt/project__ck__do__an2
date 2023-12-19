import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-hot-toast";
import { clearLocalStorage } from "../utils/auth";

const activeStyle = "hidden lg:block underline underline-offset-4";
const activeStyles = "underline underline-offset-4";
const notActive = "hidden lg:block";

export const NavBar = () => {
  const context = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    context.setLoading(true);
    axiosClient
      .post(`/api/auth/logout`)
      .then(() => {
        context.setProfile(null);
        clearLocalStorage();
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Logout Failed");
      })
      .finally(() => {
        context.setLoading(false);
      });
  };
  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-2 md:py-5 px-8 text-sm font-light fondo">
      <ul className="flex items-center gap-3">
        <div className="lg:hidden flex items-center p-4">
          <button onClick={() => context.setShowSideBar(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeStyle : notActive)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/laptops"
            className={({ isActive }) => (isActive ? activeStyle : notActive)}
          >
            Laptops
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tablets"
            className={({ isActive }) => (isActive ? activeStyle : notActive)}
          >
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cameras"
            className={({ isActive }) => (isActive ? activeStyle : notActive)}
          >
            Cameras
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/headphones"
            className={({ isActive }) => (isActive ? activeStyle : notActive)}
          >
            Headphones
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cellphones"
            className={({ isActive }) => (isActive ? activeStyle : notActive)}
          >
            Cellphones
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={({ isActive }) => (isActive ? activeStyle : notActive)}
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <ul className="flex items-center gap-3">
        {context.profile && (
          <>
            <button onClick={logout} className="flex gap-1 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
            <li className="text-black/60 hidden md:block">
              {context.profile.name}
            </li>
            <li>
              <NavLink
                to="/my-orders"
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? activeStyles : undefined
                }
              >
                Account
              </NavLink>
            </li>
          </>
        )}
        {!context.profile && (
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive ? activeStyles : undefined
              }
            >
              Sign in
            </NavLink>
          </li>
        )}
        <li className="flex">
          <NavLink
            to="/cart-shopping"
            className={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            <ShoppingCartIcon className="h-5 w-5 text-black"></ShoppingCartIcon>
          </NavLink>
          {context.productsCount === 0 ? (
            <div className="flex justify-center items-center text-xs font-semibold">
              {context.productsCount}
            </div>
          ) : (
            <div className="flex justify-center items-center bg-green-100 w-5 h-5 rounded-full text-xs font-semibold">
              {context.productsCount}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};
