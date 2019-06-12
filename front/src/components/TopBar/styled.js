import { withStyles } from '@material-ui/styles';
import view from './view'

const styles = {
  toolBar:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1080px"
  }
}

export default withStyles(styles)(view)
