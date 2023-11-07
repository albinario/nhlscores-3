import Spinner from 'react-bootstrap/Spinner'
import { useIsFetching } from '@tanstack/react-query'

const Fetching = () => {
	const isFetching = useIsFetching()

	return isFetching ? (
		<Spinner
			animation='grow'
			className='position-absolute end-0 opacity-75 me-5'
			size='sm'
			variant='warning'
		/>
	) : null
}

export default Fetching
