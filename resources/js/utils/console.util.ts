export class Logger {
    static showLog: boolean = true;

    constructor(showLog: boolean = true) {
        // Constructor logic if needed
        Logger.showLog = showLog;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static log(message: string, ...optionalParams: any[]) {
        if (Logger.showLog) {
            console.log('[LOG] ' + message, ...optionalParams);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static warn(message: string, ...optionalParams: any[]) {
        if (Logger.showLog) {
            console.warn('[WARN] ' + message, ...optionalParams);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static error(message: string, ...optionalParams: any[]) {
        if (Logger.showLog) {
            console.error('[ERROR] ' + message, ...optionalParams);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static table(data: any, columns?: string[]) {
        if (Logger.showLog) {
            if (columns) {
                console.table(data, columns);
            } else {
                console.table(data);
            }
        }
    }
}
