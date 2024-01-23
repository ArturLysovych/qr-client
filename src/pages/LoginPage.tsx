import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ILoginDto } from '../interfaces';
import { login } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../providers/ContextProvider';

const LoginPage = () => {

	const { admin } = useMyContext()
	const navigate = useNavigate()

	const loginSchema = z.object({
		username: z.string().min(1, 'Username is required'),
		password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
	});

	const { register, handleSubmit, formState: { errors } } = useForm<ILoginDto>({ resolver: zodResolver(loginSchema), mode: 'onChange' });

	const onSubmit = async (data: ILoginDto) => {
		await login(data)
			.then(() => {
				admin.current = true;
				navigate('/admin/requests')
			})
			.catch(err => alert(err.response.data.message))
	}

	return (
		<div className="bg-red-500">
			<div className="container mx-auto px-[20px] max-w-screen-lg">
				<div className="min-h-screen flex flex-col justify-center items-center py-16 gap-10 text-white font-bold">

					<div className='bg-white p-4 flex flex-col gap-3 rounded-lg w-5/6'>
						<h1 className='text-xl text-red-500'>Login</h1>
						<form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-3'>
							<div>
								<input className='w-full border border-black text-black' type="text" {...register('username')} />
								{errors.username?.message && <p className='text-red-500'>{errors.username?.message}</p>}
							</div>
							<div>
								<input className='w-full border border-black text-black' {...register('password')} type="password" />
								{errors.password?.message && <p className='text-red-500'>{errors.password?.message}</p>}
							</div>
							<button type='submit' className='bg-black text-white'>Submit</button>
						</form>
					</div>

				</div>
			</div>
		</div>
	)
}

export default LoginPage