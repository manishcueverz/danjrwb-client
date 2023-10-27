import { Provider } from 'react-redux';
import { store } from './store/store';
import MainRoute from './routes/MainRoute';
import { useIsMobile } from './hooks/useInMobile';

function App() {
  const isMobile = useIsMobile()
  return (
    <>
      <Provider store={store}>
        {isMobile ? <MainRoute /> : <p className=' text-center'>THIS SITE ONLY SHOW MOBILE SCREEB SIZE</p>}
      </Provider>
    </>
  );
}

export default App;



