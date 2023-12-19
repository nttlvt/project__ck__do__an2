import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/products";
import { getUserProfileFromLocalStorage } from "../utils/auth";

export const Context = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //loading
  const [loading, setLoading] = useState(false);

  //sidebar
  const [showSideBar, setShowSideBar] = useState(false);

  // Items
  const [items, setItems] = useState(products);

  //User profile
  const [profile, setProfile] = useState(getUserProfileFromLocalStorage);

  // Open/ Close detail
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Open/ Close checkout side menu
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Product detail
  const detailItem = localStorage.getItem("productDetail");
  const productDetail = detailItem ? JSON.parse(detailItem) : {};

  const [showProductDetail, setShowProductDetail] = useState(productDetail);
  localStorage.setItem("productDetail", JSON.stringify(showProductDetail));

  // Carrito compras traer
  const item = localStorage.getItem("comprarShopi");
  const result = item ? JSON.parse(item) : [];

  // Carrito compras enviar
  const [cartProducts, setCartProducts] = useState(result);
  const addToCart = (item) => {
    const index = cartProducts?.findIndex(
      (val) => val.product._id === item._id
    );
    if (index > -1) {
      cartProducts[index].quantity++;
      setCartProducts([...cartProducts]);
    } else {
      const data = {
        product: item,
        quantity: 1,
      };
      setCartProducts([...cartProducts, data]);
    }
  };
  useEffect(() => {
    localStorage.setItem("comprarShopi", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <Context.Provider
      value={{
        items,
        setItems,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        showProductDetail,
        setShowProductDetail,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        productsCount: cartProducts?.reduce(
          (count, item) => count + item.quantity,
          0
        ),
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        loading,
        setLoading,
        addToCart,
        profile,
        setProfile,
        showSideBar,
        setShowSideBar,
      }}
    >
      {children}
    </Context.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.object,
};
