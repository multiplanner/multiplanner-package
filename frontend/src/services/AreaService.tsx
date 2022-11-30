import networkAdapter from "../adapters/NetworkAdapterFactory";
import AreaDTO from "../dto/AreaDTO";
import IService from "./IService";

class AreaService implements IService<AreaDTO> {
    async loadAll(): Promise<AreaDTO[]> {
        return networkAdapter.get("areas")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as AreaDTO[];
                data.forEach((area: any) => {
                    let areaDto: AreaDTO = new AreaDTO();
                    areaDto.id = area.id;
                    areaDto.latitude = area.latitude;
                    areaDto.longitude = area.longitude;
                    areaDto.name = area.name;
                    areaDto.radius = area.radius;
                    toReturn.push(areaDto);
                });

                return toReturn;
            });
    }
    async loadOne(id: number): Promise<AreaDTO> {
        return networkAdapter.get("areas/" + id)
            .then(response => response.data)
            .then(area => {
                let areaDto: AreaDTO = new AreaDTO();
                areaDto.id = area.id;
                areaDto.latitude = area.latitude;
                areaDto.longitude = area.longitude;
                areaDto.name = area.name;
                areaDto.radius = area.radius;
                return areaDto;
            });
    }
    update(value: AreaDTO): Promise<void> {
        return networkAdapter.put("areas", value);
    }
    create(value: AreaDTO): Promise<void> {
        return networkAdapter.post("areas", value);
    }
    delete(id: number): Promise<void> {
        return networkAdapter.delete("areas/" + id);
    }
}

export default AreaService;