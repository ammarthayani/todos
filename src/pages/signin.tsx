import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import getBaseUrl from '../utils/getBaseUrl';

const SignIn: NextPage = () => {
	const redirectUrl = getBaseUrl();

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
				<h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
					Sign In With Google
				</h5>
				<div className=" mt-4 flex justify-center items-center">
					<button
						type="button"
						onClick={() => signIn('google', { callbackUrl: redirectUrl })}
						className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center"
					>
						<svg
							className="w-4 h-4"
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="google"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 488 512"
						>
							<path
								fill="currentColor"
								d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
