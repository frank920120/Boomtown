import React from 'react';
import ItemsCard from '../ItemsCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemsCard item={shareItemPreview} />;
};
const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(ShareItemPreview);
