"use client";

import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {

     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true); // Add loading state
     const router = useRouter();

     useEffect(() => {
          CreateNewUser();
     }, []);

     const CreateNewUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
               setLoading(false);
               setUser(null);
               router.push('/auth'); // 🔥 Redirect to login if no user
               return;
          }

          // Check if user already exists
          let { data: Users, error } = await supabase
               .from('Users')
               .select("*")
               .eq('email', user?.email);

          if (Users?.length === 0) {
               const { data, error } = await supabase.from("Users")
                    .insert([
                         {
                              name: user?.user_metadata?.name,
                              email: user?.email,
                              picture: user?.user_metadata?.picture,
                         }
                    ]);

               console.log(data);
               setUser(data?.[0]);
          } else {
               setUser(Users?.[0]);
          }

          setLoading(false);
     };

     if (loading) {
          return (
               <div className="flex items-center justify-center h-screen">
                    <p>Loading...</p>
               </div>
          );
     }

     return (
          <UserDetailContext.Provider value={{ user, setUser }}>
               {children}
          </UserDetailContext.Provider>
     );
}

export default Provider;

export const useUser = () => {
     const context = useContext(UserDetailContext);
     return context;
};
