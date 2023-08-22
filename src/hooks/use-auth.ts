import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LoginParams } from "@/utils/types";

export default function useAuth() {
  const [jwtToken, setJwtToken] = useState("");
  const [errors, setErrors] = useState("");
  const router = useRouter();

  useEffect(() => {
    setJwtToken(document.cookie);
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

  return { jwtToken, handleAdminLogin, errors };
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}
