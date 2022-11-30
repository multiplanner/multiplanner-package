import './FranchiseEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import FranchiseDTO from '../../dto/FranchiseDTO';
import FranchiseService from '../../services/franchise/FranchiseService';

const FranchiseEdit : React.FC = () => {
  const [franchise, setFranchise] = useState({} as FranchiseDTO);
  const [service, setService] = useState({} as FranchiseService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(franchise)
        .then(() => {
          toast.success("Franchise aangemaakt!");
          navigate("/franchises");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service
        .update(franchise)
        .then(response => {
          toast.success("Franchise bijgewerkt!");
          navigate("/franchises");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const franchiseService = new FranchiseService();
    setService(franchiseService)
    if(!isEdit) {
      setFranchise(new FranchiseDTO())
    } else {
      franchiseService.loadOne(id)
      .then(val => {
        setFranchise(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFranchise({...franchise, [e.target.id]: e.target.value})
  }

  return (
    <div>
      <h2>{isEdit ? franchise.name + " Wijzigen" : "Franchise aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={franchise.name} errors={errors.name}/>
        <br/>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default FranchiseEdit
