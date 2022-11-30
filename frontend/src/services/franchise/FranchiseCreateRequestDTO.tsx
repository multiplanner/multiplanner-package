import FranchiseDTO from "../../dto/FranchiseDTO";

class FranchiseCreateRequestDTO {
    name: String = "";
    
    constructor(franchiseDTO: FranchiseDTO) {
        this.name = franchiseDTO.name;
    };
}

export default FranchiseCreateRequestDTO;