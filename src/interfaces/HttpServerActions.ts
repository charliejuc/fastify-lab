export interface GetAction {
    get(...args: unknown[]): unknown
}

export interface PostAction {
    post(...args: unknown[]): unknown
}

export interface DeleteAction {
    delete(...args: unknown[]): unknown
}

export interface PutAction {
    delete(...args: unknown[]): unknown
}

export interface ListenAction {
    listen(...args: unknown[]): Promise<unknown>
}

export interface DecorateAction {
    decorate(...args: unknown[]): unknown
}

export interface RegisterAction {
    register(...args: unknown[]): unknown
}

export interface AfterAction {
    after(...args: unknown[]): unknown | PromiseLike<unknown>
}

export interface HttpServerActions
    extends GetAction,
        PostAction,
        DeleteAction,
        PutAction,
        ListenAction {}
