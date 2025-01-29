"use client"

import { useState } from "react"
import { StatCard } from "@/ui/stat-card"
import { AgeChart } from "@/ui/age-chart"
import Navbar from "@/ui/Navbar"



const DashboardIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 1.5H2.33333C1.8731 1.5 1.5 1.8731 1.5 2.33333V8.16667C1.5 8.6269 1.8731 9 2.33333 9H6.5C6.96024 9 7.33333 8.6269 7.33333 8.16667V2.33333C7.33333 1.8731 6.96024 1.5 6.5 1.5Z" stroke="#FF9500" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.667 1.5H11.5003C11.0401 1.5 10.667 1.8731 10.667 2.33333V4.83333C10.667 5.29357 11.0401 5.66667 11.5003 5.66667H15.667C16.1272 5.66667 16.5003 5.29357 16.5003 4.83333V2.33333C16.5003 1.8731 16.1272 1.5 15.667 1.5Z" stroke="#FF9500" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.667 9H11.5003C11.0401 9 10.667 9.3731 10.667 9.83333V15.6667C10.667 16.1269 11.0401 16.5 11.5003 16.5H15.667C16.1272 16.5 16.5003 16.1269 16.5003 15.6667V9.83333C16.5003 9.3731 16.1272 9 15.667 9Z" stroke="#FF9500" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 12.3334H2.33333C1.8731 12.3334 1.5 12.7065 1.5 13.1667V15.6667C1.5 16.1269 1.8731 16.5 2.33333 16.5H6.5C6.96024 16.5 7.33333 16.1269 7.33333 15.6667V13.1667C7.33333 12.7065 6.96024 12.3334 6.5 12.3334Z" stroke="#FF9500" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const UserIcon = () => (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.0003 16.5C15.0003 14.7319 14.2979 13.0362 13.0477 11.786C11.7975 10.5358 10.1018 9.83337 8.33366 9.83337C6.56555 9.83337 4.86986 10.5358 3.61961 11.786C2.36937 13.0362 1.66699 14.7319 1.66699 16.5" stroke="#676562" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.33366 9.83333C10.6348 9.83333 12.5003 7.96785 12.5003 5.66667C12.5003 3.36548 10.6348 1.5 8.33366 1.5C6.03247 1.5 4.16699 3.36548 4.16699 5.66667C4.16699 7.96785 6.03247 9.83333 8.33366 9.83333Z" stroke="#676562" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.3333 15.6667C18.3333 12.8584 16.6667 10.25 15 9.00004C15.5478 8.58902 15.9859 8.04928 16.2755 7.4286C16.565 6.80792 16.6971 6.12543 16.66 5.44154C16.6229 4.75765 16.4178 4.09345 16.0629 3.50771C15.7079 2.92197 15.2141 2.43276 14.625 2.08337" stroke="#676562" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const GiftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.0625V6.25M10 4.0625C10 3.62985 10.1283 3.20692 10.3687 2.84719C10.609 2.48746 10.9507 2.20708 11.3504 2.04151C11.7501 1.87595 12.1899 1.83263 12.6143 1.91703C13.0386 2.00144 13.4284 2.20978 13.7343 2.51571C14.0402 2.82163 14.2486 3.21141 14.333 3.63574C14.4174 4.06007 14.3741 4.49991 14.2085 4.89962C14.0429 5.29933 13.7625 5.64098 13.4028 5.88134C13.0431 6.12171 12.6201 6.25 12.1875 6.25H10M10 4.0625C10 3.62985 9.87171 3.20692 9.63134 2.84719C9.39098 2.48746 9.04933 2.20708 8.64962 2.04151C8.24991 1.87595 7.81007 1.83263 7.38574 1.91703C6.96141 2.00144 6.57163 2.20978 6.26571 2.51571C5.95978 2.82163 5.75144 3.21141 5.66703 3.63574C5.58263 4.06007 5.62595 4.49991 5.79151 4.89962C5.95708 5.29933 6.23746 5.64098 6.59719 5.88134C6.95692 6.12171 7.37985 6.25 7.8125 6.25H10" stroke="#676562" strokeWidth="1.67" strokeMiterlimit="10" strokeLinecap="round" />
        <path d="M16.25 6.25H3.75C3.05964 6.25 2.5 6.80964 2.5 7.5V9.375C2.5 10.0654 3.05964 10.625 3.75 10.625H16.25C16.9404 10.625 17.5 10.0654 17.5 9.375V7.5C17.5 6.80964 16.9404 6.25 16.25 6.25Z" stroke="#676562" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.25 10.625V16.25C16.25 16.7473 16.0525 17.2242 15.7008 17.5758C15.3492 17.9275 14.8723 18.125 14.375 18.125H5.625C5.12772 18.125 4.65081 17.9275 4.29917 17.5758C3.94754 17.2242 3.75 16.7473 3.75 16.25V10.625M10 6.25V18.125" stroke="#676562" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const LastIcon = () => (
    <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.8333 16.5C14.8333 14.7319 14.131 13.0362 12.8807 11.7859C11.6305 10.5357 9.93478 9.83331 8.16667 9.83331C6.39856 9.83331 4.70286 10.5357 3.45262 11.7859C2.20238 13.0362 1.5 14.7319 1.5 16.5" stroke="#676562" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.16667 9.83333C10.4679 9.83333 12.3333 7.96785 12.3333 5.66667C12.3333 3.36548 10.4679 1.5 8.16667 1.5C5.86548 1.5 4 3.36548 4 5.66667C4 7.96785 5.86548 9.83333 8.16667 9.83333Z" stroke="#676562" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.23398 12.5H7.43398M9.23398 12.5L9.57058 10.7896C9.60061 10.6994 9.6088 10.6035 9.59447 10.5095C9.58014 10.4156 9.5437 10.3264 9.48817 10.2493C9.43263 10.1722 9.35957 10.1094 9.27501 10.0661C9.19045 10.0227 9.0968 10.0001 9.00178 10H7.66618C7.57116 10.0001 7.47752 10.0227 7.39296 10.0661C7.3084 10.1094 7.23534 10.1722 7.1798 10.2493C7.12426 10.3264 7.08783 10.4156 7.0735 10.5095C7.05917 10.6035 7.06736 10.6994 7.09738 10.7896L7.43398 12.5M9.23398 12.5L9.83398 16.3L8.33398 17.8L6.83398 16.3L7.43398 12.5" stroke="#676562" strokeWidth="1.50021" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)

export default function AdminDashboard() {
    const [isLoading] = useState(true)
    const currentDateRange = "2024年2月1日 - 2024年2月5日"
    const monthlyDateRange = "2024年1月1日 - 2024年1月31日"

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
                <div className="p-5">
                    <Navbar />
                </div>

                <nav className="space-y-1 px-3">
                    {[
                        { icon: <DashboardIcon />, label: "ダッシュボード", active: true },
                        { icon: <UserIcon />, label: "登録ユーザー" },
                        { icon: <GiftIcon />, label: "当選者" },
                        { icon: <LastIcon />, label: "運営管理者" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`flex items-center w-full gap-3 px-3 py-2 text-sm rounded-lg ${item.active ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="ユーザー登録数累計" isLoading={isLoading} dateRange={currentDateRange} />
                    <StatCard title="アクティブユーザー" isLoading={isLoading} dateRange={currentDateRange} />
                    <StatCard title="定着率" isLoading={isLoading} dateRange={monthlyDateRange} />
                    <StatCard title="平均訪問回数" isLoading={isLoading} dateRange={currentDateRange} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AgeChart isLoading={isLoading} />
                    </div>

                    <div className="space-y-6">
                        <StatCard title="抽選利用回数" isLoading={isLoading} dateRange={currentDateRange} />
                        <StatCard title="アカウント削除数" isLoading={isLoading} dateRange={currentDateRange} />
                    </div>
                </div>
            </div>
        </div>
    )
}

