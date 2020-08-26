import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userModeChangeContainer: {
    marginTop: theme.spacing(4),
    marginRight: "2em",
    display: 'flex',  
    flexDirection: 'column',
    alignItems: 'flex-end',    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  userModeButton: {
    margin: theme.spacing(3, 0, 2),
    width: "20em",
    [theme.breakpoints.down("xs")] : {
      width: "15em"
    }
  },
}));

export default function SignIn(props) {

  const classes = useStyles();
  const theme = useTheme();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm")); 

  const signInHandler = (event) => {
    event.preventDefault();
    props.signInClicked(username, password);
  }

  return (
    <div>
      <div className={classes.userModeChangeContainer}>
      </div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={signInHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            autoFocus           
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            autoComplete="current-password"            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>         
        </form>
      </div>
    </Container>
    </div>
  );
}