import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from '../ShareItemForm/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/shareItemPreview/reducer';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../../apollo/queries';
import validate from './helpers/validation';
import { ViewerContext } from '../../context/ViewerProvider';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
    this.fileInput = React.createRef();
  }

  handleSelectTag = event => {
    this.setState({
      selectedTags: event.target.value
    });
  };
  handleSelectFile = event => {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  };
  applyTags = tags => {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  };
  getBase64Url = () => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  };
  resetFileInput = () => {
    this.fileInput.current.value = '';
    this.props.resetImage();
    this.setState({
      fileSelected: false
    });
  };
  generateTagsText = (tags, selected) => {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  };
  dispatchUpdate = (values, tags, updateItem) => {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }

    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  };

  triggerInputFile = () => this.fileInput.current.click();
  saveItem = async (values, tags, addItem) => {
    try {
      const newItem = { ...values, tags: this.applyTags(tags) };
      await addItem({ variables: { item: newItem } });
    } catch (e) {
      throw Error(e);
    }
  };
  render() {
    const { classes, tags, updateItem } = this.props;
    const { selectedTags } = this.state;

    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => {
          return (
            <Mutation
              refetchQueries={() => [
                { query: ALL_ITEMS_QUERY, variables: { filter: viewer.id } }
              ]}
              mutation={ADD_ITEM_MUTATION}
            >
              {(addItem, { data }) => (
                <Form
                  validate={validate.bind(this)}
                  onSubmit={values => {
                    this.saveItem(values, tags, addItem);
                    this.props.history.push('/items');
                  }}
                  render={({ handleSubmit, pristine, invalid, form }) => {
                    return (
                      <form
                        onSubmit={handleSubmit}
                        className={classes.formContainer}
                      >
                        <FormSpy
                          subscription={{ values: true }}
                          component={({ values }) => {
                            if (values) {
                              this.dispatchUpdate(values, tags, updateItem);
                            }
                            return '';
                          }}
                        />
                        <Typography
                          variant="display2"
                          className={classes.header}
                        >
                          Share. Borrow. Prosper.
                        </Typography>
                        {this.state.fileSelected ? (
                          <Button
                            onClick={this.resetFileInput}
                            className={classes.resetButton}
                          >
                            RESET AN IMAGE
                          </Button>
                        ) : (
                          <Button
                            onClick={this.triggerInputFile}
                            variant="contained"
                            className={classes.button}
                          >
                            SELECT AN IMAGE
                          </Button>
                        )}

                        <input
                          hidden
                          ref={this.fileInput}
                          onChange={e => this.handleSelectFile(e)}
                          type="file"
                          name="imageSelect"
                          id="imageSelect"
                        />
                        <Field
                          name="title"
                          render={({ input, meta }) => (
                            <div>
                              <TextField
                                className={classes.textField}
                                type="text"
                                {...input}
                                placeholder="Name your Item"
                              />
                              {meta.touched &&
                                meta.error && <span>{meta.error}</span>}
                            </div>
                          )}
                        />
                        <Field
                          name="description"
                          render={({ input, meta }) => (
                            <div>
                              <TextField
                                id="standard-textarea"
                                className={classes.textField}
                                multiline
                                rows="5"
                                type="text"
                                {...input}
                                placeholder="Describe your Item"
                              />
                              {meta.touched &&
                                meta.error && <span>{meta.error}</span>}
                            </div>
                          )}
                        />
                        <Field name="tags">
                          {({ input, meta }) => {
                            return (
                              <Select
                                className={classes.formControl}
                                multiple
                                value={selectedTags}
                                onChange={e => this.handleSelectTag(e)}
                                renderValue={selected => {
                                  return this.generateTagsText(tags, selected);
                                }}
                              >
                                {tags &&
                                  tags.map(tag => (
                                    <MenuItem key={tag.id} value={tag.id}>
                                      <Checkbox
                                        checked={
                                          selectedTags.indexOf(tag.id) > -1
                                        }
                                      />
                                      <ListItemText primary={tag.title} />
                                    </MenuItem>
                                  ))}
                              </Select>
                            );
                          }}
                        </Field>
                        <Button
                          type="submit"
                          className={classes.share}
                          variant="contained"
                          disabled={pristine || invalid}
                        >
                          Share
                        </Button>
                      </form>
                    );
                  }}
                />
              )}
            </Mutation>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}
ShareForm.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  updateItem: PropTypes.func.isRequired,
  resetImage: PropTypes.func.isRequired,
  resetItem: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetImage() {
    dispatch(resetImage());
  },
  resetItem() {
    dispatch(resetItem());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ShareForm)));
