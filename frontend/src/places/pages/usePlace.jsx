import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const usePlace = placeId => {
    const activeHttpRequests = useRef([])

    const fetcher = async (url) => {
        const httpAbortCtrll = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrll)

        const response = await axios.get(
            url,
            {
                headers: { 'Content-Type': 'application/json' },
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

    const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, fetcher)

    return {
        dataPlace: data,
        errorPlace: error,
        isLoadingPlace: isLoading,
    }
}

export default usePlace