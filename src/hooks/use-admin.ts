import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LoginParams } from "@/types";

const COOKIE_TOKEN_NAME = "authToken";
const COOKIE_EXPIRY_DAYS = 7;

export default function useAdmin() {
  const [errors, setErrors] = useState("");
  const router = useRouter();

  /**
   * Handle admin login request,
   * setting token in the cookie that expires in 7 days.
   * @param loginParams Login credentials
   */
  const handleAdminLogin = async (loginParams: LoginParams) => {
    try {
      const response = await axios.post("/api/auth/login", loginParams);
      const newToken = response?.data?.token;
      Cookies.set(COOKIE_TOKEN_NAME, newToken, { expires: COOKIE_EXPIRY_DAYS });
      setErrors("");

      router.push("/");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error
        : "We are unable to process your registration. Please try again later";
      setErrors(errorMessage);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove(COOKIE_TOKEN_NAME);

      // Redirect accordingly
      if (router.pathname === "/") {
        window.location.reload();
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out admin. ", error);
    }
  };

  return { handleAdminLogin, logout, errors };
}
