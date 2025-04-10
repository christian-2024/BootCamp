import type { ISpecialty } from './specialty'
import type { IStatus } from './status'

export interface IDoctor {
  id: number
  name: string
  status: IStatus
  specialty: ISpecialty[]
}

export type GetDoctorListRequest = {
  itemsPerPage: number
  page: number
  name: IDoctor['name']
  statusId: IStatus['id'] | null
  specialtyId: ISpecialty['id'] | null
}

export type GetDoctorListResponse = {
  total: number
  items: IDoctor[]
}

export type DoctorForm = {
  name: IDoctor['name']
  statusId: IStatus['id'] | null
  specialty: ISpecialty['id'][]
}
