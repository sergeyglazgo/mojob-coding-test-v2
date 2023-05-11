<script setup lang="ts">
import type { JobListing, PositionFunction } from '@/models/models'
import { computed, ref } from "vue";

export interface Props {
  jobListings: JobListing[],
  positionFunctions: PositionFunction[]
}
const props = withDefaults(defineProps<Props>(), {
  jobListings: () => [],
  positionFunctions: () => []
})
const emit = defineEmits(['getListings'])

const pageSizeOptions = [
  { value: 5, label: '5 per page' },
  { value: 25, label: '25 per page'},
  { value: 0, label: 'Display all'}
]
const pageSize = ref(pageSizeOptions[0].value)

const jobPositions = computed(() => {
  return props.positionFunctions.map(pos => {
    const children = pos.children?.map(child => ({
      value: child.id,
      label: child.name_en
    }))

    return {
      value: pos.id,
      label: pos.name_en,
      children
    }
  })
})

const positionFunctionsIDs = ref([])

const getListings = (isVisible?: boolean) => {
  if (!isVisible) {
    emit('getListings', +pageSize.value, positionFunctionsIDs.value)
  }
}
</script>

<template>
  <div class="container">
    <div class="job-feed">
      <div class="filters">
        <el-tree-select
          v-model="positionFunctionsIDs"
          :data="jobPositions"
          placeholder="Filter by position"
          multiple
          :render-after-expand="false"
          :check-on-click-node="true"
          show-checkbox
          collapse-tags
          clearable
          @clear="getListings"
          @visible-change="getListings"
        />

        <el-select v-model="pageSize" @change="$emit('getListings', +pageSize, positionFunctionsIDs)">
          <el-option
            v-for="item in pageSizeOptions"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          />
        </el-select>
      </div>

      <el-card
        v-for="jobListing in jobListings"
        :key="jobListing.id"
        class="box-card"
      >
        <div class="job-listing">
          <img class="company-logo" :src="jobListing.job.unit.logo_url" alt="company logo">
          <div class="job-info">
            <div class="job-title">
              {{ jobListing.job.title }}
            </div>
            <span class="dot">{{ jobListing.job.unit.display_name }}</span>
            <span class="dot">{{ jobListing.job.position_function.name_en }}</span>
            <span>{{ new Date(jobListing.job.due_date).toDateString() }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - 90px);
  background-color: #FEFEFE;
}
.box-card {
  margin-bottom: 16px;
  cursor: pointer;
}
.job-feed {
  margin: auto;
  max-width: 80%;
}
.job-listing {
  display: flex;
  align-items: center;
}
.job-title {
  margin-bottom: 4px;
  font-family: 'Avenir', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.25px;
  color: #2E2E2E;
}
.job-info {
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
  color: #757575;
  text-align: left;
}
.company-logo {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  object-fit: contain;
  padding-right: 10px;
}
.filters {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.dot:after {
  content: '';
  display: inline-block;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background-color: #757575;
  margin-inline: 6px;
  margin-bottom: 2px;
}
</style>
