import { useState } from "react";
import {
  HiAnnotation,
  HiBriefcase,
  HiCursorClick,
  HiHeart,
  HiHome,
  HiIdentification,
  HiLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiUser,
  HiUsers,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userMenu = [
    {
      title: "Home",
      onClick: () => {
        navigate("/");
      },
      path: "/",
      icon: <HiHome />,
    },
    {
      title: "Applied Jobs",
      onClick: () => {
        navigate("/applied-jobs");
      },
      path: "/applied-jobs",
      icon: <HiAnnotation />,
    },
    {
      title: "Posted Jobs",
      onClick: () => {
        navigate("/posted-jobs");
      },
      path: "/posted-jobs",
      icon: <HiCursorClick />,
    },
    {
      title: "Profile",
      onClick: () => {
        navigate(`/profile/${user.id}`);
      },
      path: "/profile/:id",
      icon: <HiHeart />,
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      path: "/login",
      icon: <HiLogout />,
    },
  ];
  const AdminMenu = [
    {
      title: "Home",
      onClick: () => {
        navigate("/");
      },
      path: "/",
      icon: <HiHome />,
    },
    {
      title: "Applications",
      onClick: () => {
        navigate("/admin/applications");
      },
      path: "/admin/applications",
      icon: <HiIdentification />,
    },
    {
      title: "Jobs",
      onClick: () => {
        navigate("/admin/jobs");
      },
      path: "/admin/jobs",
      icon: <HiBriefcase />,
    },
    {
      title: "Users",
      onClick: () => {
        navigate("/admin/users");
      },
      path: "/admin/users",
      icon: <HiUsers />,
    },
    {
      title: "Profile",
      onClick: () => {
        navigate(`/profile/${user.id}`);
      },
      path: "/profile/:id",
      icon: <HiHeart />,
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      path: "/login",
      icon: <HiLogout />,
    },
  ];
  const menu = user.isAdmin ? AdminMenu : userMenu;
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="menu">
          {menu.map((menuItem, index) => {
            const isActive = location.pathname === menuItem.path;
            return (
              <div
                key={index}
                className={`menu-item ${isActive && "active-menu-item"}`}
                onClick={menuItem.onClick}
              >
                {menuItem.icon}
                {expanded && <span>{menuItem.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header  justify-content-between d-flex">
          <div className="d-flex align-items-center gap-3">
            {expanded ? (
              <HiOutlineX
                size={22}
                onClick={() => setExpanded(false)}
                className="menu-icon"
              />
            ) : (
              <HiOutlineMenu
                size={22}
                onClick={() => setExpanded(true)}
                className="menu-icon"
              />
            )}

            <span className="logo">JOB-PORTAL</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <HiUser size={22} />
            <span className="logo">{user?.name}</span>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
