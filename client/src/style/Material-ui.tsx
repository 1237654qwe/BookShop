/* eslint-disable import/prefer-default-export */
import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';

export const Input = styled(MuiInput)`
  width: 42px;
`;

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
