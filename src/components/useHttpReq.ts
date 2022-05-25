import { useState } from "react";

const useHttpReq = (fetcher: () => Promise<any>) => {
  const [res, setRes] = useState<{ loading: boolean; called: boolean; error?: any; data?: any }>({
    loading: false,
    called: false,
  });
  const request = () => {
    setRes({ loading: true, called: true });

    return fetcher()
      .then((response) => {
        setRes({ loading: false, called: true });
        return response;
      })
      .catch((err) => {
        console.error(err);
        setRes({ loading: false, called: true, error: err });
      });
  };

  return [res, request] as [typeof res, typeof request];
};
export default useHttpReq;
