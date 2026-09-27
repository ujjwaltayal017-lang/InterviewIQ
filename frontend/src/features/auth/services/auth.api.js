import axios from "axios"
const BASE_URL = "https://interviewiq-huyd.onrender.com"

export async function register({ username, email, password }) {

    try {

        const response = await axios.post(
            `${BASE_URL}/api/auth/register`,
            {
                username, email, password
            }, {
            withCredentials: true
        })

        return response.data;

    } catch (err) {
         console.log("Register Error:", err.response?.data);
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {
        console.log(err.response?.data);
        throw err; 
    }
}


export async function logout() {
    try {
        const response = await axios.post(
           `${BASE_URL}/api/auth/logout`,
            {},
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



export async function getMe() {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/auth/get-me`,
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {
        console.log("Get Me Error:", err.response?.data);
        throw err;
    }
}
