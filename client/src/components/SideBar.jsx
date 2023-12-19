import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../context";

export default function SideBar() {
  const context = useContext(Context);
  return context.showSideBar ? (
    <ul className="fixed flex items-center flex-col gap-y-10 pt-16 inset-0 w-[200px] bg-gray-300 z-[100]">
      <button
        className="absolute right-5 top-5 border-solid border-2 rounded-xl px-2 bg-white"
        onClick={() => context.setShowSideBar(false)}
      >
        x
      </button>
      <li>
        <NavLink to="/">All</NavLink>
      </li>
      <li>
        <NavLink to="/laptops">Laptops</NavLink>
      </li>
      <li>
        <NavLink to="/tablets">Tablets</NavLink>
      </li>
      <li>
        <NavLink to="/cameras">Cameras</NavLink>
      </li>
      <li>
        <NavLink to="/headphones">Headphones</NavLink>
      </li>
      <li>
        <NavLink to="/cellphones">Cellphones</NavLink>
      </li>
      <li>
        <NavLink to="/accessories">Accessories</NavLink>
      </li>
    </ul>
  ) : null;
}
