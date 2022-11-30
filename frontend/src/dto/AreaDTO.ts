class AreaDTO {
    id: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    name: string = "";
    radius: number = 0;

    constructor(AreaDTO?: AreaDTO) {
        Object.assign(this, AreaDTO);
    }

}

export default AreaDTO;
