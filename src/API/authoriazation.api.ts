type IBodyReq = {
    readonly email: string,
    readonly password: string
}

type IUserData = {
    accessToken: string,
    refreshToken: string,
    userId: string,
    expiresAccessToken: number
}

type IRT = {
    refreshToken: string
}

const URL = String(process.env.REACT_APP_SERVER_URL);

export async function regUserAPI(dataObj: IBodyReq):Promise<boolean> {
    try {
        const result = await fetch(URL + '/api/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj),
            mode: 'cors'
        })

        if (result.ok) return true;
        return false;

    } catch(e) {
        console.log(e);
        return false;
    }
}

export async function authUserAPI(dataObj: IBodyReq):Promise<IUserData | undefined> {
        try {
            const result = await fetch(URL + '/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj),
                mode: 'cors'
            })
            if (result.ok) return result.json();
            return;
            
        } catch(e) {
            console.log(e);
            return;
        }
}

export async function refreshTokenAPI(dataObj: IRT):Promise<IUserData | undefined> {
    try {
        const result = await fetch(URL + '/api/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj),
            mode: 'cors'
        });

        if (result.ok) return result.json();
        return;

    } catch(e) {
        console.log(e);
        return;
    }
}

export async function logoutAPI(accessToken: string):Promise<undefined> {
    try {
        await fetch(URL + '/api/logout', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            mode: 'cors'
        });

        return;
        
    } catch(e) {
        console.log(e);
        return;
    }
}