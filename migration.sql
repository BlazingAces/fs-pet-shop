DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id SERIAL,
    name TEXT,
    kind TEXT,
    age INTEGER
);

INSERT INTO pets (name, kind, age) VALUES ('Fluffy', 'dog', 12);
INSERT INTO pets (name, kind, age) VALUES ('Mikey', 'turtle', 39);
INSERT INTO pets (name, kind, age) VALUES ('Spyro', 'dragon', 24);