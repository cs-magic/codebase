grep '^DATABASE_URL=' ../../.env ../../.env.local | tail -n 1 | cut -d '=' -f2-
