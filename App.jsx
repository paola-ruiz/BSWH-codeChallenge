/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AppNavigation } from './src/navigation/AppNavigation';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';
import { UserContextProvider } from './src/services/users/users.context';
import { PhotosContextProvider } from './src/services/photos/photos.context';

function App() {
  
  return (
    <Provider store={store}>
      <UserContextProvider>
        <PhotosContextProvider>
          <AppNavigation/>
        </PhotosContextProvider>
      </UserContextProvider>
    </Provider>
  );
}

export default App;
