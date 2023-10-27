import { Provider } from 'react-redux';
import { store } from './store/store';
import MainRoute from './routes/MainRoute';
import { useIsMobile } from './hooks/useInMobile';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

function App() {
  const isMobile = useIsMobile()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isMobile ? <MainRoute /> : <p className=' text-center'>THIS SITE ONLY SHOW MOBILE SCREEB SIZE</p>}
      </PersistGate>
    </Provider>
  );
}

export default App;



