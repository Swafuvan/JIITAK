"use client"

import { useState } from "react";
import { StatCard } from "@/ui/stat-card";
import { AgeChart } from "@/ui/age-chart";
import Navbar from "@/ui/Navbar";
import { DashboardIcon, GiftIcon, LastIcon, UserIconBlack } from "@/helper/iconFIle";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export function AdminDashboard() {
    const [isLoading,setIsLoading] = useState(false);
    const mainDashboard = "2024年 01月";
    const currentDateRange = "2024年2月1日 - 2024年2月5日";
    const monthlyDateRange = "2024年1月1日 - 2024年1月31日";

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white border-r p-5">
                <Navbar />
                <nav className="mt-5 space-y-2">
                    <Link href="/">
                        <button className="flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg bg-orange-100 text-orange-600">
                            <DashboardIcon />
                            <span>ダッシュボード</span>
                        </button>
                    </Link>
                    <Link href="/usermanagement">
                        <button className="flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
                            <UserIconBlack />
                            <span>登録ユーザー</span>
                        </button>
                    </Link>
                    <button className="flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
                        <GiftIcon />
                        <span>当選者</span>
                    </button>
                    <button className="flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
                        <LastIcon />
                        <span>運営管理者</span>
                    </button>
                </nav>
            </div>

            {/* Profile Menu */}
            <div className="flex justify-end p-2 mr-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="p-3 bg-slate-200 rounded-full">
                            <UserCircle className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-100" align="end">
                        <DropdownMenuItem onClick={() => console.log("プロフィール")}>プロフィール</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("ログアウト")}>ログアウト</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="ユーザー登録数累計" value="450人" change={12.5} isLoading={isLoading} dateRange={currentDateRange} />
                    <StatCard title="アクティブユーザー" value="50人 / 今月" change={316.6} isLoading={isLoading} dateRange={currentDateRange} />
                    <StatCard title="定着率" value="10% / 前月" change={16.6} isLoading={isLoading} dateRange={monthlyDateRange} />
                    <StatCard title="平均検索回数" value="4回 / 今月" change={100} isLoading={isLoading} dateRange={currentDateRange} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow">
                        <AgeChart isLoading={isLoading} />
                    </div>

                    <div className="space-y-6">
                        <StatCard title="抽選利用回数" value="125回 / 今月" change={47} isLoading={isLoading} dateRange={mainDashboard} />
                        <StatCard title="アカウント削除数" value="10人 / 今月" change={25} isLoading={isLoading} dateRange={currentDateRange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
