export default function validate(values, checkedTags) {
  const errors = {};

  if (!values.title || values.title === '') {
    errors.title = 'Please name your item';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Please describe your item.';
  }
  if (!checkedTags || checkedTags.length === 0) {
    errors.tags = 'Please add at least one tag';
  }
  return errors;
}
