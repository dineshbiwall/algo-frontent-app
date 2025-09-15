"use client";

import UserBalance from "@/features/users/components/user-balance";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const userId = params.id as string;

  return <UserBalance userId={userId} />;
}
