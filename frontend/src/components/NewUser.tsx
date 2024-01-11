import { useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CREATE_USER } from '../graphql/mutations';
import { GET_USERS } from '../graphql/queries';

export const NewUser = () => {
	const [name, setName] = useState<string>('');
	const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

	const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name) {
			return;
		}

		await createUser({
			variables: {
				name,
			},
			refetchQueries: [GET_USERS],
		});

		console.log('[Data]: ', data);
	};

	const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		console.log(e.target.value);
	};

	return (
		<form onSubmit={handleCreateUser}>
			<input type='text' placeholder='Inserir nome' onChange={handleChangeName} />
			<button type='submit'>Adicionar utilizador</button>
		</form>
	);
};
