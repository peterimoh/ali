import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { useParams } from 'react-router';
import { TextField, Alert, Stack } from '@mui/material';
import closeFill from '@iconify/icons-eva/close-fill';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../../@material-extend';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

// ChangePasswordForm.propTypes = {
//   onSent: PropTypes.func,f
//   onGetEmail: PropTypes.func
// };

export default function ChangePasswordForm({ onSent, onGetEmail }) {
  const { resetPassword } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { token } = useParams();

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const passwordObj = {
        password: values.password,
        confirmPassword: values.confirmPassword,
        token
      };
      try {
        await resetPassword(passwordObj);
        enqueueSnackbar('Password Changed successfully! Proceed to Login', {
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
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.error });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('password')}
            type="text"
            label="Enter New Password"
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            {...getFieldProps('confirmPassword')}
            type="text"
            label="Confirm New Password"
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Update Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
