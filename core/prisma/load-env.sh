grep '^DATABASE_URL=' ../../.env | tail -n 1 | cut -d '=' -f2-
#grep '^DATABASE_URL=' ../../.env ../../.env.local | tail -n 1 | cut -d '=' -f2-
