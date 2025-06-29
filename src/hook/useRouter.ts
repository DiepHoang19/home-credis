import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      pathname: location.pathname,
    }),
    [navigate, location]
  );

  return router;
}
