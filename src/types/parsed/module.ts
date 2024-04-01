import type { ModuleData } from './moduleData';

export interface Module {
	name: string;
	data: ModuleData;
	verified: boolean;
}
