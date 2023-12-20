import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const Form = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isDone, setIsDone] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsDone(true);
    window.confirm('Registration Successful');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="body">
      {!isDone && (
        <div className="form-body">
          <h1 className="create">Create Account</h1>
          <InputField
            type="text"
            placeholder="Name"
            name="Name"
            register={register}
            rules={{
              required: 'Please enter Name',
              minLength: { value: 3, message: 'Name should be at least 3 characters' },
              maxLength: { value: 30, message: 'Name should not be more than 30 characters' },
            }}
            errors={errors}
          />
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            rules={{
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: 'Please enter a valid email',
              },
            }}
            errors={errors}
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            rules={{
              required: 'Please enter Password',
              minLength: { value: 10, message: 'Password should be at least 10 characters long' },
              pattern: {
                value: /.*[!@#$%^&*()\-_=+{};:,<.>]/,
                message: 'Password should contain at least one special character',
              },
            }}
            errors={errors}
          />
          <InputField
            type="password"
            placeholder="Re-enter your password"
            name="Rpassword"
            register={register}
            rules={{
              required: 'Please re-enter your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            }}
            errors={errors}
          />
          <button type="submit" className="submit-but">
            Submit
          </button>
          <p>Have already an account? <Link to="/">Login here</Link></p>
        </div>
      )}
    </form>
  );
};

const InputField = ({ type, placeholder, name, register, rules, errors }) => (
  <>
    <input type={type} placeholder={placeholder} {...register(name, rules)} className="field i" />
    {errors[name] && <span className="error-message">{errors[name].message}</span>}
  </>
);

export default Form;
