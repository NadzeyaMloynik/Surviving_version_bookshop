
import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password, repPassword) => {
    const { data } = await $host.post('api/user/registration', { email, password, repPassword });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    try {
        const { data } = await $authHost.get("api/user/auth");
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        console.error('Unauthorized', error.message);
        localStorage.removeItem('token');
        return null;
    }
}
