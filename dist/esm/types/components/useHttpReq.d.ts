declare const useHttpReq: (fetcher: () => Promise<any>) => [{
    loading: boolean;
    called: boolean;
    error?: any;
    data?: any;
}, () => Promise<any>];
export default useHttpReq;
