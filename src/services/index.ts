import FingerprintJS from '@fingerprintjs/fingerprintjs';
import CryptoJS from 'crypto-js';
import { IUserData } from '@types';
import { refreshTokenAPI, logoutAPI } from '@API';
const fpPromise = FingerprintJS.load();
const myStorage = window.localStorage;

export async function recordToLocalStorage(data: IUserData) {
    try {
        const fp = await fpPromise;
        const { visitorId } = await fp.get();

        // encript and record data
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), visitorId).toString();
        myStorage.removeItem('authData');
        myStorage.setItem('authData', ciphertext)

    } catch(e) {
        console.log(e);
    }
}

export async function checkLocalStorageData():Promise<IUserData | undefined> {
    try {
        const fp = await fpPromise;
        const { visitorId } = await fp.get();

        const ciphertext = myStorage.getItem('authData');

        if (ciphertext === null) throw new Error('User unauthorized!');
        
        const bytes = CryptoJS.AES.decrypt(ciphertext, visitorId);
        const decryptedData: IUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        if (decryptedData.expiresAccessToken < Date.now()) {

            const result = await updateTokens(decryptedData.refreshToken);

            if (typeof result === 'undefined') return;
            return result;
        }

        return decryptedData;
    } catch(err) {
        console.log(err);
        myStorage.clear();
        return;
    }
}

export async function updateTokens(preRefreshToken?: string) {
    try {
        let refreshToken = '';

        if (!preRefreshToken) {
            const fp = await fpPromise;
            const { visitorId } = await fp.get();

            const ciphertext = myStorage.getItem('authData');

            if (ciphertext === null) throw new Error('User unauthorized!');
            
            const bytes  = CryptoJS.AES.decrypt(ciphertext, visitorId);
            const obj: IUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            refreshToken = obj.refreshToken;
        } else {
            refreshToken = preRefreshToken;
        }

        const newData = await refreshTokenAPI({refreshToken});

        if (!newData) return

        recordToLocalStorage(newData);

        return newData;
    } catch(err) {
        console.log(err);
        return;
    }
}

export async function logoutUserService():Promise<string | undefined> {
    try {
        const fp = await fpPromise;
        const { visitorId } = await fp.get();

        const ciphertext = myStorage.getItem('authData');

        if (ciphertext === null) throw new Error('User unauthorized!');
        
        const bytes  = CryptoJS.AES.decrypt(ciphertext, visitorId);
        const { accessToken }: IUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        
        logoutAPI(accessToken);

        return;
    } catch(e) {
        console.log(e);
        return
    }
    
}
