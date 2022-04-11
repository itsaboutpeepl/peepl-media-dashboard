// material
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, Card, CardHeader, Container, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useState } from '@hookstate/core';
import { postData } from '../../../global/apiTemplate';
import generalVideoSettingsState from '../../../hooks/settingsState';

// ----------------------------------------------------------------------

export default function AppGeneralVideoSettings() {
  return (
    <Card>
      <CardHeader title="General Video Settings" />
      <Container maxWidth="sm" sx={{ my: 5 }}>
        <GeneralVideoSettingsForm />
      </Container>
    </Card>
  );
}

export function GeneralVideoSettingsForm() {
  const openSnackBar = useState(false);
  const isSuccess = useState(false);
  const settingsState = useState(generalVideoSettingsState);

  const SettingsSchema = Yup.object().shape({
    monthlyTokenCap: Yup.number().required('required'),
    weeklyUserTokenCap: Yup.number().required('required')
  });

  const formik = useFormik({
    initialValues: {
      monthlyTokenCap: settingsState.get().monthlyTokenCap,
      weeklyUserTokenCap: settingsState.get().monthlyTokenCap
    },
    validationSchema: SettingsSchema,
    onSubmit: () => {
      setSubmitting(true);
      postData('https://media.itsaboutpeepl.com/api/v1/partners/settings', {
        monthlyTokenCap: values.monthlyTokenCap,
        weeklyUserTokenCap: values.weeklyUserTokenCap
      })
        .then((data) => {
          setOpenSB(true);
          setSuccess(true);
          console.log(data);
        })
        .catch((error) => {
          setOpenSB(true);
          setSuccess(false);
          console.log(error);
        });
      setSubmitting(false);

      // update global state
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } =
    formik;

  const setOpenSB = (value) => {
    openSnackBar.set(value);
  };

  const setSuccess = (value) => {
    isSuccess.set(value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSB(false);
    setSuccess(false);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <TextField
            type="number"
            label="Monthly Token Cap"
            {...getFieldProps('monthlyTokenCap')}
            error={Boolean(touched.monthlyTokenCap && errors.monthlyTokenCap)}
            helperText={touched.monthlyTokenCap && errors.monthlyTokenCap}
          />

          <TextField
            type="number"
            label="Weekly User Token Cap"
            {...getFieldProps('weeklyUserTokenCap')}
            error={Boolean(touched.weeklyUserTokenCap && errors.weeklyUserTokenCap)}
            helperText={touched.weeklyUserTokenCap && errors.weeklyUserTokenCap}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Update Settings
        </LoadingButton>
      </Form>
      <Snackbar
        open={openSnackBar.get()}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess.get() ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {isSuccess.get()
            ? 'Successfully updated settings!'
            : 'Something went wrong! Try again later.'}
        </Alert>
      </Snackbar>
    </FormikProvider>
  );
}
