import './LocationList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';

function LocationList() {
  const [locations, setLocations] = useState([] as LocationDTO[]);
  const [locationServiceState, setLocationServiceState] = useState({} as LocationService);

  useEffect(() => {
    const locationService = new LocationService();
    setLocationServiceState(locationService)
    locationService.loadAll()
    .then(val => {
      setLocations(val);
    })
  }, [])

  const deleteLocation = (locationId: number) => {
    setLocations(locations.filter(x => x.id !== locationId))
    locationServiceState.delete(locationId);
  }

  const search = () => {
    console.log("search")
  }

  return (
    <div>
      <TopSection pageTitle={'Locaties'} buttonTitle={'Toevoegen'} navigationLink={'/locations/edit/0'} onClick={search}/>
        {locations.map(location => {
          return (
            <div key={location.id}>
              <TableRow title={location.name} subtitle={location.area.name} onEditLink={"edit/" + location.id} onDeleteClick={() => deleteLocation(location.id)} navigationLink={ "/locations/" + location.id }/>
            </div>
          )
        })}
    </div>
  );
}

export default LocationList;
