import jwt from 'jsonwebtoken';

export async function post({ request }) {
  const { username, password } = await request.json();
  // Valideer credentials (voorbeeld)
  if (username === 'admin' && password === 'pass') {
    const token = jwt.sign({ role: 'admin' }, 'secret', { expiresIn: '1h' });
    return { body: JSON.stringify({ token }) };
  }
  return { status: 401, body: 'Invalid credentials' };
}