import type { IStatus } from './status'

export interface IPatient {
  id: number
  name: string
  phoneNumber: string
  documentNumber: string
  statusId: number
  status: IStatus
  birthDate: string
}

export type GetPatientListRequest = {
  itemsPerPage: number
  page: number
  name: IPatient['name']
  documentNumber: IPatient['documentNumber']
  statusId: IStatus['id'] | null
}

export type GetPatientListResponse = {
  total: number
  items: IPatient[]
}

export type PatientForm = {
  name: IPatient['name']
  documentNumber: IPatient['documentNumber']
  phoneNumber: IPatient['phoneNumber']
  birthDate: IPatient['birthDate']
  statusId: IStatus['id'] | null
}
