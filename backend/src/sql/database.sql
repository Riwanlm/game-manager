CREATE TABLE public.users
(
    id serial NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email)
);

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    rating INTEGER DEFAULT 0,
    playtime INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
