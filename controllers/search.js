module.exports = {
    getIndex: (req, res) => {
      res.render("search.ejs", { clues: [] });
    },
    search: async (req, res) => {
        try {
          const connection = req.app.get('connection')
          let [clues, _] = await connection.promise().query(`SELECT * FROM jeopardy LIMIT 10`);
          console.log(clues)
          res.render("search.ejs", { clues: clues });
        } catch (err) {
          console.log(err);
        }
    },
};