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
  Imgs
} from '../api/Styled';
import {
  loadUser,
  changeUserInput,
  updateUser,
  updateAvatar,
  updateUserPass
} from '../redux/user/actions';

const User: React.FC<Props> = ({
  name,
  email,
  pass,
  dob,
  avatarUrl,
  userLoad,
  inputUserChange,
  userUpdate,
  avatarUpdate,
  userPassUpdate
}) => {

  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState(false);

  useEffect(() => {
    userLoad()
  }, []);

  const editPhoto = (e: any) => {
    const avatar = e.target.files[0];
    avatarUpdate(avatar);
  };

  const editPasswordHandler = () => {
    setPassword(!password);
  };

  const saveEditPasswordHandler = () => {
    userPassUpdate(pass);
    setPassword(!password);
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
                onChange={(e) => {
                  inputUserChange(e.target.name, e.target.value)
                }}
              />
            </UserInputs>
            <UserInputs>
              <TextField
                name="email"
                label="Email"
                variant="filled"
                value={email}
                onChange={(e) => {
                  inputUserChange(e.target.name, e.target.value)
                }}
              />
            </UserInputs>
            <UserInputs>
              <TextField
                name="dob"
                type="text"
                label="Day of Birthday"
                variant="filled"
                value={dob}
                onChange={(e) => {
                  inputUserChange(e.target.name, e.target.value)
                }}
              />
            </UserInputs>
            <>
              {password ? (<UserInputs>
                <TextField
                  name="pass"
                  type="password"
                  label="Password"
                  variant="filled"
                  onChange={(e) => {
                    inputUserChange(e.target.name, e.target.value)
                  }}
                />
              </UserInputs>
              ) : (<div></div>)}
            </>

            <Buttons>
              {!password ?
                (<Button
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
                opacity: '0'
              }}
                onChange={editPhoto}
              />
              Выбрать фото
            </Button>

          </Imgs>
          <div className='container-form'>
            <p>Имя: {name}</p>
            <p>Email: {email}</p>
            <p>Дата рождения: {dob}</p>
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
  const { userReducer: { user: { name, email, pass, dob, avatarUrl } } } = state
  return { name, email, pass, dob, avatarUrl };
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

interface OwnProps { };

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps)(User);