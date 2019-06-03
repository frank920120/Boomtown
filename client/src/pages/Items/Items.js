import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';
import PropTypes from 'prop-types';
const Items = ({ classes, items }) => {
  return <ItemsGrid items={items} />;
};
Items.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};
export default Items;
