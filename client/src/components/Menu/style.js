const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    zIndex: 99999,
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    width: 50,
    height: 50
  },
  button: {
    float: 'right'
  },
  toolbar: {
    display: 'flex',

    justifyContent: 'space-between'
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2
  },
  navRight: {
    display: 'flex'
  }
});

export default styles;
