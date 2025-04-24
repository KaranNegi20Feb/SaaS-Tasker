import './App.css'
import { useQuery,gql } from '@apollo/client'

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const query =gql`
  query GetAllUsers {
    getAllUsers {
      id
      firstName
      lastName
      email
  }
}
`
function App() {
  const {data,loading}=useQuery(query);
  return (
   <>
    <div>
      <h1>List of all users</h1>
      {loading?<h1>loading</h1>:
      <div>
        {
        data?.getAllUsers.map((user: User) => (
            <li key={user.id}>{user.firstName}</li>
        ))
        }
      </div>
      }
    </div>
   </>
  )
}

export default App
