import './AreaDetail.css';
import '../../services/AreaService';
import { useState, useEffect } from 'react';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';

function AreaDetail() {
  const [area, setArea] = useState({} as AreaDTO);
  const [service, setService] = useState({} as AreaService);

  const params = useParams();
  useEffect(() => {
    const areaService = new AreaService();
    setService(areaService)
    areaService.loadOne(id)
    .then(val => {
      setArea(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div>
      <DetailTopSection pageTitle={area.name} buttonTitle={'Wijzigen'} navigationLink={'/areas/edit/' + area.id} subheading={'Gebieden'}/>
      <table className="area-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Lengtegraad:</td>
            <td>{area.longitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Breedtegraad:</td>
            <td>{area.latitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Straal:</td>
            <td>{area.radius + " meter"}</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default AreaDetail;
