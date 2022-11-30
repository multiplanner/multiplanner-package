import './LocationDetail.css';
import { useState, useEffect } from 'react';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import { Link, useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';

function LocationDetail() {
  const [location, setLocation] = useState<LocationDTO>();

  const params = useParams();

  useEffect(() => {
    const locationService = new LocationService();
    locationService.loadOne(id)
    .then(val => {
      setLocation(val);
    });
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  if(!location || !location.area || !location.linkedInterventions) {
    return null;
  }

  return (
    <div>
      <DetailTopSection pageTitle={location.name} buttonTitle={'Wijzigen'} navigationLink={'/locations/edit/' + location.id} subheading={'Locaties'}/>
      <table className="location-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Gebied:</td>
            <td><Link to={"/areas/" + location.area.id}>{location.area.name}</Link></td>
          </tr>
          <tr>
            <td className="table-min-width">Franchise:</td>
            <td><Link to={"/franchises/" + location.franchise.id}>{location.franchise.name}</Link></td>
          </tr>
          <tr>
            <td className="table-min-width">Lengtegraad:</td>
            <td>{location.longitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Breedtegraad:</td>
            <td>{location.latitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Straal:</td>
            <td>{location.radius + " meter"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Triggertijd:</td>
            <td>{location.delay + (location.delay > 1 ? " seconden" : " seconde")}</td>
          </tr>
        </tbody>
      </table>
      <div className="interventions">
        <h4>Interventies</h4>
        {
        location.linkedInterventions.length !== 0  ? 
        location.linkedInterventions.map(intervention => {
          return <p id={intervention.id.toString()}>{intervention.name}</p>
        }) : 
        <p>Er zijn nog geen gekoppelde interventies!</p>
        }
      </div>
    </div>
  );
}

export default LocationDetail;
