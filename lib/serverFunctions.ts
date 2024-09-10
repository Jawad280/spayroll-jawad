'use client'

import { User } from '@/types';
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

export function GetCompanies(adminId: string) {
    const { data, error, isLoading } = useSWR(`/api/users/${adminId}`, fetcher)

    const adminUser: User = data

    return {
        companies: adminUser?.companies || [],
        isLoading,
        error
    }
}

export function GetAllPayslips(monthYear: string) {
    const { data, error, isLoading } = useSWR(`/api/payslips/monthYear/${monthYear}`, fetcher)

    return {
        payslips: data || [],
        isLoading,
        error
    }    
}

export function GetAllPayslipsCompany(monthYear: string, companyName: string) {
    const { data, error, isLoading } = useSWR(`/api/payslips/monthYear/${monthYear}/companyName/${companyName}`, fetcher)

    return {
        payslips: data || [],
        isLoading,
        error
    }    
}

export function GetIndividualPayslip(id: string) {
    const { data, error, isLoading } = useSWR(`/api/payslips/${id}`, fetcher)

    return {
        payslip: data,
        isLoading,
        error
    } 
}
