import { Copyright } from '../icons'

const Footer = () => (
	<footer className='mt-3 small text-secondary'>
		<p className='small'>
			This is a non-profit website. All NHL logos & team marks as well as all
			other proprietary materials posted here are the property of the NHL and
			the respective NHL teams and may not be reproduced without the permission
			of the NHL. All Rights Reserved.
			<span className='d-flex align-items-center mt-1'>
				<Copyright />
				Albin Lindeborg 2018-{new Date().getFullYear()}
			</span>
		</p>
	</footer>
)

export default Footer
