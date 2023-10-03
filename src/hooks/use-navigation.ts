import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAdmin from "./use-admin";

const COOKIE_TOKEN_NAME = "authToken";
export interface IMenu {
  title: string;
  href: string;
  action?: () => void;
}

const useNavigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { logout } = useAdmin();
  const router = useRouter();

  const mainMenuItems: IMenu[] = [
    {
      title: "About Us",
      href: "#about",
    },
    {
      title: "Mission and Vision",
      href: "#mission-and-vision",
    },
    {
      title: "Upcoming Events",
      href: "#events",
    },
    {
      title: "Ministry Programs",
      href: "#programs",
    },
    {
      title: "Follow Us",
      href: "#contact",
    },
  ];

  /**
   * Get the menu items depending on the user role.
   * Admins can add a new event and log out from the menu.
   * Non-admins see the menu items including admin login
   * @returns Menu items
   */
  const getMenuItems = (): IMenu[] => {
    if (loggedIn) {
      return [
        {
          title: "Add new event",
          href: "/new-event",
        },
        {
          title: "Logout",
          href: "#",
          action: logout,
        },
      ];
    }

    if (router.pathname === "/login") {
      return [
        {
          title: "Home",
          href: "/",
        },
      ];
    }

    return [
      ...mainMenuItems,
      {
        title: "Admin",
        href: "/login",
      },
    ];
  };

  // Determine admin login status for rendering menu items
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const isLoggedIn = (): boolean => {
    try {
      const authToken = Cookies.get(COOKIE_TOKEN_NAME);
      return !!authToken;
    } catch (e) {
      console.error("Error getting cookie", e);
      return false;
    }
  };

  return { getMenuItems };
};

export default useNavigation;
