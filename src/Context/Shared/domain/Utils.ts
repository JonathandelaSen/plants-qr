/*eslint-disable */
;(BigInt.prototype as any).toJSON = function () {
    return this.toString()
}
/*eslint-enable */

export default class Utils {
    static isDevEnvironment(): boolean {
        return process.env.NODE_ENV === "development"
    }
    static isTestEnvironment(): boolean {
        return process.env.NODE_ENV === "test"
    }
    static isProdEnvironment(): boolean {
        return process.env.NODE_ENV === "production"
    }

    static async wait(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}
