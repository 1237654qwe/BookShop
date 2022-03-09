/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AppStateType } from '../redux/store';
import {
  Container,
  Title,
  UserInputs,
  Buttons,
  Imgs,
} from '../style/Styled';
import {
  loadUser,
  changeUserInput,
  updateUser,
  updateAvatar,
  updateUserPass,
} from '../redux/user/actions';

const User: React.FC<Props> = ({
  name,
  email,
  password,
  dob,
  avatarUrl,
  userLoad,
  inputUserChange,
  userUpdate,
  avatarUpdate,
  userPassUpdate,
}) => {
  const [edit, setEdit] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  useEffect(() => {
    userLoad();
  }, [userLoad]);

  const editPhoto = (e: any) => {
    const avatar = e.target.files[0];
    avatarUpdate(avatar);
  };

  const editPasswordHandler = () => {
    setNewPassword(!newPassword);
  };

  const saveEditPasswordHandler = () => {
    userPassUpdate(password);
    setNewPassword(!newPassword);
  };

  const editHandler = () => {
    setEdit(!edit);
  };

  const saveEditHandler = () => {
    userUpdate(name, email, dob);
    setEdit(!edit);
  };

  return (
    <>
      {edit ? (
        <Container>
          <form >
            <Title>
              <Typography variant="h6">Edit your account</Typography>
            </Title>
            <UserInputs>
              <TextField
                name="name"
                type="text"
                label="Name"
                variant="filled"
                value={name}
                onChange={(e: { target: { name: string; value: string; }; }) => {
                  inputUserChange(e.target.name, e.target.value);
                }}
              />
            </UserInputs>
            <UserInputs>
              <TextField
                name="email"
                label="Email"
                variant="filled"
                value={email}
                onChange={(e: { target: { name: string; value: string; }; }) => {
                  inputUserChange(e.target.name, e.target.value);
                }}
              />
            </UserInputs>
            <UserInputs>
              <TextField
                name="dob"
                type="text"
                label="Day of Birthday"
                variant="filled"
                value={dob.substr(0, 10)}
                onChange={(e: { target: { name: string; value: string; }; }) => {
                  inputUserChange(e.target.name, e.target.value);
                }}
              />
            </UserInputs>
            <>
              {newPassword ? (<UserInputs>
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  variant="filled"
                  onChange={(e: { target: { name: string; value: string; }; }) => {
                    inputUserChange(e.target.name, e.target.value);
                  }}
                />
              </UserInputs>
              ) : (<div></div>)}
            </>

            <Buttons>
              {!newPassword
                ? (<Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={editPasswordHandler}
                >
                  Изменить пароль
                </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveEditPasswordHandler}
                  >
                    Сохранить пароль
                  </Button>)}
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={saveEditHandler}
              >
                Сохранить
              </Button>
            </Buttons>
          </form>
        </Container>
      ) : (
        <Container>
          <Imgs>
            <img
              src={`http://localhost:3001/static/${avatarUrl}`}
              width='400px'
              height='400px'
              alt='нет фото'>
            </img>

            <Button
              variant="contained"
              color="primary"
              type="button"
            >
              <input name="avatar" type="file" style={{
                position: 'absolute',
                transition: '.5s ease',
                opacity: '0',
              }}
                onChange={editPhoto}
              />
              Выбрать фото
            </Button>

          </Imgs>
          <div className='container-form'>
            <p>Имя: {name}</p>
            <p>Email: {email}</p>
            <p>Дата рождения: {dob.substr(0, 10)}</p>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={editHandler}
            >
              Редактировать
            </Button>
          </div>

        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  const {
    userReducer: {
      user: {
        name,
        email,
        password,
        dob,
        avatarUrl,
      },
    },
  } = state;
  return {
    name,
    email,
    password,
    dob,
    avatarUrl,
  };
};

const mapDispatchToProps = {
  userLoad: loadUser,
  inputUserChange: changeUserInput,
  userUpdate: updateUser,
  avatarUpdate: updateAvatar,
  userPassUpdate: updateUserPass,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(User);
