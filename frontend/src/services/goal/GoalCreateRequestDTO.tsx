import GoalDTO from "../../dto/GoalDTO";

class GoalCreateRequestDTO {
    name: String = "";
    
    constructor(goalDTO: GoalDTO) {
        this.name = goalDTO.name;
    };
}

export default GoalCreateRequestDTO;