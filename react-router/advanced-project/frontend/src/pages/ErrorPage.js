import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
    const error = useRouteError();
    
    let title = 'An error occured 😅'
    let message = "Sorry, the page you are looking for does not exist."
    
    if (error.status === 500) {
        message = JSON.parse(error.data).message;
    }

    if (error.status === 404) {
        title = 'Not Found.'
        message = "Error 404 - Could not find resource or page."
    }
    return (
        <>
        <MainNavigation />
        <PageContent title={title}>
            <h3>Error: {error.status}</h3>
            <p>{message}</p>
        </PageContent>
        </>
        
    );
}

export default ErrorPage;