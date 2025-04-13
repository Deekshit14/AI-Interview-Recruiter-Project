import React from 'react'
import DashboardProvider from './provider'


// We get children prop automatically from page.jsx which is nextjs feature
// This is the layout for the dashboard page. It wraps the children with the DashboardProvider component.

function DashboardLayout({ children }) {     
     return (
          <div>
               <DashboardProvider>
                    {children}     
               </DashboardProvider>
          </div>
     )
}

export default DashboardLayout;