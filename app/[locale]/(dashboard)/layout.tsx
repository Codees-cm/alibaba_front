
"use client"
import "./../globals.css";
import Sidenavbar from "@/components/Sidebar";
import withAuth from "@/hooks/withAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useMe } from "@/hooks/use-retiveme";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { UserRoleProvider } from "@/components/context/UserRoleContext";
export default function Layout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const router = useRouter();
  const { notifications, connectWebSocket } = useNotifications();
  const { me, isLoading, error } = useMe();
  connectWebSocket();

  if (error) {
    router.replace('auth/login');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <UserRoleProvider role={me?.data.role}>
      <div style={{ margin: 0, lineHeight: "inherit", paddingBottom: "0", display: "-webkit-inline-box" }}>
        <Sidenavbar lang={locale} role={me?.data.role} />
        {/* main page */}
        {children}
      </div>
    </UserRoleProvider>
  );
};
