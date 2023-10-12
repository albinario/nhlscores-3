import { useIsFetching } from '@tanstack/react-query'

const Fetching = () => {
	const isFetching = useIsFetching()

	return isFetching ? (
		<div className='spinner-border spinner-border-sm text-seconus opacity-50 position-absolute end-0 me-5 fs-6'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	) : null
}

export default Fetching
