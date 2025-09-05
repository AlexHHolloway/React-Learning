import { redirect } from "react-router-dom";

export function action() {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect('/');
}