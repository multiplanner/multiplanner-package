class FranchiseDTO {
    id: number = 0;
    name: string = "";

    constructor(franchiseDTO?: FranchiseDTO) {
        Object.assign(this, franchiseDTO);
    }
}

export default FranchiseDTO;
