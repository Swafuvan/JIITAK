"use client";

import { StatCard } from "@/ui/stat-card";
import { AgeChart } from "@/ui/age-chart";
import Navbar from "../ui/Navbar";

import Link from "next/link";
import { LogOut, Menu, User, UserCircle, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/hooks";

export function AdminDashboard() {
  const {
    currentDateRange,
    isLoading,
    isSidebarOpen,
    logout,
    mainDashboard,
    monthlyDateRange,
    navItems,
    handleSidebar,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <button
        onClick={handleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r p-5 transform transition-transform duration-200 ease-in-out z-40",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <Navbar />
        <nav className="mt-5 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  "flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg",
                  item.active
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex justify-end p-4 lg:p-2 mr-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="p-3 bg-slate-200 rounded-full"
            >
              <UserCircle className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="font-medium">
              <User /> プロフィール
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="font-medium">
              <LogOut />
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-4 lg:ml-64 lg:p-8 pt-16 lg:pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-8">
          <StatCard
            title="ユーザー登録数累計"
            value="450人"
            change={12.5}
            isLoading={isLoading}
            dateRange={currentDateRange}
          />
          <StatCard
            title="アクティブユーザー"
            value="50人 / 今月"
            change={316.6}
            isLoading={isLoading}
            dateRange={currentDateRange}
          />
          <StatCard
            title="定着率"
            value="10% / 前月"
            change={16.6}
            isLoading={isLoading}
            dateRange={monthlyDateRange}
          />
          <StatCard
            title="平均検索回数"
            value="4回 / 今月"
            change={100}
            isLoading={isLoading}
            dateRange={currentDateRange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2">
            <AgeChart isLoading={isLoading} />
          </div>
          <div className="space-y-4 lg:space-y-6">
            <StatCard
              title="抽選利用回数"
              value="125回 / 今月"
              change={47}
              isLoading={isLoading}
              dateRange={mainDashboard}
            />
            <StatCard
              title="アカウント削除数"
              value="10人 / 今月"
              change={25}
              isLoading={isLoading}
              dateRange={currentDateRange}
            />
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleSidebar}
        />
      )}
    </div>
  );
}
