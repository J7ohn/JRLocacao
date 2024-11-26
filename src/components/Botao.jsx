import { useNavigate } from 'react-router-dom';
import '../styles/Botao.css';

const BudgetButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/orcamento');
    };

    return (
        <button className="budget-button" onClick={handleClick}>
            Adiante Seu Orçamento!
        </button>
    );
};

export default BudgetButton;
