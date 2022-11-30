import networkAdapter from "../../adapters/NetworkAdapterFactory";
import AreaDTO from "../../dto/AreaDTO";
import FranchiseDTO from "../../dto/FranchiseDTO";
import LocationDTO from "../../dto/LocationDTO";
import IService from "../IService";
import LocationCreateRequestDTO from "./LocationCreateRequestDTO";
import LocationUpdateRequestDTO from "./LocationUpdateRequestDTO";

class LocationService implements IService<LocationDTO> {
    async loadAll(): Promise<LocationDTO[]> {
        return networkAdapter.get("locations")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as LocationDTO[];
                data.forEach((location: any) => {
                    let locationDto: LocationDTO = new LocationDTO();
                    locationDto.area = location.area;
                    locationDto.franchise = location.franchise;
                    locationDto.id = location.id;
                    locationDto.latitude = location.latitude;
                    locationDto.longitude = location.longitude;
                    locationDto.name = location.name;
                    locationDto.radius = location.radius;
                    locationDto.delay = location.delay;
                    locationDto.linkedInterventions = location.linkedInterventions;
                    locationDto.areaId = locationDto.area.id;
                    locationDto.franchiseId = locationDto.franchise.id;
                    toReturn.push(locationDto);
                });

                return toReturn;
            });
    }

    async loadOne(id: number): Promise<LocationDTO> {
        return networkAdapter.get("locations/" + id)
            .then(response => response.data)
            .then(location => {
                let locationDto: LocationDTO = new LocationDTO();
                let areaData = location.area;
                let franchiseData = location.franchise;
                let areaDTO: AreaDTO = new AreaDTO();
                let franchiseDTO: FranchiseDTO = new FranchiseDTO();
                areaDTO.name = areaData.name;
                areaDTO.id = areaData.id;
                areaDTO.radius = areaData.radius;
                areaDTO.longitude = areaData.longitude;
                areaDTO.latitude = areaData.latitude;
                franchiseDTO.id = franchiseData.id;
                franchiseDTO.name = franchiseData.name;
                locationDto.id = location.id;
                locationDto.latitude = location.latitude;
                locationDto.longitude = location.longitude;
                locationDto.name = location.name;
                locationDto.radius = location.radius;
                locationDto.delay = location.delay;
                locationDto.linkedInterventions = location.linkedInterventions;
                locationDto.area = Object.assign({}, areaDTO);
                locationDto.areaId = areaDTO.id;
                locationDto.franchise = Object.assign({}, franchiseDTO);
                locationDto.franchiseId = franchiseDTO.id;
                return locationDto;
            });
    }
    update(value: LocationDTO): Promise<void> {
        return networkAdapter.put("locations", new LocationUpdateRequestDTO(value));
    }
    async create(value: LocationDTO): Promise<void> {
        return networkAdapter.post("locations", new LocationCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("locations/" + id);
    }
}

export default LocationService;