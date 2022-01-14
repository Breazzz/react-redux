import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {ADD_CASH, GET_CASH} from "./store/actions";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";
import {fetchCustomers} from "./store/asyncActions/customers";
import { asyncDecrementCreator, asyncIncrementCreator } from "./store/countReducer";
import { fetchUsers, removeUserAction } from "./store/userReducer";

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)
  const users = useSelector(state => state.users?.users)
  const count = useSelector(state => state.count.count)

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

  const removeUser = (user) => {
    dispatch(removeUserAction(user.id))
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
        <button onClick={() => dispatch(fetchCustomers())}>
          Получить клиентов с сервера
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
      <div style={{fontWeight: '900', textAlign: 'center'}}>
        <hr/>
        Saga:
        <hr/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <button onClick={() => dispatch(asyncIncrementCreator())}>
            increment++
          </button>
          <button onClick={() => dispatch(asyncDecrementCreator())}>
            decrement--
          </button>
          <button onClick={() => dispatch(fetchUsers())}>
            get users
          </button>
        </div>
        <div style={{color: 'green', marginTop: 20, fontSize: 30}}>
          {count}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
          {users?.length > 0 ? (
              <ul style={{color: "darkgreen", fontWeight: "900"}}>
                {users?.map(user => (
                  <li>
                    {user.name} <span onClick={() => removeUser(user)} style={{cursor: "pointer"}}>❌</span>
                  </li>
                ))}
              </ul>
            )
            : (
              <div style={{color: 'tomato'}}>
                Юзеров нет
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
