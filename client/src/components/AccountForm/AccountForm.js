import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation';
import { Form, Field } from 'react-final-form';
import styles from './styles';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      formToggle: true
    };
  }

  render() {
    const { classes, loginMutation, signupMutation } = this.props;

    return (
      <Form
        onSubmit={values => {
          const user = { variables: { user: values } };
          console.log(user);
          this.state.formToggle
            ? loginMutation(user).catch(error => this.setState({ error }))
            : signupMutation(user).catch(error => this.setState({ error }));
        }}
        validate={validate.bind(this)}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field
                  name="fullname"
                  render={({ input }) => (
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        ...input,
                        autoComplete: 'off'
                      }}
                      value={input.value}
                    />
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field
                name="email"
                render={({ input }) => (
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      ...input,
                      autoComplete: 'off'
                    }}
                    value={input.value}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field
                name="password"
                render={({ input }) => (
                  <Input
                    id="password"
                    type="password"
                    inputProps={{
                      ...input,
                      autoComplete: 'off'
                    }}
                    value={input.value}
                  />
                )}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={pristine || invalid}
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      // @TODO: Reset the form on submit
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? 'Create an account.'
                      : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
              {(this.state.error &&
                this.state.formToggle &&
                this.state.error.graphQLErrors[0].message) ||
                (this.state.error &&
                  !this.state.formToggle &&
                  this.state.error.graphQLErrors[0].message)}
            </Typography>
          </form>
        )}
      />
    );
  }
}
const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
