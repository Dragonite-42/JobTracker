import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import ProgressContainer from './ProgressContainer';
import CardModal from '../components/CardModal';
// import styles from '../styling/containers/MainContainer.css';
import { useState } from 'react';
import '../stylesheets/index.css';

const useStyles = makeStyles({
  progress: {
    display: 'flex'
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
    const [columns, setColumns]= useState(4)
    const [ modalBoolean, setModalBoolean] = useState(false)
    for(let i = 0; i < columns; i++){
        array.push(
            <div>
                {hiringStep[i]}
                <ProgressContainer/>
            </div>
        )
    }
    
    function handleClick(){
        modalBoolean === false ? setModalBoolean(true) : setModalBoolean(false);
    }

    console.log('modalBoolean ', modalBoolean);

    return (
        <div>
          <div>
          <Button variant="contained" color="primary" onClick={(e) => handleClick()}>
            Add Job
          </Button>
          </div>
          <div className='modal'>
              {modalBoolean === true && <div>
                <CardModal/>
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
