import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LoginParams } from "@/types";

export default function useAdmin() {
  const [errors, setErrors] = useState("");
  const router = useRouter();

  /**
   * Check for user authentication
   */
  useEffect(() => {
    if (!document.cookie) {
      router.push("/login");
    }

    if (router.route === "/login" && document.cookie) {
      router.push("/");
    }
  }, []);

  const handleAdminLogin = async (loginParams: LoginParams) => {
    try {
      const response = await axios.post("/api/auth/login", loginParams);
      const newToken = response?.data?.token;
      setCookie("authToken", newToken, 1);
      setErrors("");

      router.push("/");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error
        : "We are unable to process your registration. Please try again later";
      setErrors(errorMessage);
    }
  };

  return { handleAdminLogin, errors };
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}
