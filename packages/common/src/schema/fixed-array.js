export class FixedArray extends Array {
    maxSize;
    constructor(size = 8) {
        // the Array default size
        super(size);
        this.maxSize = size;
    }
    push(...items) {
        super.push(...items);
        while (this.length > this.maxSize)
            this.shift();
        // console.log("pushed: ", this.toString())
        return this.length;
    }
}
