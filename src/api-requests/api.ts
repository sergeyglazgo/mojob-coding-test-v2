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

  public getJobListings = (pageSize: number, positionIDs?: number[]): Promise<IPage<JobListing>> => {
    const url = `${this.baseUrl}job/listings/?page_size=${pageSize}&use_pagination=True`
    return this.axios
      .get(positionIDs?.length ? `${url}&position_functions=${positionIDs.join(',')}` : url)
      .then((response) => response.data)
  }
}
