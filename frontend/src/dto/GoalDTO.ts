class GoalDTO {
    id: number = 0;
    name: string = "";

    constructor(goalDTO?: GoalDTO) {
        Object.assign(this, goalDTO);
    }
}

export default GoalDTO;
