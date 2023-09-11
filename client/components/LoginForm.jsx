import { useStoreActions } from 'easy-peasy';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import firebaseService from '../services/firebase';
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginForm() {
  const setAuthorized = useStoreActions((actions) => actions.setAuthorized);

  const handleLogin = async (values) => {
    // Handle the login logic here
    try {
      const user = await signInWithEmailAndPassword(
        firebaseService.auth,
        values.email,
        values.password
      );

      if (user) {
        setAuthorized();
        console.log('authorized');
      }
    } catch (error) {
      console.error(error);
    }
    console.log(values);
  };

  return (
    <View className='flex justify-center text-center '>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label='Email'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && !!errors.email}
            />
            <HelperText type='error' visible={touched.email && !!errors.email}>
              {errors.email}
            </HelperText>
            <TextInput
              label='Password'
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              error={touched.password && !!errors.password}
            />
            <HelperText
              type='error'
              visible={touched.password && !!errors.password}
            >
              {errors.password}
            </HelperText>
            <Button mode='contained' onPress={handleSubmit}>
              Login
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}