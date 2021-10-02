import { ITask } from '@types'

type IR = {
    accessToken: string,
    userId: string,
    taskId?: number,
    payload?: {
        title?: string,
        completed?: boolean
    }
}

const URL = String(process.env.REACT_APP_SERVER_URL);

export async function loadTodoAPI({accessToken, userId}: IR):Promise<Array<ITask> | undefined> {
    try {
        const result = await fetch(URL + `/todo/${userId}/tasks/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            mode: 'cors'
        });

        if (!result.ok) return;

        return await result.json();
        
    } catch(e) {
        console.log(e);
        return;
    }
}

export async function addTaskAPI({accessToken, userId, payload}: IR):Promise<ITask | undefined> {
    try {
        const result = await fetch(URL + `/todo/${userId}/tasks/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            mode: 'cors'
        });

        if (!result.ok) return;
        return await result.json();

    } catch(e) {
        console.log(e);
        return;
    }
}

export async function removeTaskAPI({accessToken, userId, taskId}: IR):Promise<boolean> {
    try {
        const result = await fetch(URL + `/todo/${userId}/tasks/${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            mode: 'cors'
        });

        return result.ok;
    } catch(e) {
        console.log(e);
        return false;
    }
}

export async function updateTaskAPI({accessToken, userId, taskId, payload}: IR):Promise<ITask | undefined> {
    try {
        const result = await fetch(URL + `/todo/${userId}/tasks/${taskId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            mode: 'cors'
        });

        if (!result.ok) return;
        return await result.json();
        
    } catch(e) {
        console.log(e);
        return;
    }
}