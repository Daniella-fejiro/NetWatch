import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  MdDashboard,
  MdDevices,
  MdReport,
  MdPerson,
  MdClose,
  MdLogout,
  MdDoorbell,
} from "react-icons/md";

import { FaNetworkWired } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { logoutUser } from "../services/authServices";

const navItems = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    path: "/",
  },
  {
    label: "Devices",
    icon: MdDevices,
    path: "/devices",
  },
  {
    label: "Incidents",
    icon: BiError,
    path: "/incidents",
  },
  {
    label: "Reports",
    icon: MdReport,
    path: "/reports",
  },
  {
    label: "Profile",
    icon: MdPerson,
    path: "/profile",
  },
];

export default function Sidebar({ open, setOpen }) {
  const navigate =  useNavigate()
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 h-screen sticky top-0 bg-surface border-r border-white/10 flex-col">
        <Logo />

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {logoutUser; navigate('/login')}}
            className="
              w-full rounded-xl border border-danger/20
              bg-danger/5 p-3
              flex items-center justify-center gap-2
              text-danger
              transition-all duration-200
              hover:bg-danger/10
              hover:border-danger/40
              active:scale-95
            "
          >
            <MdLogout className="text-lg" />
            <span className="text-sm font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-surface border-r border-white/10 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10">
                <Logo bordered={false} />

                <button
                  onClick={() => setOpen(false)}
                  className="text-primaryText"
                >
                  <MdClose size={24} />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => {logoutUser; navigate('/login')}}
                  className="
                    w-full rounded-xl border border-danger/20
                    bg-danger/5 p-3
                    flex items-center justify-center gap-2
                    text-danger
                    transition-all duration-200
                    hover:bg-danger/10
                    hover:border-danger/40
                    active:scale-95
                  "
                >
                  <MdLogout className="text-lg" />
                  <span className="text-sm font-medium">
                    Logout
                  </span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarItem({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.path} onClick={onClick}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 6 }}
          whileTap={{ scale: 0.97 }}
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
            isActive
              ? "bg-accent/10 text-accent"
              : "text-secondaryText hover:text-primaryText hover:bg-white/5"
          }`}
        >
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
            />
          )}

          <Icon size={22} />

          <span className="font-medium">
            {item.label}
          </span>
        </motion.div>
      )}
    </NavLink>
  );
}

function Logo({ bordered = true }) {
  return (
    <div className={`p-5 ${bordered ? "border-b border-white/10" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
          <FaNetworkWired
            className="text-accent"
            size={22}
          />
        </div>

        <div>
          <h2 className="font-heading font-bold text-lg text-primaryText">
            NetWatch
          </h2>

          <p className="text-xs text-secondaryText">
            Network Monitoring
          </p>
        </div>
      </div>
    </div>
  );
}