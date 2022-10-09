import { Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../config';
import { UserContext } from '../stores';
import { useForm } from 'react-hook-form';

export default function SignUp() {
    const [user, userDispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    if (user.id) {
        navigate('/');
    }

    const onSubmit = async ({email, password, name}) => {
        const response = await fetch(API_ENDPOINT + '/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });
        const responseJSON = await response.json();

        if (response.ok) {
            const { email, name, id } = responseJSON;
            userDispatch({ type: 'Update', payload: { email, name, id } });
        } else {
            alert(responseJSON);
        }
    };
    console.log(errors);
    return (
        <form className="sign-up" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Email"
                name="email"
                variant="standard"
                error={!!errors?.email}
                helperText={errors?.email?.message}
                {...register('email', {
                    required: {
                        value: true,
                        message: 'This field cannot be empty',
                    },
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                })}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                variant="standard"
                error={!!errors?.password}
                helperText={errors?.password?.message}
                {...register('password', {
                    required: {
                        value: true,
                        message: 'This field cannot be empty',
                    },
                    minLength: {
                        value: 6,
                        message: 'This field has a minimum length of 6',
                    },
                })}
            />
            <TextField
                label="Confirm password"
                type="password"
                variant="standard"
                error={!!errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                {...register('confirmPassword', {
                    validate: (value) => {
                        if (value !== watch('password')) return "Your passwords does not match";
                    }
                })}
            />
            <TextField
                label="Name"
                name="name"
                variant="standard"
                error={!!errors?.name}
                helperText={errors?.name?.message}
                {...register('name', {
                    required: {
                        value: true,
                        message: 'This field cannot be empty',
                    },
                    minLength: {
                        value: 6,
                        message: 'This field has a minimum length of 6',
                    },
                })}
            />
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </form>
    );
}
