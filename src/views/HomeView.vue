<script setup lang="ts">
import BaseApi from '@/api-requests/api'
import type { IPage, JobListing, PositionFunction } from '@/models/models'
import { inject, onMounted, ref } from 'vue'
import type { AxiosStatic } from 'axios'
import JobFeed from '../components/JobFeed.vue'

const mojobApi = ref<BaseApi | null>(null)
const positionFunctionFilters = ref<PositionFunction[]>([])
const jobListings = ref<JobListing[]>([])
const axiosInstance = inject('axios') as AxiosStatic

async function getListings(pageSize = 5, positionIDs = []) {
  let response: JobListing[]
  if (pageSize) {
    response = await mojobApi.value?.getJobListings(pageSize, positionIDs) || []
  } else {
    response = await mojobApi.value?.getJobListings(pageSize, positionIDs, false) || []
  }
  jobListings.value = response
}

onMounted(async () => {
  mojobApi.value = new BaseApi('https://test-api.mojob.io/public/', axiosInstance)
  try {
    await getListings()

    const jobLocationFiltersResponsePage: IPage<PositionFunction> =
      await mojobApi.value.getPositionFunctions()
    if (jobLocationFiltersResponsePage.results) {
      positionFunctionFilters.value = jobLocationFiltersResponsePage.results
      console.log(JSON.stringify(positionFunctionFilters.value, null, 2))
      console.log(positionFunctionFilters.value)
    } else {
      console.log('Failed loading position function filters')
    }
  } catch (e) {
    console.log('Failed loading position function filters')
    console.log(e)
  }
})
</script>

<template>
  <div class="home">
    <job-feed
      :job-listings="jobListings"
      :position-functions="positionFunctionFilters"
      @getListings="getListings"
    />
  </div>
</template>
