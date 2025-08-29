import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import classes from './RootLayout.module.css';

function RootLayout() {
    // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main className={classes.main}>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
