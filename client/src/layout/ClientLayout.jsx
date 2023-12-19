import { Outlet } from "react-router-dom";
import { CheckoutSideMenu, Footer, NavBar, ScrollToTop } from "../components";
import SideBar from "../components/SideBar";

const ClientLayout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
      <NavBar />
      <Footer />
      <CheckoutSideMenu />
      <ScrollToTop />
    </>
  );
};

export default ClientLayout;
