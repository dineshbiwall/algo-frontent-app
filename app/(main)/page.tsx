"use client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { UserRole } from "../../enums/user.enum";

// import AdminDashboard from "@/features/dashboard/admin-dashboard";
// import UserDashboard from "@/features/dashboard/user-dashboard";

const AdminDashboard = dynamic(
  () => import("@/features/dashboard/admin-dashboard"),
);
const UserDashboard = dynamic(
  () => import("@/features/dashboard/user-dashboard"),
);

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session) return <Fragment />;

  if (session.user.role === UserRole.ADMIN) {
    return <AdminDashboard />;
  }

  if (session.user.role === UserRole.USER) {
    return <UserDashboard />;
  }

  return <Fragment />;
}
