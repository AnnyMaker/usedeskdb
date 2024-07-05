
export function isNumber(value: any): boolean {
    return typeof value === "number" && !isNaN(value);
}

export function isString(value: any): value is string {
    return typeof value === "string";
}

export function isNonEmptyString(value: any ): value is string {
    return value !== "" && isString(value);
}