import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {ADD_CASH, ADD_CUSTOMER, GET_CASH, REMOVE_CUSTOMER} from "./store/actions";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const addCash = (cash) => {
    dispatch({type: ADD_CASH, payload: cash})
  }

  const getCash = (cash) => {
    dispatch({type: GET_CASH, payload: cash})
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <div style={{fontWeight: '900', textAlign: 'center'}}>
        CASH: {cash}
        <hr/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => addCash(Number(prompt()))}>
          Пополнить счет
        </button>
        <button onClick={() => getCash(Number(prompt()))}>
          Снять со счета
        </button>
        <button onClick={() => addCustomer(prompt())}>
          Добавить клиента
        </button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
        {customers.length > 0 ? (
            <ul style={{color: "darkgreen", fontWeight: "900"}}>
              {customers.map(customer => (
                <li>
                  {customer.name} <span onClick={() => removeCustomer(customer)} style={{cursor: "pointer"}}>❌</span>
                </li>
              ))}
            </ul>
          )
          : (
            <div style={{color: 'tomato'}}>
              Клиентов нет
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
