import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { getAccessToken } from "../utils/functions/get_access_token";
import path from "path";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = Boolean(getAccessToken());
    console.log(isLoggedIn,pathname)
    // if (!isLoggedIn && pathname !== "/login") {
    //   router.push("/login");
    // }
    // else if (isLoggedIn && pathname === "/login") {
    //   router.push("/bookstore");
    // }
  })

  return <>{children}</>;
}