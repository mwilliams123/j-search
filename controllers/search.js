module.exports = {
    getIndex: (req, res) => {
      res.render("search.ejs", { clues: [] });
    },
    search: async (req, res) => {
        try {
          console.log(req.query)
          let query = `SELECT * FROM jeopardy `;
          let values = [];
          if (req.query.keywords) {
            query += "WHERE MATCH (category,answer,question)\nAGAINST (? IN BOOLEAN MODE)"
            values.push('+' + req.query.keywords.split().join('+'))
          } else {
            query += "WHERE True"
          }
          if (req.query.category) {
            query += " AND category=UPPER(?)"
            values.push(req.query.category)
          }
          if (req.query.double && req.query.double === 'on') {
            query += " AND daily_double=True"
          }
          if (req.query.round) {
            query += " AND round=" + req.query.round
          }
          if (req.query.value) {
            query += " AND value=" + req.query.value + ' AND daily_double=False'
          }
          if (req.query.start) {
            query += " AND air_date >='" + req.query.start + "'"
          }
          if (req.query.end) {
            query += " AND air_date <='" + req.query.end + "'"
          }

          // sort by date
          query += "\nORDER BY air_date, round, category, value\nLIMIT 100"
     
          const connection = req.app.get('connection')
          console.log(query)
          let [clues, _] = await connection.promise().query(query, values);
          res.render("search.ejs", { clues: clues });
        } catch (err) {
          console.log(err);
        }
    },
};