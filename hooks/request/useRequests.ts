import useSWR from "swr";
import { getData } from '@/utils/fetchData'
import { AxiosResponse } from "axios";

export default function useRequests() {
  const url = 'request-role'
  const { data, mutate, error } = useSWR(url, getData);
  const loading = !data && !error;
  const res: AxiosResponse = error?.response
  const status = res && res.data ? res.status : ''
  const noRequests = !data && status == 404

  return {
    loading,
    requests: data?.requests,
    noRequests,
    count: data?.count,
    mutate,
    error
  };
}
