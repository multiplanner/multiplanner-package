import INetworkAdapter from "./INetworkAdapter";
import AxiosNetwerkAdapter from "./AxiosNetworkAdapter";

const networkAdapter: INetworkAdapter = new AxiosNetwerkAdapter();

export default networkAdapter;