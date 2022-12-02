import vds from "#f/vds.js";

const fibonacci = n => vds(z => (l = [1, 0]) => l.length == n ? l : z([l[0] + l[1], ...l]))().reverse();

export default fibonacci;