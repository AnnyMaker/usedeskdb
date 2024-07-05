export type Dictionary = {
    [lang: string]: SpecificDictionary
}

export type SpecificDictionary = {
    [code: string]: string
}

export type Placeholders = {
    [placeholderName: string]: string
}

export interface LangService {
    getLangList(): string[]
    getTranslator(lang: string): SpecificTranslator
}

export interface SpecificTranslator {
    getMessageCodes(): string[];
    getMessage(code: string): string;
    getMessage(code: string, params: Placeholders|null): string
}


