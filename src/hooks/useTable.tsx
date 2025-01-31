import { User } from "lucide-react";
import { useEffect, useState } from "react";

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
  {
    id: 5,
    nickname: "ポンたろう",
    email: "user07@example.net",
    birthDate: "2004年7月",
    gender: "女性",
    location: "静岡県",
    registrationDate: "2024年 01月 11日",
  },
  {
    id: 6,
    nickname: "ひまわりさん",
    email: "user24@example.net",
    birthDate: "2004年7月",
    gender: "女性",
    location: "静岡県",
    registrationDate: "2024年 01月 11日",
  },
  {
    id: 7,
    nickname: "ぴょんぴょん",
    email: "user90@example.net",
    birthDate: "2004年7月",
    gender: "女性",
    location: "静岡県",
    registrationDate: "2024年 01月 11日",
  },
  {
    id: 8,
    nickname: "まさやん",
    email: "user127@example.net",
    birthDate: "2004年7月",
    gender: "女性",
    location: "静岡県",
    registrationDate: "2024年 01月 11日",
  },
  {
    id: 9,
    nickname: "ポンたろう",
    email: "user87@example.net",
    birthDate: "2004年7月",
    gender: "女性",
    location: "静岡県",
    registrationDate: "2024年 01月 11日",
  },
];

export function useTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".sidebar") && !target.closest(".menu-btn")) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("click", handleSidebarClick);
    } else {
      document.removeEventListener("click", handleSidebarClick);
    }

    return () => {
      document.removeEventListener("click", handleSidebarClick);
    };
  }, [isSidebarOpen]);

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

  const logout = async () => {
    await fetch("/api/logout");
    window.location.href = "/login";
  };

  const handleSearchTerm = (e: any) => setSearchTerm(e.target.value);

  const handleSetCurrPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return {
    logout,
    totalPages,
    paginatedUsers,
    filteredUsers,
    itemsPerPage,
    currentPage,
    searchTerm,
    handleSearchTerm,
    handleSetCurrPage,
    startIndex,
    handleSidebarClick,
    isSidebarOpen,
    toggleSidebar
  };
}
