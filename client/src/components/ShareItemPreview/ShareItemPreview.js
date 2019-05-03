import React from 'react';
import ItemsCard from '../ItemsCard';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';
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

export default connect(mapStateToProps)(ShareItemPreview);
