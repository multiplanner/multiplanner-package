import LocationDTO from "../../dto/LocationDTO";

class LocationUpdateRequestDTO {
    areaId: number = 0;
    franchiseId: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    name: string = "";
    radius: number = 0;
    delay: number = 0;
    linkedInterventions: number[] = [];
    
    constructor(locationDTO: LocationDTO) {
        this.areaId = locationDTO.areaId;
        this.franchiseId = locationDTO.franchiseId;
        this.latitude = locationDTO.latitude;
        this.longitude = locationDTO.longitude;
        this.name = locationDTO.name;
        this.radius = locationDTO.radius;
        this.delay = locationDTO.delay;
        this.linkedInterventions = locationDTO.linkedInterventions.map(x => {return x.id});
    };

}

export default LocationUpdateRequestDTO;
