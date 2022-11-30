import './FranchiseList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import FranchiseService from '../../services/franchise/FranchiseService';
import FranchiseDTO from '../../dto/FranchiseDTO';

function FranchiseList() {
  const [franchises, setFranchises] = useState([] as FranchiseDTO[]);
  const [service, setService] = useState({} as FranchiseService);

  useEffect(() => {
    const franchiseService = new FranchiseService();
    setService(franchiseService)
    franchiseService.loadAll()
    .then(val => {
      setFranchises(val);
    })
  }, [])

  const deleteFranchise = (id: number) => {
    setFranchises(franchises.filter(x => x.id !== id))
    service.delete(id);
  }

  const search = () => {
    console.log("search")
  }

  return (
    <div>
      <TopSection pageTitle={'Franchises'} buttonTitle={'Toevoegen'} navigationLink={'/franchises/edit/0'} onClick={search}/>
        {franchises.map(franchise => {
          return (
            <div key={franchise.id}>
              <TableRow title={franchise.name} onEditLink={"/franchises/edit/" + franchise.id} onDeleteClick={() => deleteFranchise(franchise.id)} navigationLink={"/franchises/" + franchise.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default FranchiseList;
