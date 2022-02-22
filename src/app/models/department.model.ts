export interface Department {
  id: Number,
  name: string,
  successors: Number[],
  successorsActual: Department[]
}
