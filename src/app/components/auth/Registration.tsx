import { FC, FormEventHandler, MutableRefObject, useRef, useState } from 'react';
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react';
import { Redirect, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { post } from '../../request';
import { API, AUTH_REGISTRATION } from '../../constants/api';
import { tokenSelector } from '../../store/reducers/auth';
import { LOGIN } from '../../constants/routes';

const Registration: FC = () => {
  const login: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const password: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const passwordConfirm: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const token = useSelector(tokenSelector);
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password.current?.value !== passwordConfirm.current?.value) {
      setError('Passwords is not equal!');
    } else if (password.current?.value && password.current.value.length < 10) {
      setError('Password need to be longer or equal than 10 symbols!');
    } else if (login.current?.value && login.current?.value.length < 5) {
      setError('Login need to be longer or equal than 5 symbols!');
    } else {
      try {
        const answer = await post(API + AUTH_REGISTRATION, {
          username: login.current?.value,
          password: password.current?.value,
        });

        if (answer.status === 200) {
          setError(null);
          history.push('/login');
        } else {
          setError(answer.data as string);
        }
      } catch (message) {
        setError('Something went wrong!');
      }
    }
  };

  return (
    <>
      {token && <Redirect to="/" />}
      <Center display="flex" flexDirection="column" justifyContent="center" height="100%">
        <Box w="max-content" textAlign="center" padding="25px" bg="rgba(255,255,255,0.25)" borderRadius="5px">
          <form onSubmit={onSubmit}>
            <FormControl isRequired isInvalid={!!error}>
              <Center>
                <FormLabel htmlFor="login">Login</FormLabel>
              </Center>
              <Input id="login" type="login" name="login" ref={login} />
            </FormControl>
            <FormControl isRequired isInvalid={!!error}>
              <Center>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Center>
              <Input id="password" type="password" name="password" ref={password} />
              <Center>
                <FormLabel htmlFor="passwordConfirm">Confirm password</FormLabel>
              </Center>
              <Input id="passwordConfirm" type="password" name="passwordConfirm" ref={passwordConfirm} />
              <Center>
                <FormErrorMessage>{error}</FormErrorMessage>
              </Center>
            </FormControl>
            <Button type="submit" marginTop="10px" _hover={{ backgroundColor: 'pink.100' }}>
              Register
            </Button>
          </form>
          <Link href={LOGIN} marginTop="20px">
            Login
          </Link>
        </Box>
      </Center>
    </>
  );
};

export default Registration;
