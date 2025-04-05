export interface IStatus {
  id: number
  name: string
}

export type GetStatusListRequest = {
  itemsPerPage: number
  page: number
}

export type GetStatusListResponse = {
  total: number
  items: IStatus[]
}
export type CreateStatusRequest = {
  name: string
  scheduleDuration: string
}

export type StatusForm = {
  name: IStatus['name']
}
