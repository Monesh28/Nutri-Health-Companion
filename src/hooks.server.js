import { redirect } from '@sveltejs/kit';

function homeForRole(role) {
	return role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
}

export async function handle({ event, resolve }) {
	const role = event.cookies.get('firebase_role');
	const path = event.url.pathname;

	if (path.startsWith('/admin') || path.startsWith('/student')) {
		if (!role) {
			redirect(303, '/login');
		}

		if (path.startsWith('/admin') && role !== 'admin') {
			redirect(303, homeForRole(role));
		}

		if (path.startsWith('/student') && role === 'admin') {
			redirect(303, homeForRole(role));
		}
	}

	if ((path === '/' || path === '/login' || path === '/signup') && role) {
		redirect(303, homeForRole(role));
	}

	return resolve(event);
}
