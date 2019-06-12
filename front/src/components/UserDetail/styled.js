import { withStyles } from '@material-ui/styles';
import view from './view'
import { theme } from '../../lib/theme';

const styles = {
  form:{
    display: "flex",
    flexDirection: "column"
  },
  formControl:{
    marginBottom: theme.spacing(2)
  },
  updateButton:{
    marginBottom: theme.spacing(4)
  },
  closeButton:{
    marginLeft: theme.spacing(2)
  }
}

export default withStyles(styles)(view)
