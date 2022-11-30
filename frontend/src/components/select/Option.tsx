class Option {
    id: string = "";
    name: string = "";

    constructor(option?: Option) {
        Object.assign(this, option);
    }
}

export default Option;
