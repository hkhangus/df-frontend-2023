import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { getAccessToken } from "../utils/functions/get_access_token";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const isLoggedIn = Boolean(getAccessToken())

    if (!isLoggedIn && pathname !== '/login') {
      router.replace('/login')
    } else if (isLoggedIn && pathname === '/login') {
      router.replace('/bookstore')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>;
}