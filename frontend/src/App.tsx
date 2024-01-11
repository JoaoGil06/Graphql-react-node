import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/queries';
import { User } from './graphql/types';
import { NewUser } from './components/NewUser';

function App() {
	const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

	if (loading) {
		return <p>A Carregar...</p>;
	}
	console.log('[DATA]: ', data);
	return (
		<>
			<h1>Users</h1>
			<ul>
				{data?.users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
			<NewUser />
		</>
	);
}

export default App;
