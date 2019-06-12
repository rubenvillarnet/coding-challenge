import { withStyles } from '@material-ui/styles';
import view from './view'
import { theme } from '../../lib/theme';

const styles = {
  content: {
    margin: 'auto',
    marginTop: theme.spacing(4)
  },
  newUserButton: {
    position: "absolute",
    bottom: "50px",
    right: "50px"
  },
  title:{
    marginBottom: theme.spacing(2)
  },
  tableContainer:{
    maxWidth: "1080px",
    margin: "auto",
    padding: theme.spacing(2)
  },
  rowTitle:{
    fontSize: "1.1em"
  },
  tablePagination:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  newUserContainer:{
    minWidth: "60vw",
    margin: theme.spacing(2),
    position: "relative",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  formContainer:{
    padding: theme.spacing(2)
  },
  newUserForm:{
    display: "flex",
    flexDirection: "column",
    width: "250px"
  },
  formControl:{
    marginBottom: theme.spacing(2)
  },
  closeButton:{
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },
  modalOverlay:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  modalBox:{
    width: "360px",
    height: "460px",
    padding: theme.spacing(2),
    margin: "auto"
  }


};

export default withStyles(styles)(view)
