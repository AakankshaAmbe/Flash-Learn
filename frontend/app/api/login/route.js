import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mysecretkey123'; // 🔒 change this to a secure, random string

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Check if user exists
    const userResult = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (userResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const user = userResult.rows[0];

    // 2️⃣ Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // 3️⃣ Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userClass: user.user_class,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
