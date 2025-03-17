import connection from "../data/db.js";

function index(req, res) {
    const sql = "SELECT * FROM `movies`";

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: "Database error"});

        const movies = results.map(m => {
            return {
                ...m,
                image: req.imagePath + m.image
            }
        });

        res.json(movies);
    });
};

function show(req, res) {
    const {id} = req.params;
    const movieSql = "SELECT * FROM `movies` WHERE `id` = ?";
    const reviewsSql = "SELECT * FROM `movies` JOIN `reviews` ON `movies`.`id` = `reviews`.`movie_id` WHERE `movies`.`id` = ?"

    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({error: "Database error"});

        const movie = movieResults[0];

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({error: "Database error"});
    
            movie.reviews = reviewsResults;
            res.json({
                ...movie,
                image: req.imagePath + movie.image
            });
        });
    });
}

export {
    index,
    show
}

