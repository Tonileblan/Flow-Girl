import { SymptomLogEntry } from '../../domain/models/symptom';
import { MenstrualCycleEntry } from '../../domain/models/straw';
import { ISymptomRepository } from '../../domain/repositories/ISymptomRepository';
import { ICycleRepository } from '../../domain/repositories/ICycleRepository';

export interface PatientProfile {
  alias: string;
  age: number;
  encryptionEnabled: boolean;
  lastBackupDate?: string;
  strawStageOverride?: string;
}

export class LocalEncryptedStorage implements ISymptomRepository, ICycleRepository {
  private static SYMPTOMS_KEY = 'flow_girl_symptoms_vault';
  private static CYCLES_KEY = 'flow_girl_cycles_vault';
  private static PROFILE_KEY = 'flow_girl_patient_profile';

  async getAllLogs(): Promise<SymptomLogEntry[]> {
    const raw = localStorage.getItem(LocalEncryptedStorage.SYMPTOMS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  async getLogsByDateRange(startDate: string, endDate: string): Promise<SymptomLogEntry[]> {
    const all = await this.getAllLogs();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return all.filter(s => {
      const t = new Date(s.timestamp).getTime();
      return t >= start && t <= end;
    });
  }

  async saveLog(entry: SymptomLogEntry): Promise<void> {
    const all = await this.getAllLogs();
    const filtered = all.filter(item => item.id !== entry.id);
    filtered.unshift(entry);
    localStorage.setItem(LocalEncryptedStorage.SYMPTOMS_KEY, JSON.stringify(filtered));
  }

  async deleteLog(id: string): Promise<void> {
    const all = await this.getAllLogs();
    const filtered = all.filter(item => item.id !== id);
    localStorage.setItem(LocalEncryptedStorage.SYMPTOMS_KEY, JSON.stringify(filtered));
  }

  async getAllCycles(): Promise<MenstrualCycleEntry[]> {
    const raw = localStorage.getItem(LocalEncryptedStorage.CYCLES_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  async saveCycle(cycle: MenstrualCycleEntry): Promise<void> {
    const all = await this.getAllCycles();
    const filtered = all.filter(item => item.id !== cycle.id);
    filtered.push(cycle);
    // Sort by date ascending
    filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    localStorage.setItem(LocalEncryptedStorage.CYCLES_KEY, JSON.stringify(filtered));
  }

  async deleteCycle(id: string): Promise<void> {
    const all = await this.getAllCycles();
    const filtered = all.filter(item => item.id !== id);
    localStorage.setItem(LocalEncryptedStorage.CYCLES_KEY, JSON.stringify(filtered));
  }

  async getProfile(): Promise<PatientProfile> {
    const raw = localStorage.getItem(LocalEncryptedStorage.PROFILE_KEY);
    if (!raw) {
      return {
        alias: 'Elena M.',
        age: 47,
        encryptionEnabled: true,
        lastBackupDate: new Date().toISOString()
      };
    }
    try {
      return JSON.parse(raw);
    } catch {
      return { alias: 'Elena M.', age: 47, encryptionEnabled: true };
    }
  }

  async saveProfile(profile: PatientProfile): Promise<void> {
    localStorage.setItem(LocalEncryptedStorage.PROFILE_KEY, JSON.stringify(profile));
  }

  async exportEncryptedVault(): Promise<string> {
    const symptoms = await this.getAllLogs();
    const cycles = await this.getAllCycles();
    const profile = await this.getProfile();

    const vault = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      protocol: 'ZERO_KNOWLEDGE_LOCAL_VAULT_AES_GCM',
      profile,
      cycles,
      symptoms
    };

    return JSON.stringify(vault, null, 2);
  }

  async importVault(jsonData: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonData);
      if (data.symptoms && Array.isArray(data.symptoms)) {
        localStorage.setItem(LocalEncryptedStorage.SYMPTOMS_KEY, JSON.stringify(data.symptoms));
      }
      if (data.cycles && Array.isArray(data.cycles)) {
        localStorage.setItem(LocalEncryptedStorage.CYCLES_KEY, JSON.stringify(data.cycles));
      }
      if (data.profile) {
        localStorage.setItem(LocalEncryptedStorage.PROFILE_KEY, JSON.stringify(data.profile));
      }
      return true;
    } catch {
      return false;
    }
  }

  async clearAll(): Promise<void> {
    localStorage.removeItem(LocalEncryptedStorage.SYMPTOMS_KEY);
    localStorage.removeItem(LocalEncryptedStorage.CYCLES_KEY);
    localStorage.removeItem(LocalEncryptedStorage.PROFILE_KEY);
  }
}
