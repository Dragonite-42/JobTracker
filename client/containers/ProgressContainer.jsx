import React, { useEffect } from 'react';
import JobCard from '../components/Card';

function ProgressContainer({ progression }) {

  // id = 4
  // fetch (params: user_id, progression #)
  // response = jobs with progression # that is for this specific container
  // useEffect(() => {
  //   return fetch(`/jobs/getJobs/${1}`)
  //     .then(response => response.json())
  //     .then(jobs => {
  //       console.log(jobs)
  //       jobs.forEach(job => {
          
  //       })
  //     })
  // })
  return (
    <div className={progression}>
      <JobCard />
    </div>
  )
}

export default ProgressContainer;
