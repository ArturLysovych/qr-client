import React from 'react'
import { Link } from 'react-router-dom'

interface LinkButtonProps {
	to: string,
	children: React.ReactNode
}

const LinkButton = ({ to, children }: LinkButtonProps) => {
	return (
		<Link to={to} className="bg-white font-bold text-black w-full text-center py-4 rounded-lg uppercase cursor-pointer transition-colors hover:bg-black hover:text-white">
			{children}
		</Link>
	)
}

export default LinkButton