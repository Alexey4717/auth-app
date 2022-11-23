import { FieldRenderProps } from 'react-final-form';
import TextField from '@mui/material/TextField';

const InputText = (props: FieldRenderProps<any, any>) => {
  const { meta, input, ...other } = props;
  const { error, touched, submitError, dirtySinceLastSubmit } = meta;

  const isError = Boolean(
    error ? touched && error : touched && submitError && !dirtySinceLastSubmit
  );

  const errorMessage = error || submitError;

  return (
    <TextField
      error={isError}
      helperText={isError && errorMessage}
      autoComplete="off"
      {...input}
      {...other}
    />
  );
};

export default InputText;
