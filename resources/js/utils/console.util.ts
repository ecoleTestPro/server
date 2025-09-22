export class Logger {
    static showLog: boolean = true;

    constructor(showLog: boolean = true) {
        // Constructor logic if needed
        Logger.showLog = showLog;
    }

    static log(message: string, ...optionalParams: any[]) {
        if (Logger.showLog) {
            console.log('[LOG] ' + message, ...optionalParams);
        }
    }

    static warn(message: string, ...optionalParams: any[]) {
        if (Logger.showLog) {
            console.warn('[WARN] ' + message, ...optionalParams);
        }
    }

    static error(message: string, ...optionalParams: any[]) {
        if (Logger.showLog) {
            console.error('[ERROR] ' + message, ...optionalParams);
        }
    }

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
