export const loginService = async(username,password) => {
    try{
        const request = await fetch ('http://10.147.19.29:8080/api/auth/login', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const responseBody = await request.json();
        return { ...responseBody, success: true }
    } catch (error) {
        return {error, success: false}
    }
}

export const logoutService = async() => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://10.147.19.29:8080/logout", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.ok;
}