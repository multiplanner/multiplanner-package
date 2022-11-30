import './GoalDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';
import GoalDTO from '../../dto/GoalDTO';
import GoalService from '../../services/goal/GoalService';

function GoalDetail() {
  const [goal, setGoal] = useState({} as GoalDTO);

  const params = useParams();
  useEffect(() => {
    const goalService = new GoalService();
    goalService.loadOne(id)
    .then(val => {
      setGoal(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div>
      <DetailTopSection pageTitle={goal.name} buttonTitle={'Wijzigen'} navigationLink={'/goals/edit/' + goal.id} subheading={'Doelstelling'}/>
    </div>
  );
}

export default GoalDetail;
