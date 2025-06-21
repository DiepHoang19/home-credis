import { useMemo } from "react";
import cookies from "js-cookie";
import { USER_INFO } from "@/contants/contants";

export const useAuthen = () => {
  const userInfo = useMemo(() => {
    const cookieData = cookies.get(USER_INFO);
    if (!cookieData) return null;

    try {
      return JSON.parse(cookieData);
    } catch (error) {
      console.error("Failed to parse user info from cookie:", error);
      return null;
    }
  }, []);

  return userInfo;
};
