module.exports = {
    getIndex: (req, res) => {
      res.render("search.ejs", { clues: [] });
    },
    search: async (req, res) => {
        try {
          const clues = [{answer: 'This dessert is sometimes served with ice cream.', question: 'pie', category: 'FOOD STUFF', air_date: '2020-1-5', 'label': 200}];
          res.render("search.ejs", { clues: clues });
        } catch (err) {
          console.log(err);
        }
    },
};