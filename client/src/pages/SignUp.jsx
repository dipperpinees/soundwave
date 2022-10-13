import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../config';
import { UserContext } from '../stores';
import { useForm } from 'react-hook-form';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';

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

    const onSubmit = async ({ email, password, name }) => {
        try {
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
                throw new Error(responseJSON);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sign-up">
            <FormControl isInvalid={errors.email}>
                <FormLabel>Email </FormLabel>
                <Input
                    type="text"
                    name="email"
                    id="email"
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
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    name="password"
                    id="password"
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
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password </FormLabel>
                <Input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    {...register('confirmPassword', {
                        validate: (value) => {
                            if (value !== watch('password')) return 'Your passwords does not match';
                        },
                    })}
                />
                <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    name="name"
                    id="name"
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
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" width={'100%'} colorScheme="teal" marginTop={4}>
                Submit
            </Button>
        </form>
    );
}
