import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  DollarSign,
  Menu,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  UserPen
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const sideBarItems = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", path: "/admin/dashboard" },
  { name: "Products", icon: ShoppingBag, color: "#885CF6", path: "/admin/products" },
  { name: "Users", icon: Users, color: "#EC4899", path: "/admin/users" },
  { name: "Sales", icon: DollarSign, color: "#108981", path: "/admin/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E08", path: "/admin/orders" },
  { name: "Analytics", icon: TrendingUp, color: "#3882F6", path: "/admin/analytics" },
  { name: "Profile", icon: UserPen , color: "#6EE787", path: "/admin/profile" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isOpen ? 256 : 80 }}
    >
      <div className="h-full backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover: hover:bg-gray-300 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <ul className="mt-8 flex-grow flex-col ml-2">
          {sideBarItems.map((item, index) => (
            <Link key={item.path} to={item.path}>
              <motion.div className="flex items-center p-4 text sm font-medium rounded hover:bg-gray-300 transition-colors mb-2">
                <item.icon
                  size={22}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;
