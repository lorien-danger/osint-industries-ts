import type { SpecFormat } from "./specFormat"

export interface Module {
    module: string;
    spec_format: SpecFormat;
    query: string;
    from: string;
    status: 'found' | 'not_found' | 'error';
    reliableSource: boolean;
}