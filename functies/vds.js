const vds = c => (...a) => c(vds(c))(...a);

export default vds;