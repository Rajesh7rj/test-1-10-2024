import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  FormControl,
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addParticipant, participantsListData } from '../store/participantsSlice';
import Header from '../components/Header';



interface RegistrationFormData {
  kidsAges?: (number | null | undefined)[] | null | undefined;
  message?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attending: 'Yes' | 'Maybe' | 'No'; 
  adults: number;
  kids: number;
  profileImage: FileList | string | any;
}

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  attending: Yup
  .string()
  .oneOf(['Yes', 'Maybe', 'No']) 
  .required('Attending status is required'),
  adults: Yup.number().min(0).max(5).required('Select number of adults'),
  kids: Yup.number().min(0).max(5).required('Select number of kids'),
  kidsAges:  Yup.array()
  .of(Yup.number().nullable()).nullable(),
  profileImage: Yup.mixed()
    .required('Profile image is required'),
  message: Yup.string().optional(),
});

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const participantsList = useSelector(participantsListData);
 
  const { control, handleSubmit, watch } = useForm<RegistrationFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstName: '',          
      lastName: '',           
      email: '',              
      phone: '',              
      attending: 'Yes',       
      adults: 1,              
      kids: 0,                
      kidsAges: Array(5).fill(null),
      message: '',            
      profileImage: null   
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
    dispatch(addParticipant(data)); 
  };

  const kidsCount = watch('kids');

  return (
    <><Header />
    <Container>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: 'auto', mt: "100px" }}>
      <h2>Registration Form</h2>

      <Controller
        name="profileImage"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input type="file" accept="image/*" {...field} />
            {fieldState.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
          </div>
        )} />

      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="First Name"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            margin="normal" />
        )} />

      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Last Name"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            margin="normal" />
        )} />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            margin="normal" />
        )} />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Phone Number"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            margin="normal" />
        )} />

        

      <div>Will you be attending the event?</div>
      <Controller
        name="attending"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error} component="fieldset" margin="normal">
            <RadioGroup {...field} row>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
            {fieldState.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
          </FormControl>
        )} />


<div>Besides you, how many others are accompanying you?</div>
      <Controller
        name="adults"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal" error={!!fieldState.error}>
            <InputLabel>Adults</InputLabel>
            <Select {...field}>
              {[...Array(6).keys()].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
          </FormControl>
        )} />

      <Controller
        name="kids"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal" error={!!fieldState.error}>
            <InputLabel>Kids</InputLabel>
            <Select {...field}>
              {[...Array(6).keys()].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
          </FormControl>
        )} />

      {[...Array(kidsCount)].map((_, index) => (
        <Controller
          key={index}
          name={`kidsAges.${index}`}
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth margin="normal" error={!!fieldState.error}>
              <InputLabel>Age of Kid {index + 1}</InputLabel>
              <Select {...field}>
                {[...Array(18).keys()].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {fieldState.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
            </FormControl>
          )} />
      ))}

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            placeholder="Send a message to the host (optional)"
            style={{ width: '100%', marginTop: 16, minHeight: 100 }} />
        )} />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
    </Container>
    </>
  );
};

export default RegistrationForm;
