import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextInput, View } from 'react-native';
import * as yup from 'yup';
import useYupValidationResolver from '../../hook/useYupValidationResolver';

const Login = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().required('Vui lòng nhập email').email('Đia chỉ email không chính xác'),
        password: yup.string().required('Vui lòng nhập mật khẩu'),
      }),
    [],
  );

  const resolver = useYupValidationResolver(validationSchema);

  const { handleSubmit, control, errors } = useForm({ resolver });

  // onSubmit method
  const onSubmit = (data) => {
    console.log(data, 'data');
    console.log(errors);
  };
  console.log(errors);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ onChange, value }) => (
          <TextInput
            onChangeText={(text) => onChange(text)}
            value={value}
            placeholder="Nhập email"
          />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)} label="Submit" title="Submit" />
    </View>
  );
};

export default Login;
