interface INetworkAdapter {
    post   (path: String, body?: any | undefined): Promise<any>
    get    (path: String, body?: any | undefined): Promise<any>
    put    (path: String, body?: any | undefined): Promise<any>
    delete (path: String, body?: any | undefined): Promise<any>
}

export default INetworkAdapter;
