'use client'

import useSWR from 'swr'
export const apiUrl = process.env.NEXT_PUBLIC_SITE_URL

interface FetcherResponse {
    json: () => Promise<any>;
  }
  
const fetcher = (url: string, options?: RequestInit): Promise<any> => fetch(url, options).then((res: FetcherResponse) => res.json());

export function GetAllEmployees(companyName: string) {
    const { data, error, isLoading } = useSWR(`/api/employees/company/${companyName}`, fetcher)

    return {
        employees: data || [],
        isLoading,
        error
    }
}

export function GetEmployee(id: string) {
    const { data, error, isLoading } = useSWR(`/api/employees/${id}`, fetcher)

    return {
        employee: data,
        isLoading,
        error
    }
}
