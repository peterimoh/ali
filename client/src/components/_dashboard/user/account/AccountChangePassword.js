import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Stack, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { updatePassword } from '../../../../redux/slices/user';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import fakeRequest from '../../../../utils/fakeRequest';
import { MIconButton } from '../../../@material-extend';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await dispatch(updatePassword(values));
        enqueueSnackbar('Register successful! Proceed to Login', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.error });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Old Password"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={(touched.newPassword && errors.newPassword) || 'Password must be minimum 6+'}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
