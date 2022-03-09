/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
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
  Text,
  SignUpContainer,
  SignLinks,
} from '../style/Styled';

import { AppStateType } from '../redux/store';
import { signUp, changeInput } from '../redux/auth/actions';

const schema = yup.object().shape({
  name: yup.string()
    .required('Please Enter a username')
    .max(50),
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
  dob: yup.string()
    .required('Please Enter your day of birthday')
    .matches(
      /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/,
      'YYYY-MM-DD',
    ),
});

const SignUp: React.FC<Props> = ({
  email,
  password,
  dob,
  name,
  signUpError,
  registration,
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

  const onClickRegistrate = () => {
    registration(name, email, password, dob, navigateHome);
  };

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate({
      pathname: '/',
    });
  };

  return (
    <Container >
      <SignUpContainer>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Title>
            <Typography variant="h6">Create new account</Typography>
          </Title>
          <Inputs>
            <TextField
              {...register('name')}
              name="name"
              type="text"
              label="Name"
              variant="filled"
              value={name}
              onChange={(e) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
            {signUpError ? (<Text><p>{signUpError}</p></Text>) : (<></>)}
          </Inputs>
          <Inputs>
            <TextField
              {...register('email')}
              name="email"
              label="Email"
              variant="filled"
              value={email}
              onChange={(e) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
            {signUpError ? (<Text><p>{signUpError}</p></Text>) : (<></>)}
          </Inputs>
          <Inputs>
            <TextField
              {...register('password')}
              name="password"
              type="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={(e) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
            {signUpError ? (<Text><p>{signUpError}</p></Text>) : (<></>)}
          </Inputs>
          <Inputs>
            <TextField
              {...register('dob')}
              name="dob"
              type="text"
              label="Day of Birthday"
              variant="filled"
              value={dob}
              onChange={(e) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
            {signUpError ? (<Text><p>{signUpError}</p></Text>) : (<></>)}
          </Inputs>
          <Buttons>
            <Button
              type="submit"
              onClick={onClickRegistrate}
            >
              Registration
            </Button>
            <Button
              color="inherit"
              type="submit"
            >
              <SignLinks to="/sign-in">Already have an account?</SignLinks>
            </Button>
          </Buttons>
        </form>
      </SignUpContainer>
    </Container>

  );
};

const mapStateToProps = (state: AppStateType) => {
  const {
    authReducer:
    {
      email,
      password,
      dob,
      name,
      signUpError,
    },
  } = state;
  return {
    email,
    password,
    dob,
    name,
    signUpError,
  };
};

const mapDispatchToProps = {
  registration: signUp,
  inputChange: changeInput,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
