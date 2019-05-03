const styles = theme => ({
  root: {
    backgroundColor: '#212121',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center'
  },
  profileDiv: {
    width: '90%',
    height: 250,
    backgroundColor: 'white',
    marginTop: 100,
    flexBasis: '100%',
    maxWidth: '90%'
  },
  profileImg: {
    borderRadius: '50%'
  },
  header: {
    display: 'flex'
  },
  container: {
    padding: 50
  },
  fullname: {
    marginLeft: 10,
    lineHeight: 'normal'
  },
  shareitem: {
    marginLeft: '5%',
    fontSize: 50,
    color: '#f9a825',
    backgroundColor: '#212121',
    paddingTop: 50
  },
  items: {
    marginBottom: 100
  },
  shareitemContainer: {
    width: '100%'
  }
});

export default styles;
