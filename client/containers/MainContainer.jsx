import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import ProgressContainer from './ProgressContainer';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  progress: {
    display: 'flex',
    gap: '50px'
  },
});

function MainContainer() {
  const classes = useStyles();
  const hiringStep = [
    'Need to Apply',
    'Application Sent',
    'Phone Interview',
    'Tech Interview'
  ]
  const [modalBoolean, setModalBoolean] = useState(false)
  const [jobCardArray, setJobCardArray] = useState([]);
  const [newCard, setNewCard] = useState({});

  const prog1 = [];
  const prog2 = [];
  const prog3 = [];
  const prog4 = [];

  useEffect(() => {
    fetch(`/jobs/getJobs/1`)
      .then(response => response.json())
      .then(array => {
        array.forEach(job => {
          if (job.progression === 1) {
            prog1.push(job);
            // console.log('prog1 length, ', prog1.length)
          }
          if (job.progression === 2) {
            prog2.push(job)
            // console.log(prog2.length)
          }
          if (job.progression === 3) {
            prog3.push(job);
            // console.log(prog3.length)
          }
          if (job.progression === 4) {
            prog4.push(job);
            // console.log(prog4.length)
          }
        })
      })
      .then(() => sortCardsByProgression())
  }, [newCard, jobCardArray])

  function sortCardsByProgression() {
    const populatedJobCardArray = [];
    for (let i = 1; i <= hiringStep.length; i++) {
      let currentArray = eval(`prog${i}`);
      populatedJobCardArray.push(
        <div>
          {hiringStep[i - 1]}
          <ProgressContainer key={i} progArray={currentArray} jobCardArray={jobCardArray} />
        </div>
      )
    }
    setJobCardArray(populatedJobCardArray);
  }

  function handleClick(event) {
    modalBoolean === false ? setModalBoolean(true) : setModalBoolean(false);
  }
  function handleSubmit() {
    const data = {
      user_id: 1,
      company_name: document.getElementById('name').value,
      job_title: document.getElementById('title').value,
      notes: document.getElementById('notes').value,
      progression: document.getElementById('progression').value,
      next_appointment: document.getElementById('appointment').value,
      contact: document.getElementById('contact').value,
    }
    fetch('/jobs/addJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(addedCard => {
        console.log('addedCard', addedCard)
        setNewCard(addedCard);
      })
  }

  return (
    <div>
      <div>
        <Button variant="contained" color="primary" onClick={(event) => handleClick()}>
          Add Job
        </Button>
      </div>
      <div className='modal'>
        {modalBoolean === true && <div>
          <input id='name' placeholder='Company Name'></input>
          <br></br>
          <input id='title' placeholder='Job Title'></input>
          <br></br>
          <input id='appointment' placeholder='Next Appointment Date'></input>
          <br></br>
          <input id='notes' placeholder='Notes'></input>
          <br></br>
          <input id='progression' placeholder='Hiring Stage'></input>
          <br></br>
          <input id='contact' placeholder='Contact Info'></input>
          <br></br>
          <button onClick={() => handleSubmit()}>Submit</button>
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
