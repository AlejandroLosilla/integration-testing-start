export const up = async (client) => {
  await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        age int NOT NULL
      );
    `)
}

export const down = async (client) => {
  await client.query(`
      DROP TABLE IF EXISTS users;
    `)
}
