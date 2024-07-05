export class MessageNotFound extends Error {
    constructor(private codeMessage: string, message: string = '') {
        super(message);
        this.message = `${this.codeMessage}: not found in dictionary.\n` + this.message
    }
}

export class LangNotFound extends Error {
    constructor(private langCode: string, message: string = '') {
        super(message);
        this.message = `lang ${this.langCode}: not found in dictionary.\n` + this.message
    }
}