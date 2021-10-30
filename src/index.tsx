import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store/index';

render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
