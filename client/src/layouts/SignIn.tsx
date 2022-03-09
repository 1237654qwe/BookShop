/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
import React from 'react';
// import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  Container,
  Title,
  Inputs,
  Buttons,
  SignLinks,
  Text,
} from '../style/Styled';

import { SignInContainer } from '../style/Styled';
import { AppStateType } from '../redux/store';
import { signIn, changeInput } from '../redux/auth/actions';

const schema = yup.object().shape({
  email: yup.string()
    .required('Please Enter your Email')
    .email()
    .max(20),
  password: yup.string()
    .required('Please Enter your password')
    .min(6).max(70)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number ',
    ),
});

const SignIn: React.FC<Props> = ({
  email,
  password,
  signInError,
  login,
  inputChange,
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = () => {
    reset();
  };

  const onClickLogin = () => {
    login(email, password, navigateHome);
  };

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate({
      pathname: '/',
    });
  };

  return (
<Container >
      <SignInContainer>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Title>
            <Typography variant="h6">Create new account</Typography>
          </Title>
          <Inputs>
            <TextField
              {...register('email')}
              name="email"
              type="email"
              label="Email"
              variant="filled"
              value={email}
              onChange={(e: { target: { name: string; value: string; }; }) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
          </Inputs>
          <Inputs>
            <TextField
              {...register('password')}
              name="password"
              type="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={(e: { target: { name: string; value: string; }; }) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
            {signInError ? (<Text><p>{signInError}</p></Text>) : (<></>)}
          </Inputs>
          <Buttons>
            <Button
              type="submit"
              onClick={onClickLogin}
            >
              Login
            </Button>
            <Button
              color="inherit"
              type="submit"
            >
              <SignLinks to="/sign-up" color="primary"> Create an account</SignLinks>
            </Button>
          </Buttons>
        </form>
      </SignInContainer>
    </Container>
  );
};

const mapStateToProps = (state: AppStateType) => {
  const { authReducer: { email, password, signInError } } = state;
  return { email, password, signInError };
};

const mapDispatchToProps = {
  login: signIn,
  inputChange: changeInput,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
