import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BarChart, Users } from "lucide-react";

export default function Home() {

  const menuItems = [
    { name: "Dashboard", icon: BarChart, href: "/dashboard", active: true },
    { name: "Farmer Metrics", icon: Users, href: "/farmerdetails ", active: true },
  ];

  return (
    <div className="2xl:w-[700px]">
      <div className="flex">
      
        <div className="bg-[#D2A15C] w-[300px] h-screen pt-8 flex flex-col items-center shadow-lg">
          <div className="text-center mb-8">
            <Image
              src="/images/Rutubalogo-removebg-preview.png"
              alt="RutubaFarm"
              width={150}
              height={80}
              className="w-48 2xl:w-48 xl:w-32 lg:w-32 h-auto"
            />
          </div>

          <nav className="flex-grow">
            <ul className="space-y-10 ml-4 2xl:ml-4 xl:ml-4 lg:ml-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 mt-16 transition-colors group ${
                      item.active
                        ? "hover:bg-[#89C945] hover:text-[#D2A15C]"
                        : "hover:bg-[#89C945] hover:text-[#D2A15C]"
                    }`}
                  >
                    <item.icon
                      className={`mr-2 ${
                        item.active ? "text-black" : "text-black"
                      }`}
                      size={38}
                    />
                    <span className="text-xl 2xl:text-2xl xl:text-xl lg:lg font-bold text-white">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
