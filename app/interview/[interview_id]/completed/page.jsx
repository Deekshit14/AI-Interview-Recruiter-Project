// import React from 'react'

// function InterviewComplete() {
//      return (
//           <div>InterviewComplete</div>
//      )
// }

// export default InterviewComplete


'use client';
import { useEffect } from 'react';

function InterviewComplete() {
     useEffect(() => {
          // Check if already visited
          const alreadyVisited = sessionStorage.getItem('interviewCompleteVisited');

          if (!alreadyVisited) {
               sessionStorage.setItem('interviewCompleteVisited', 'true');
               window.location.reload(); // 👈 force a full reload once
          }
     }, []);

     return (
          <div>InterviewComplete</div>
     );
}

export default InterviewComplete;
