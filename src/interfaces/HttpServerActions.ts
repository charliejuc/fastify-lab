export interface GetAction {
    get(...args: any): any
}

export interface PostAction {
    post(...args: any): any
}

export interface DeleteAction {
    delete(...args: any): any
}

export interface PutAction {
    delete(...args: any): any
}

export interface ListenAction {
    listen(...args: any): Promise<any>
}

export interface HttpServerActions
    extends GetAction,
        PostAction,
        DeleteAction,
        PutAction,
        ListenAction {}
