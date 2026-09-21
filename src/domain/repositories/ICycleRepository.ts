import { MenstrualCycleEntry } from '../models/straw';

export interface ICycleRepository {
  getAllCycles(): Promise<MenstrualCycleEntry[]>;
  saveCycle(cycle: MenstrualCycleEntry): Promise<void>;
  deleteCycle(id: string): Promise<void>;
  clearAll(): Promise<void>;
}
