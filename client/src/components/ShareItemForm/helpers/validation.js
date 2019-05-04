export default function validate(values) {
  const errors = {};

  if (!values.title || values.title === '') {
    errors.title = 'Please name your item';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Please describe your item.';
  }

  return errors;
}
