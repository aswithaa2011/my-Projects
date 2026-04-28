// src/components/Cart/CardContext.jsx
import { createContext, useEffect, useState } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === product.name);

      if (existingItem) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        return prev.filter((item) => item.name !== product.name);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <CardContext.Provider
      value={{ 
        cartItems, setCartItems, addToCart, 
        searchTerm, setSearchTerm, 
        wishlistItems, toggleWishlist 
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
