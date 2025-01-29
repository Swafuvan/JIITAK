import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Gift, Settings } from "lucide-react"
import Image from "next/image"
import NinstaLogo from "../../../public/Ninsta Logo.png"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Rewards",
    icon: Gift,
    href: "/admin/rewards",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col fixed">
      <div className="p-6">
        <Image src={NinstaLogo || "/placeholder.svg"} alt="Logo" width={120} height={40} className="object-contain" />
      </div>
      <nav className="flex-1 px-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 ${
              pathname === item.href ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

