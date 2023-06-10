import React, { useRef, useEffect } from 'react';
import useSWR from 'swr'
import axios from "axios";

const useHttpClient = (API_URL, httpMethod, body, headers) => {
  const activeHttpRequests = useRef([])

  const fetcher = async (url) => {
    const httpAbortCtrll = new AbortController()
    activeHttpRequests.current.push(httpAbortCtrll)

    const response = await axios[httpMethod](
      url,
      body,
      {
        headers: headers || { 'Content-Type': 'application/json' },
        signal: httpAbortCtrll.signal
      },
    );

    activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrll)
    return response.data
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, []);

  const { data, error, isLoading } = useSWR(API_URL, fetcher)

  return {
    data, error, isLoading
  }
}

export default useHttpClient