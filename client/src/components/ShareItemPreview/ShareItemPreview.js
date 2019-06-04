import React from 'react';
import ItemsCard from '../ItemsCard';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';
import PropTypes from 'prop-types';
const ShareItemPreview = ({ shareItemPreview }) => {
  return (
    <ViewerContext.Consumer>
      {({ loading, viewer }) => {
        return <ItemsCard viewer={viewer} item={shareItemPreview} />;
      }}
    </ViewerContext.Consumer>
  );
};
const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

ShareItemPreview.propTypes = {
  shareItemPreview: PropTypes.object
};

export default connect(mapStateToProps)(ShareItemPreview);
