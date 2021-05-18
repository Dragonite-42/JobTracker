import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import ProgressContainer from './ProgressContainer';
// import styles from '../styling/containers/MainContainer.css';

function MainContainer() {
    return (
        <div>
            <Button variant="contained" color="primary">
                Add Card
            </Button>
            <ProgressContainer id='progressContainer' />
        </div>
    )
}

export default MainContainer;