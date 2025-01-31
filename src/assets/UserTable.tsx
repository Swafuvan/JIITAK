"use client";

import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { LogOut, Search, User, UserCircle, Menu, X } from "lucide-react";
import Navbar from "@/ui/Navbar";
import {
  DashboardIconBlack,
  GiftIcon,
  LastIcon,
  UserIcon,
} from "../helper/iconFIle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTable } from "@/hooks";

export function UserTable() {
  const {
    logout,
    filteredUsers,
    paginatedUsers,
    totalPages,
    currentPage,
    itemsPerPage,
    searchTerm,
    handleSearchTerm,
    handleSetCurrPage,
    startIndex,
    handleSidebarClick,
    isSidebarOpen,
    toggleSidebar,
  } = useTable();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div
        className={`w-full lg:w-64 bg-white border-r lg:min-h-screen fixed lg:static transition-transform duration-300 sidebar ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-5">
          <Navbar />
        </div>
        <nav className="space-y-1 px-3">
          <Link href="/">
            <button className="flex items-center w-full gap-3 px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              <DashboardIconBlack />
              <span>ダッシュボード</span>
            </button>
          </Link>
          <Link href="/usermanagement">
            <button className="flex items-center w-full gap-3 px-3 py-2 text-sm rounded-lg bg-orange-100 text-orange-600">
              <UserIcon />
              <span>登録ユーザー</span>
            </button>
          </Link>
          <button className="flex items-center w-full gap-3 px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
            <GiftIcon />
            <span>当選者</span>
          </button>
          <button className="flex items-center w-full gap-3 px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
            <LastIcon />
            <span>運営管理者</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-5 overflow-x-auto">
        <div className="flex justify-end items-center mb-4">
          <div className="flex justify-end p-4 lg:p-2 mr-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="p-3 bg-slate-200 rounded-full md:p-2 lg:p-3"
                >
                  <UserCircle className="h-6 w-6 " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="md:w-40 w-48 bg-slate-200"
              >
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
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-md bg-gray-200 menu-btn"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>

            <h2 className="text-lg font-medium hidden md:table-cell ml-3">
              登録ユーザー一覧
            </h2>
          </div>

          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ニックネーム / メールアドレスで検索"
              value={searchTerm}
              onChange={handleSearchTerm}
              className="text-gray-400 pl-8 rounded-full"
            />
          </div>
        </div>

        <div className="border rounded-lg bg-white shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">No.</TableHead>
                <TableHead>ニックネーム</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead className="hidden md:table-cell">生年月</TableHead>
                <TableHead className="hidden md:table-cell">性別</TableHead>
                <TableHead className="hidden md:table-cell">居住地</TableHead>
                <TableHead className="hidden md:table-cell">登録日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell">
                    {startIndex + index + 1}
                  </TableCell>
                  <TableCell className="truncate max-w-[100px] md:max-w-none">
                    {user.nickname}
                  </TableCell>
                  <TableCell className="truncate max-w-[80px] sm:max-w-[150px] md:max-w-none">
                    {user.email.length > 10
                      ? user.email.substring(0, 10) + "..."
                      : user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.birthDate}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.gender}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.location}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.registrationDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="ml-2 flex justify-end mt-4">
          <p className="justify-start w-48 h-6 hidden md:table-cell">
            5,000人中 - 10人表示
          </p>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handleSetCurrPage} />
              </PaginationItem>
              {[1, 2, 3, 4, 5].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={handleSetCurrPage}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={handleSetCurrPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
