const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: 400,
    height: 550,
    textAlign: 'center',
    margin: 10,
    position: 'relative'
  },
  profileImg: {
    borderRadius: '50%'
  },
  profileItem: {
    display: 'flex',
    alignItems: 'center'
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    textAlign: 'left'
  },
  tags: {
    display: 'flex',
    justifyContent: 'start',
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10
    // whiteSpace: 'nowrap'
  },

  button: {
    position: 'absolute',
    bottom: 10
  }
};

export default styles;
