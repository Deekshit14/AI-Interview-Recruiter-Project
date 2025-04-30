import React from 'react'
import DashboardProvider from './provider'


// We get children prop automatically from page.jsx which is nextjs feature
// This is the layout for the dashboard page. It wraps the children with the DashboardProvider component.

function DashboardLayout({ children }) {     
     return (
          // <div className = "bg-secondary">
          // <div className = "bg-[#152c57]">
          <div className = "bg-[#1d396e]">
               <DashboardProvider>
                    <div>
                         {children}     
                    </div>
               </DashboardProvider>
          </div>
     )
}

export default DashboardLayout;