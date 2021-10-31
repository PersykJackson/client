import { FC, FormEventHandler, MutableRefObject, useRef, useState } from 'react';
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { setToken, tokenSelector } from '../../store/reducers/auth';
import { post } from '../../request';
import { API, AUTH_LOGIN } from '../../constants/api';

const Login: FC = () => {
  const login: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const password: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [error, setError] = useState<null | string>(null);
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const answer = await post(API + AUTH_LOGIN, {
        username: login.current?.value,
        password: password.current?.value,
      });

      if (answer.status === 200) {
        setError(null);
        dispatch(setToken(answer.data as string));
      } else {
        setError(answer.data as string);
      }
    } catch (message) {
      setError('Incorrect login or password!');
    }
  };

  return (
    <>
      {token && <Redirect to="/" />}
      <Center display="flex" flexDirection="column" justifyContent="center" height="100%">
        <Box w="max-content" textAlign="center" padding="25px" bg="rgba(255,255,255,0.25)" borderRadius="5px">
          <form onSubmit={onSubmit}>
            <FormControl isRequired isInvalid={!!error} padding="5px">
              <Center>
                <FormLabel htmlFor="login">Login</FormLabel>
              </Center>
              <Input id="login" type="login" name="login" ref={login} />
            </FormControl>
            <FormControl isRequired isInvalid={!!error} padding="5px">
              <Center>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Center>
              <Input id="password" type="password" name="password" ref={password} />
              <Center>
                <FormErrorMessage>{error}</FormErrorMessage>
              </Center>
            </FormControl>
            <Button type="submit" marginTop="10px" _hover={{ backgroundColor: 'pink.100' }}>
              Login
            </Button>
          </form>
          <LinkBox marginTop="20px">
            <Link href={REGISTRATION}>Registration</Link>
          </LinkBox>
        </Box>
      </Center>
    </>
  );
};

export default Login;
