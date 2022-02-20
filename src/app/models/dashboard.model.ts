export interface ContainerStatistics {
  containerCount: Number
  containerCountLast24Hours: Number
}

export interface ParcelStatistics {
  parcelCountbyDepartment: {[key: string]: number}
}
