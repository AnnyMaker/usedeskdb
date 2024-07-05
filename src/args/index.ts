

export const parse = (args: string[]) => {

    const flags = args.filter(arg => ~arg.indexOf('--')).map(arg => arg.replace('--', ''));

    return {
        flags: () => flags
    }

}
