import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const COOKIE_TOKEN_NAME = "authToken";
export interface IMenu {
  title: string;
  href: string;
}

const useNavigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const mainMenuItems: IMenu[] = [
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Mission and Vision",
      href: "/mission-and-vision",
    },
    {
      title: "Upcoming Events",
      href: "/events",
    },
    {
      title: "Ministry Programs",
      href: "/programs",
    },
    {
      title: "Follow Us",
      href: "/contact",
    },
  ];

  // Get the menu items depending on the user authentication
  const getMenuItems = (): IMenu[] => {
    if (loggedIn) {
      return [
        ...mainMenuItems,
        {
          title: "Logout",
          href: "/logout",
        },
      ];
    } else {
      return [
        ...mainMenuItems,
        {
          title: "Admin",
          href: "/login",
        },
      ];
    }
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
