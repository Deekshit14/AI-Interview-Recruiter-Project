"use client";

import { Button } from "@/components/ui/button";
import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarGroup,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { supabase } from "@/services/supabaseClient";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {

     const path = usePathname();
     console.log(path);

     const handleLogout = async () => {
          const { error } = await supabase.auth.signOut();

          if (error) {
               console.error('Error during logout:', error.message);
          } else {
               console.log('Logout successful');
               window.location.href = '/auth'; // redirect to home/login page after logout
          }
     };


     return (

          // <Sidebar className="bg-[#14397a] text-white">
          <Sidebar className="bg-[#041933] text-white">
               <SidebarHeader className="flex items-center mt-5">
                    <Image src={'/logo4.svg'} alt="logo" width={200} height={100}
                         className="w-[150px]"
                    />
                    {/* <Button className = "w-full mt-5"> <Plus /> Create New Interview </Button> */}
                    <Link href={'/dashboard/create-interview'} className="w-full mt-5">
                         <Button className="w-full mt-5"> <Plus /> Create New Interview </Button>
                    </Link>
               </SidebarHeader>
               <SidebarContent>
                    <SidebarGroup>
                         <SidebarContent>
                              <SidebarMenu>
                                   {SideBarOptions.map((option, index) => (
                                        <SidebarMenuItem key={index} className="p-1 text-white" >
                                             <SidebarMenuButton asChild
                                                  className={`p-5 bg-[#102641] ${path === option.path && 'bg-blue-100'}`}
                                             >
                                                  <Link href={option.path}>
                                                       <option.icon
                                                            className={`${path === option.path && 'text-primary'}`}
                                                       />
                                                       <span
                                                            className={`text-[16px] font-medium ${path === option.path && 'text-primary'}`}
                                                       >
                                                            {option.name}
                                                       </span>
                                                  </Link>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                              </SidebarMenu>
                         </SidebarContent>
                    </SidebarGroup>
               </SidebarContent>
               {/* <SidebarFooter /> */}
               <SidebarFooter className="p-4">
                    <Button
                         onClick={handleLogout}
                         className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                         Logout
                    </Button>
               </SidebarFooter>

          </Sidebar>

     )
}
