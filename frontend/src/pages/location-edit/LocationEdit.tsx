import './LocationEdit.css';
import '../../services/location/LocationService';
import { useState, useEffect, FormEvent } from 'react';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import AreaDTO from '../../dto/AreaDTO';
import InterventionDTO from '../../dto/InterventionDTO';
import InterventionService from '../../services/InterventionService';
import TableRow from '../../components/tablerow/TableRow';
import AreaService from '../../services/AreaService';
import Select from '../../components/select/Select';
import Option from '../../components/select/Option';
import FranchiseService from '../../services/franchise/FranchiseService';
import FranchiseDTO from '../../dto/FranchiseDTO';

function LocationEdit() {
  const [location, setLocation] = useState({} as LocationDTO);
  const [selectedIntervention, setSelectedIntervention] = useState(0 as Number);
  const [allAreas, setAllAreas] = useState([] as AreaDTO[]);
  const [allInterventions, setAllInterventions] = useState([] as InterventionDTO[]);
  const [allFranchises, setAllFranchises] = useState([] as FranchiseDTO[]);
  const [service, setService] = useState({} as LocationService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(location)
        .then(() => {
          toast.success("Locatie aangemaakt!");
          navigate("/locations");
        }).catch(err => {
          setErrors(err.response.data);
          console.log(err.response.data)
          return;
        });
    } else {
      await service.update(location)
      .then(() => {
        toast.success("Locatie bijgewerkt!");
        navigate("/locations");
      }).catch(err => {
        setErrors(err.response.data);
        return;
      });
    }
  }

  useEffect(() => {
    const locationService = new LocationService();
    const interventionService = new InterventionService();
    const areaService = new AreaService();
    const franchiseService = new FranchiseService();
    setService(locationService)
    interventionService
      .loadAll()
      .then(interventions => {
        setAllInterventions(interventions);
      })
    areaService
      .loadAll()
      .then(areas => {
        setAllAreas(areas);
      });
    franchiseService
      .loadAll()
      .then(franchises => {
        setAllFranchises(franchises);
      });
    if(!isEdit) {
      let locDTO: LocationDTO = new LocationDTO();
      locDTO.area = new AreaDTO();
      setLocation(locDTO);
    } else {
      locationService.loadOne(id)
      .then(val => {
        setLocation(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocation({...location, [e.target.id]: e.target.value})
  }

  const updateArea = (id:string) => {
    setLocation({...location, "areaId": Number(id)});
  }

  const updateFranchise = (id:string) => {
    setLocation({...location, "franchiseId": Number(id)});
  }

  const changeSelectedIntervention = (id:string) => {
    setSelectedIntervention(Number(id));
  }

  const removeIntervention = (id:number) => {
    const newLoc : LocationDTO = new LocationDTO(location);
    newLoc.linkedInterventions = newLoc.linkedInterventions.filter(x => x.id !== id);

    setLocation(newLoc);
  }

  const addIntervention = (e: FormEvent) : void => {
    e.preventDefault();
    var select = document.getElementById('new-intervention') as any;
    var value = select.options[select.selectedIndex].value;
    if(value != 0) {
      const newLoc : LocationDTO = new LocationDTO(location);
      newLoc.linkedInterventions.push(allInterventions.find(x => x.id === Number(value)) as InterventionDTO);
  
      setLocation(newLoc);
    }
  }

  if(!allInterventions || !location || !location.linkedInterventions || !allAreas) {
    return null;
  }

  return (
    <div>
      <h2>{isEdit ? location.name + " Wijzigen" : "Locatie aanmaken"}</h2>
      <div className="fields-row">
      <form onSubmit={onSubmit}>
          <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={location.name} errors={errors.name}/>
          <br/>
          <Select placeholderText={'Kies een gebied'} value={location.areaId.toString()} selectName={'areaId'} selectLabel={'Gebied'} onChange={updateArea} options={allAreas.map(x => {
            let option = new Option();
            option.id = x.id.toString();
            option.name = x.name;

            return option;
          })}
          width={"large"}
          />
          <br/>
          <Select placeholderText={'Kies een franchise'} value={location.franchiseId.toString()} selectName={'franchiseId'} selectLabel={'Franchise'} onChange={updateFranchise} options={allFranchises.map(x => {
            let option = new Option();
            option.id = x.id.toString();
            option.name = x.name;

            return option;
          })}
          width={"large"}
          />
          <br/>
          <Input placeholderText={'Lengtegraad'} inputName={'longitude'} inputType={'number'} inputLabel={'Lengtegraad'} onChange={handleChange} value={location.longitude === 0 ? "" : location.longitude} errors={errors.longitude}/>
          <br/>
          <Input placeholderText={'Breedtegraad'} inputName={'latitude'} inputType={'number'} inputLabel={'Breedtegraad'} onChange={handleChange} value={location.latitude === 0 ? "" : location.latitude} errors={errors.latitude}/>
          <br/>
          <Input placeholderText={'Straal in meters'} inputName={'radius'} inputType={'number'} inputLabel={'Straal'} onChange={handleChange} value={location.radius === 0 ? "" : location.radius} errors={errors.radius}/>
          <br/>
          <Input placeholderText={'Triggertijd in seconden'} inputName={'delay'} inputType={'number'} inputLabel={'Delay'} onChange={handleChange} value={location.radius === 0 ? "" : location.delay} errors={errors.delay}/>
          <br/>
          <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
      <div className="column interventions">
        <form className="add-row" onSubmit={addIntervention}>
          <Select 
            placeholderText={'Kies een interventie'} 
            selectName={'new-intervention'} 
            onChange={changeSelectedIntervention} 
            selectLabel={'Voeg interventie toe'} 
            value={selectedIntervention.toString()}
            options={allInterventions.filter(x => location.linkedInterventions.find(y => y.id === x.id) === undefined).map(intervention => {
              let option = new Option();
              option.id = intervention.id.toString();
              option.name = intervention.name;

              return option;
            })
            }
            />
          <div className="add-button">
            <SubmitButton value="Voeg toe"/>
          </div>
        </form>
        {location.linkedInterventions.map(intervention => {
          return <TableRow title={intervention.name} onDeleteClick={() => removeIntervention(intervention.id)} />
        })}
        </div>
      </div>
    </div>
  );
}

export default LocationEdit
