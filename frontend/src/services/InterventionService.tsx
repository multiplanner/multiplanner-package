import networkAdapter from "../adapters/NetworkAdapterFactory";
import InterventionDTO from "../dto/InterventionDTO";
import IService from "./IService";

class InterventionService implements IService<InterventionDTO> {
    async loadAll(): Promise<InterventionDTO[]> {
        return networkAdapter.get("interventions")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as InterventionDTO[];
                data.forEach((intervention: any) => {
                    let interventionDto: InterventionDTO = new InterventionDTO();
                    interventionDto.id = intervention.id;
                    interventionDto.name = intervention.name;
                    toReturn.push(interventionDto);
                });

                return toReturn;
            });
    }
    async loadOne(id: number): Promise<InterventionDTO> {
        return networkAdapter.get("interventions/" + id)
            .then(response => response.data)
            .then(intervention => {
                let interventionDto: InterventionDTO = new InterventionDTO();
                interventionDto.id = intervention.id;
                interventionDto.name = intervention.name;
                return interventionDto;
            });
    }
    update(value: InterventionDTO): Promise<void> {
        return networkAdapter.put("interventions", value);
    }
    create(value: InterventionDTO): Promise<void> {
        return networkAdapter.post("interventions", value);
    }
    delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/" + id);
    }
}

export default InterventionService;