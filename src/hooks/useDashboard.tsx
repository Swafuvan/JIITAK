import { useState } from "react";
import {
  DashboardIcon,
  GiftIcon,
  LastIcon,
  UserIconBlack,
} from "../helper/iconFIle";

export function useDashboard() {
  const [isLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainDashboard = "2024年 01月";
  const currentDateRange = "2024年2月1日 - 2024年2月5日";
  const monthlyDateRange = "2024年1月1日 - 2024年1月31日";

  const navItems = [
    { icon: DashboardIcon, label: "ダッシュボード", href: "/", active: true },
    { icon: UserIconBlack, label: "登録ユーザー", href: "/usermanagement" },
    { icon: GiftIcon, label: "当選者", href: "/winners" },
    { icon: LastIcon, label: "運営管理者", href: "/admin-management" },
  ];

  const logout = async () => {
    await fetch("/api/logout");
    window.location.href = "/login";
  };

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
   
  return {
    handleSidebar,
    isLoading,
    isSidebarOpen,
    mainDashboard,
    currentDateRange,
    monthlyDateRange,
    navItems,
    logout,
  };
}
