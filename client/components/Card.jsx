import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 250,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function JobCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function deleteCard() {
    const data = {
      id: props.jobInfo._id
    }
    fetch('/jobs/deleteJob', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(deletedCard => {
        console.log('deletedCard', deletedCard)
        // setNewCard(deletedCard);
      })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.jobInfo.company_name}
        subheader={props.jobInfo.job_title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Next Appointment:
          <Button size="small">
            Edit
          </Button>
          <br></br>
          {props.jobInfo.next_appointment}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" variant="contained" onClick={(e) => deleteCard()}>
          delete
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:
          <Button size="small">
              Edit
          </Button>
            <br></br>
            {props.jobInfo.notes}
          </Typography>
          <Typography paragraph>
            Contact:
          <br></br>
            {props.jobInfo.contact}
          </Typography>
        </CardContent>
      </Collapse>
    </Card >
  )
}