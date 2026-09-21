import { SymptomLogEntry } from '../models/symptom';

export interface ISymptomRepository {
  getAllLogs(): Promise<SymptomLogEntry[]>;
  getLogsByDateRange(startDate: string, endDate: string): Promise<SymptomLogEntry[]>;
  saveLog(entry: SymptomLogEntry): Promise<void>;
  deleteLog(id: string): Promise<void>;
  clearAll(): Promise<void>;
}
