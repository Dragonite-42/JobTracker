import React, { useEffect } from 'react';
import JobCard from '../components/Card';

function ProgressContainer(props) {
  const jobArray = [];
  for (let i = 0; i < props.progArray.length; i++) {
    jobArray.push(
      <JobCard key={i} jobInfo={props.progArray[i]} jobCardArray={props.jobCardArray} />
    )
  }
  return (
    <div>
      {jobArray}
    </div>
  )
}

export default ProgressContainer;
