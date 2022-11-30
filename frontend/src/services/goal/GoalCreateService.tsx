import networkAdapter from "../../adapters/NetworkAdapterFactory";
import GoalDTO from "../../dto/GoalDTO";
import IService from "../IService";
import GoalCreateRequestDTO from "./GoalCreateRequestDTO";
import GoalUpdateRequestDTO from "./GoalUpdateRequestDTO";

class GoalService implements IService<GoalDTO> {
    async loadAll(): Promise<GoalDTO[]> {
        return networkAdapter
            .get("goal")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as GoalDTO[];
                data.forEach((goal: any) => {
                    let goalDTO: GoalDTO = new GoalDTO();
                    goalDTO.id = goal.id;
                    goalDTO.name = goal.name;
                    toReturn.push(goalDTO);
                });
                return toReturn;
            });
    }
    async loadOne(id: number): Promise<GoalDTO> {
        return networkAdapter
        .get("goal/" + id)
        .then(response => response.data)
        .then(data => {
            let toReturn: GoalDTO = new GoalDTO();
            toReturn.id = data.id;
            toReturn.name = data.name;

            return toReturn;
        });
    }

    async update(value: GoalDTO): Promise<void> {
        return networkAdapter.put("goal", new GoalUpdateRequestDTO(value));
    }
    async create(value: GoalDTO): Promise<void> {
        return networkAdapter.post("goal", new GoalCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("goal/" + id);
    }
}

export default GoalService;