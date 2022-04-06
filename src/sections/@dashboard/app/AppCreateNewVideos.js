// material
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, Card, CardHeader, Container, Snackbar, Alert } from '@mui/material';
import { LoadingButton, LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useState } from '@hookstate/core';
import { postData } from '../../../global/apiTemplate';

// ----------------------------------------------------------------------

export default function AppCreateNewVideos() {
  return (
    <Card>
      <CardHeader title="Create New Video" />
      <Container maxWidth="sm" sx={{ my: 5 }}>
        <CreateVideoForm />
      </Container>
    </Card>
  );
}

export function CreateVideoForm() {
  const openSnackBar = useState(false);
  const isSuccess = useState(false);

  const VideoSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    url: Yup.string().url('Must be a valid URL').required('Url is required'),
    ctaLink: Yup.string().required('CTA Link is required'),
    rewardsPerView: Yup.number().required('required'),
    totalRewardsBudget: Yup.number().required('required'),
    rewardsEndDate: Yup.number().required('required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      thumbnail: '',
      url: '',
      ctaLink: '',
      rewardsPerView: 0,
      totalRewardsBudget: 0,
      rewardsEndDate: Math.round(new Date().getTime())
    },
    validationSchema: VideoSchema,
    onSubmit: () => {
      setSubmitting(true);
      postData('http://localhost:1337/api/v1/videos', {
        name: values.name,
        description: values.description,
        thumbnail: values.thumbnail,
        url: values.url,
        ctaLink: values.ctaLink,
        rewardsPerView: values.rewardsPerView,
        totalRewardsBudget: values.totalRewardsBudget,
        rewardsEndDate: values.rewardsEndDate
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

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setSubmitting,
    setFieldValue
  } = formik;

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
            type="name"
            label="Video Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            type="text"
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <TextField
            type="url"
            label="Video Url"
            {...getFieldProps('url')}
            error={Boolean(touched.url && errors.url)}
            helperText={touched.url && errors.url}
          />

          <TextField
            type="url"
            label="CTA Link"
            {...getFieldProps('ctaLink')}
            error={Boolean(touched.ctaLink && errors.ctaLink)}
            helperText={touched.ctaLink && errors.ctaLink}
          />

          <TextField
            type="number"
            label="Rewards Per View"
            {...getFieldProps('rewardsPerView')}
            error={Boolean(touched.rewardsPerView && errors.rewardsPerView)}
            helperText={touched.rewardsPerView && errors.rewardsPerView}
          />

          <TextField
            type="number"
            label="Total Rewards Budget"
            {...getFieldProps('totalRewardsBudget')}
            error={Boolean(touched.totalRewardsBudget && errors.totalRewardsBudget)}
            helperText={touched.totalRewardsBudget && errors.totalRewardsBudget}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Rewards End Date"
              value={values.rewardsEndDate}
              onChange={(newDateValue) => {
                console.log(Math.round(newDateValue.getTime()));
                setFieldValue('rewardsEndDate', Math.round(newDateValue.getTime()));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create Video
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
            ? 'Successfully created video!'
            : 'Something went wrong! Try again later.'}
        </Alert>
      </Snackbar>
    </FormikProvider>
  );
}
