module.exports = class DBWrapper {
    constructor(options = {}) {
        if (this.constructor === DBWrapper) throw new Error('Cannot instantiate abstract class')
        this.options = options
    }

    connect() { }
}