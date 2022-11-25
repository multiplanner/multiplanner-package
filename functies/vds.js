const vds = z => (...args) => z(vds(z))(...args);

export default vds;