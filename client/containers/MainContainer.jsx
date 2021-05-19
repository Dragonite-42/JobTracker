import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import ProgressContainer from './ProgressContainer';
// import styles from '../styling/containers/MainContainer.css';
import { useState } from 'react';
import '../stylesheets/index.css';

const useStyles = makeStyles({
  progress: {
    display: 'flex',
    gap: '50px'
  },
});

function MainContainer() {
  const classes = useStyles();
  const array = [];
  const hiringStep = [
    'Need to Apply',
    'Application Sent',
    'Phone Interview',
    'Tech Interview'
  ]
  // make array of ProgressContainers
  const [modalBoolean, setModalBoolean] = useState(false)
  for (let i = 0; i < hiringStep.length; i++) {
    array.push(
      <div>
        {hiringStep[i]}
        <ProgressContainer id={i} />
      </div>
    )
  }


  function handleClick(event) {
    modalBoolean === false ? setModalBoolean(true) : setModalBoolean(false);
  }

  console.log('modalBoolean', modalBoolean);

  function getAllJobs(user) {
    const getJobs = fetch(exampleurl)
      .then(
        response.json())
      .then(jobs => {
        const array = []
        jobs.forEach((job) => {
          const something = <Card jobs.desciption job.progression />
          // filter cards based on progression
          if (job.progression === 0) // rendering it in the progress container id 0
            if (job.progression === 1) // rendering it in the progress container id 1
              array.push(something)
          this.setState(array)
        })
      })
  }
  /*

  array of object
  
  */
  return (
    <div>
      <div>
        <Button variant="contained" color="primary" onClick={(event) => handleClick(event)}>
          Add Job
        </Button>
      </div>
      <div className='modal'>
        {modalBoolean === true && <div>
          <form>
            <input placeholder='Company Name'></input>
            <input placeholder='Job Title'></input>
            <input type='submit' value='Submit'></input>
          </form>
        </div>
        }
      </div>
      <div className={classes.progress}>
        {array}
      </div>
    </div>
  )
}

export default MainContainer;
