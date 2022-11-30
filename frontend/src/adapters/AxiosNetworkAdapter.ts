import axios from "axios";
import INetworkAdapter from "./INetworkAdapter";

class AxiosNetworkAdapter implements INetworkAdapter {
    private url: string = "http://localhost:8080";
    private stripSlash = (path: string) => path.charAt(0) == "/" ? path.slice(1) : path;
    private buildUrl = (path: string): string => `${this.url}/${this.stripSlash(path)}`;

    public post   = (path: string, body?: any | undefined): Promise<any> => axios.post   (this.buildUrl(path), body);
    public get    = (path: string, body?: any | undefined): Promise<any> => axios.get    (this.buildUrl(path), body);
    public put    = (path: string, body?: any | undefined): Promise<any> => axios.put    (this.buildUrl(path), body);
    public delete = (path: string, body?: any | undefined): Promise<any> => axios.delete (this.buildUrl(path), body);
}

export default AxiosNetworkAdapter;