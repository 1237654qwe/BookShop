import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { Container, Title, Inputs, Buttons } from '../api/Styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SignInContainer } from '../api/Styled';

import { AppStateType } from '../redux/store';
import { signIn, changeInput } from "../redux/auth/actions";

const SignIn: React.FC<Props> = ({
  email,
  pass,
  login,
  inputChange
}) => {

  const onClickLogin = () => {
    login(email, pass);
  };

  return (
    <SignInContainer>
      <Container>
        <form >
          <Title>
            <Typography variant="h6">Enter in your accaunt</Typography>
          </Title>
          <Inputs>
            <TextField
              name="email"
              type="email"
              label="Email"
              variant="filled"
              value={email}
              onChange={(e) => {
                inputChange(e.target.name, e.target.value)
              }}
            />
          </Inputs>
          <Inputs>
            <TextField
              name="pass"
              type="password"
              label="Password"
              variant="filled"
              value={pass}
              onChange={(e) => {
                inputChange(e.target.name, e.target.value)
              }}
            />
          </Inputs>
          <Buttons>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={onClickLogin}
            >
              Login
            </Button>
            <Button
              color="inherit"
              type="submit"
            >
              <Link to="/signUp"> Create an account</Link>
            </Button>
          </Buttons>
        </form>
      </Container>
    </SignInContainer>

  );
};

const mapStateToProps = (state: AppStateType) => {
  const { authReducer: { email, pass } } = state;
  return { email, pass };
};

const mapDispatchToProps = {
  login: signIn,
  inputChange: changeInput,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { };

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);