import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import ProgressContainer from './ProgressContainer';
// import styles from '../styling/containers/MainContainer.css';
import { useState, useEffect } from 'react';
import '../stylesheets/index.css';

const useStyles = makeStyles({
  progress: {
    display: 'flex',
    gap: '50px'
  },
});

function MainContainer() {
  const classes = useStyles();
  // const array = [];
  const hiringStep = [
    'Need to Apply',
    'Application Sent',
    'Phone Interview',
    'Tech Interview'
  ]
  // make array of ProgressContainers
  const [modalBoolean, setModalBoolean] = useState(false)
  const [jobCardArray, setJobCardArray] = useState([]);

  const prog1 = [];
  const prog2 = [];
  const prog3 = [];
  const prog4 = [];

  useEffect(() => {
    console.log('inside useEffect')
    fetch(`/jobs/getJobs/${1}`)
      .then(response => response.json())
      .then(array => {
        array.forEach(job => {
          if (job.progression === 1) {
            prog1.push(job);
            console.log('prog1 length, ', prog1.length)
          }
          if (job.progression === 2) {
            prog2.push(job)
            console.log(prog2.length)
          }
          if (job.progression === 3) {
            prog3.push(job);
            console.log(prog3.length)
          }
          if (job.progression === 4) {
            prog4.push(job);
            console.log(prog4.length)
          }
        })
      })
      .then(() => sortCardsByProgression())
  }, [])

  function sortCardsByProgression() {
    const populatedJobCardArray = [];
    for (let i = 1; i <= hiringStep.length; i++) {
      let currentArray = eval(`prog${i}`);
      populatedJobCardArray.push(
        <div>
          {hiringStep[i - 1]}
          <ProgressContainer progArray={currentArray} />
        </div>
      )
    }
    setJobCardArray(populatedJobCardArray);
  }

  function handleClick(event) {
    modalBoolean === false ? setModalBoolean(true) : setModalBoolean(false);
  }

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
        {jobCardArray}
      </div>
    </div>
  )
}

export default MainContainer;
