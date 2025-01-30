"use client";

import { useState } from "react";
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
import { Search, UserCircle } from "lucide-react";
import Navbar from "@/ui/Navbar";
import {
  DashboardIconBlack,
  GiftIcon,
  LastIcon,
  UserIcon,
} from "@/helper/iconFIle";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface User {
  id: number;
  nickname: string;
  email: string;
  birthDate: string;
  gender: string;
  location: string;
  registrationDate: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    nickname: "ゆうと",
    email: "example1@example.com",
    birthDate: "1992年12月",
    gender: "男性",
    location: "静岡県",
    registrationDate: "2024年01月12日",
  },
  {
    id: 2,
    nickname: "ニックネーム最大12文字",
    email: "user234@example.net",
    birthDate: "1987年5月",
    gender: "女性",
    location: "東京都",
    registrationDate: "2024年01月12日",
  },
  {
    id: 3,
    nickname: "わんこ好き",
    email: "user145@example.net",
    birthDate: "1999年12月",
    gender: "男性",
    location: "静岡県",
    registrationDate: "2024年01月12日",
  },
  {
    id: 4,
    nickname: "あおい",
    email: "user987@example.net",
    birthDate: "2004年7月",
    gender: "女性",
    location: "静岡県",
    registrationDate: "2024年 01月 11日",
  },
];

export function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = sampleUsers.filter(
    (user) =>
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-64 bg-white border-r min-h-screen">
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

      <div className="flex-1 p-5">
        <div className="flex justify-end mb-3 mr-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="p-3 bg-slate-200 rounded-full">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger >
            <DropdownMenuContent className="bg-slate-100" align="end">
              <DropdownMenuItem onClick={() => console.log("プロフィール")}>プロフィール</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("ログアウト")}>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium ml-3 ">登録ユーザー一覧</h2>
          <div className="flex mb-4 justify-end gap-4 mr-5">
            <div className="relative w-[300px] ">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ニックネーム / メールアドレスで検索" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-gray-400 pl-8 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No.</TableHead>
                <TableHead>ニックネーム</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>生年月</TableHead>
                <TableHead>性別</TableHead>
                <TableHead>居住地</TableHead>
                <TableHead>登録日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{user.nickname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthDate}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      

        <div className="ml-2 flex justify-end mt-4">
          <p className="justify-start w-48 h-6">5,000人中 - 10人表示</p>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem><PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} /></PaginationItem>
              {[1, 2].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>{page}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
