import {Rule} from "./rule.model";

export interface Department {
  id: Number,
  name: string,
  priority: Number,
  successors: Number[],
  rules: Rule[],
  successorsActual: Department[]
}
