import GoalDTO from "../../dto/GoalDTO";

class GoalUpdateRequestDTO {
    id: number = 0;
    name: String = "";
    
    constructor(goalDTO: GoalDTO) {
        this.id = goalDTO.id;
        this.name = goalDTO.name;
    };
}

export default GoalUpdateRequestDTO;