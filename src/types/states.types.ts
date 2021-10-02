// STATES TYPES
// =========================
export type UserState = {
    readonly auth: boolean,
    readonly id: string,
    readonly expiredAccessToken: number
}
// =========================
export type FormState = {
    readonly loading: boolean,
    readonly displayForm: boolean,
    readonly typeForm: boolean,
    readonly error: {
        email: string,
        password: string,
        passwordConfirm: string,
        alertMessage: string
    }
}
// =========================
export type ITask = {
    readonly id: number,
    readonly title: string,
    readonly completed: boolean
}

export type TodoState = Array<ITask>;
// =========================