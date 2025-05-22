import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewsList from './_components/LatestInterviewsList'

function Dashboard() {
     return (
          <div>
               {/* <WelcomeContainer /> */}
               <h2 className = "mt-10 mb-5 font-bold text-2xl text-white">Dashboard</h2>
               <CreateOptions />
               <LatestInterviewsList />
          </div>
     )
}

export default Dashboard