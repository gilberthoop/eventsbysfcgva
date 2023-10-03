import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const COOKIE_TOKEN_NAME = "authToken";

const useAuthorization = () => {
  const router = useRouter();

  /**
   * Check for user authorization on protected routes.
   * Redirect authenticated admin from Login page.
   */
  useEffect(() => {
    const authToken = Cookies.get(COOKIE_TOKEN_NAME);

    if (!authToken) {
      router.push("/login");
    }

    if (router.route === "/login" && authToken) {
      router.push("/");
    }
  }, []);
};

export default useAuthorization;
