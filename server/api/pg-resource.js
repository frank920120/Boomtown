function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname,email,password) VALUES ($1,$2,$3) RETURNING *', //
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id=$1',
        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'user was not found';

        return user.rows[0];
      } catch (e) {
        throw 'user not found';
      }
    },
    async getItems(idToOmit) {
      const items = await postgres.query({
        text: 'select * from items where itemowner!=$1',
        values: idToOmit ? [idToOmit] : []
      });
      return items.rows;
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `select * from items where itemowner = $1;`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `select * from items where borrower=$1`,
        values: [id]
      });
      return items.rows;
    },
    async getTags() {
      try {
        const tags = await postgres.query('SELECT * FROM tags');
        return tags.rows;
      } catch (err) {
        throw err;
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `select * from tags inner join itemtags on tags.id=itemtags.tagid where itemid = $1`,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              const { title, description, tags } = item;
              console.log(item, user);
              const addItemQuery = {
                text: `INSERT INTO items (title, description, itemowner) VALUES ($1, $2, $3) RETURNING "id", "title", "imageurl", "description", "itemowner", "borrower", "created";`,
                values: [title, description, user]
              };

              const additem = await client.query(addItemQuery);

              const tagsId = tags.map(tag => tag.id);
              const addTagsQuery = {
                text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagsQueryString(
                  [...tags],
                  additem.rows[0].id,
                  ''
                )}`,
                values: tagsId
              };

              const addtags = await client.query(addTagsQuery);

              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }

                done();

                resolve(additem.rows[0]);
                // -------------------------------
              });
            });
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }

              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
