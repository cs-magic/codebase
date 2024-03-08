export class FixedArray<T> extends Array<T> {
    private maxSize: number

    constructor(size = 8) {
        // the Array default size
        super(size)
        this.maxSize = size
    }

    public push(...items: T[]): number {
        super.push(...items)
        while (this.length > this.maxSize) this.shift()
        // console.log("pushed: ", this.toString())
        return this.length
    }
}
