import React from 'react';

const Login = () => {
	return (
		<div className='container mx-auto'>
			<div className='h-[100vh] flex justify-center items-center'>
				<form className='flex justify-center flex-col items-center'>
					<h2 className='text-[24px] text-bold'>
						Login page
					</h2>
					<div className='my-2'>
						<input
							placeholder='Login'
							className='border rounded-md px-2 py-3 '
							type='text'
						/>
					</div>
					<div>
						<input
							placeholder='Password'
							className='border rounded-md px-2 py-3 '
							type='password'
						/>
					</div>
					<button
						type='submit'
						className='mt-2 py-2 px-3 bg-green-400 rounded-md'
					>
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
