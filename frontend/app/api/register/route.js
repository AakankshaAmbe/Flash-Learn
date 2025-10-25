import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { name, email, password, userClass } = await req.json();

    // 1️⃣ Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (existingUser.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Insert user into database
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, user_class)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, user_class`,
      [name, email, hashedPassword, userClass]
    );

    return new Response(JSON.stringify({ message: 'User registered successfully', user: result.rows[0] }), {
      status: 201,
    });
  } catch (err) {
    console.error('Error registering user:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
