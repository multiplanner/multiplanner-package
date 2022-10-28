import vindStation from "./vindStation.js"
import haalPolylineOp from "./haalPolylineOp.js"

export default (stations) => {
    const polyline = [];

    const volledigestations = stations.map(vindStation);

    for (let i = 1; i < volledigestations.length; i++) {
        polyline.push(...haalPolylineOp(volledigestations[i - 1], volledigestations[i]).map((coordinaat) => ({
            lat: coordinaat[1],
            lng: coordinaat[0]
        })));
    };
    
    return polyline;
}