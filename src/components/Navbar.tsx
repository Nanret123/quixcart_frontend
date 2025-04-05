import CartModal from "@/pages/shop/CartModal";
import { logout, selectAuth } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminMenuItems, userMenuItems } from "@/data/dropdowns";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.cart.products);
  const { user } = useSelector(selectAuth);
  const [logoutApi] = useLogoutMutation();

  //handle  page state change
  const [isCartPageOpen, setIsCartPageOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleCart = () => {
    setIsCartPageOpen(!isCartPageOpen);
  };

  //handle dropdown toggle
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //logout user
  const handleLogout = async () => {
    try {
      await logoutApi({}).unwrap(); // Call API logout
      dispatch(logout()); // Update Redux state
      navigate("/"); // Redirect to login page
    } catch (error) {
      setErrorMessage("Failed to log out. Please try again.");
      console.error("error:", error);
    }
  };

  //determine menu items based on role
  const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="maxscreen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* logo */}
        <div className="nav__logo">
          <Link to="/">
            QuixCart<span>.</span>
          </Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>{" "}
            </Link>
          </span>
          <span className="">
            {user && (
              <button className="nav-btn" onClick={handleToggleCart}>
                <i className="ri-shopping-cart-fill"></i>
                <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                  {products.length}
                </sup>
              </button>
            )}
          </span>
          <span className="cursor-pointer" onClick={handleToggleDropdown}>
            {user ? (
              <>
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="user profile"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="size-8 flex items-center justify-center rounded-full bg-gray-300 text-white font-bold">
                    {user.firstname.charAt(0).toUpperCase()}
                  </div>
                )}

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.path}
                            onClick={() => setIsDropdownOpen(false)}
                            className="dropdown_items"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown_items font-medium text-[1.25rem] hover:text-red-500"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md border border-red-400">
            {errorMessage}
          </div>
        )}
      </nav>

      {/* cart page modal */}
      {isCartPageOpen && (
        <div>
          <CartModal
            products={products}
            isOpen={isCartPageOpen}
            onClose={handleToggleCart}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
