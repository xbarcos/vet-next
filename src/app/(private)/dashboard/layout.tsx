"use client";

import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/ui/primary-button";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCog,
  Settings,
  LogOut,
  Activity,
  PawPrint,
  Router,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const sidebarLinks = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
  {
    label: "Painel Admin",
    href: "/dashboard",
    icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
  {
    label: "Consultas",
    href: "/dashboard",
    icon: <Activity className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
  {
    label: "Tratamentos",
    href: "/dashboard/profile",
    icon: <PawPrint className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
  {
    label: "Sua Clínica",
    href: "/dashboard/settings",
    icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    console.log('Chamou logout');
    const response = await fetch('/api/logout', {method: 'POST'});
    console.log(response);

  }
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex flex-col md:flex-row h-screen w-full">
          <Sidebar>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Logo />
                <div className="mt-8 flex flex-col gap-2">
                  {sidebarLinks.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
                <SidebarLink
                  link={{
                    label: "João Marcos",
                    href: "#",
                    icon: (
                      <Image
                        src="https://pbs.twimg.com/profile_images/1863672250483802112/8b4IwBkG_400x400.jpg"
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />                
                <PrimaryButton title={"Deslogar"} icon={LogOut} onClick={handleLogout} className="cursor-pointer"/>
              </div>
            </SidebarBody>
          </Sidebar>
          <main className="flex-1 bg-white dark:bg-neutral-900 overflow-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function Logo() {
  return (
    <Link href="/dashboard" className="flex space-x-2 items-center text-sm text-black py-1">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm" />
      <span className="font-medium text-black dark:text-white whitespace-pre">
        Neopets
      </span>
    </Link>
  );
}
