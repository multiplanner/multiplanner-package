import './GoalEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import GoalDTO from '../../dto/GoalDTO';
import GoalService from '../../services/goal/GoalService';

const GoalEdit : React.FC = () => {
  const [goal, setGoal] = useState({} as GoalDTO);
  const [service, setService] = useState({} as GoalService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(goal)
        .then(() => {
          toast.success("Doelstelling aangemaakt!");
          navigate("/goals");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service
        .update(goal)
        .then(response => {
          toast.success("Doelstelling bijgewerkt!");
          navigate("/goals");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const goalService = new GoalService();
    setService(goalService)
    if(!isEdit) {
      setGoal(new GoalDTO())
    } else {
      goalService.loadOne(id)
      .then(val => {
        console.log(val);
        setGoal(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setGoal({...goal, [e.target.id]: e.target.value})
  }

  return (
    <div>
      <h2>{isEdit ? goal.name + " Wijzigen" : "Doelstelling aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={goal.name} errors={errors.name}/>
        <br/>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default GoalEdit
