import type {Dictionary, Placeholders, SpecificDictionary, SpecificTranslator, LangService} from "./types";
import {MessageNotFound, LangNotFound} from "./errors";


export const createLangService = (dictionary: Dictionary): LangService => {

    let translators: {[langCode: string]: SpecificTranslator} = {};

    const getLangList = () => Object.keys(dictionary);

    const getTranslator = (lang: string): SpecificTranslator => {
        if(!(lang in dictionary)) {
            throw new LangNotFound(lang);
        }

        if(!(lang !in translators)) {
            translators[lang] = new Translator(dictionary[lang])
        }
        return  translators[lang];

    }

    return  {
        getLangList,
        getTranslator
    }
}


class Translator implements SpecificTranslator {

    constructor(private dictionary: SpecificDictionary) {}

    getMessageCodes = () => Object.keys(this.dictionary);

    getMessage = (code: string, params: Placeholders|null = null): string => {
        const message = this.dictionary[code];
        if(!message) {
            throw new MessageNotFound(code);
        }
        return params === null ? message : transform(message, params);
    }

}

const transform = (message: string, placeholders: Placeholders): string => {
    let transformMessage = message;
    for(let key in placeholders) {
        const searchValue = `{{${key}}}`;
        transformMessage = transformMessage.replace(searchValue, placeholders[key])
    }
    return transformMessage;
}



