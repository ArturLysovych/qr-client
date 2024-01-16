import React from 'react'
import { Link } from 'react-router-dom'

interface LinkButtonProps {
	to: string,
	children: React.ReactNode
}

const LinkButton = ({ to, children }: LinkButtonProps) => {
	return (
		<Link to={to} className="bg-white text-lg font-bold text-red-500 w-full text-center py-2 rounded-lg uppercase cursor-pointer transition-all border-transparent border-[5px] hover:bg-red-500 hover:border-white hover:text-white">
			{children}
		</Link>
	)
}

export default LinkButton