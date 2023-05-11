import type { AxiosStatic } from 'axios'
import type { IPage, JobListing, PositionFunction } from '@/models/models'

export default class BaseApi {
  public axios!: AxiosStatic
  protected baseUrl: string

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url
    this.axios = axios
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data)

  public getJobListings = (
    pageSize: number,
    positionIDs?: number[],
    usePagination = true
  ): Promise<JobListing[]> => {
    const pagination = usePagination ? 'True' : 'False'
    let url = `${this.baseUrl}job/listings/?use_pagination=${pagination}`

    if (usePagination) {
      url += `&page_size=${pageSize}`
    }
    if (positionIDs?.length) {
      url += `&position_functions=${positionIDs.join(',')}`
    }
    return this.axios
      .get(url).then((response) => usePagination ? response.data.results : response.data)
  }
}
