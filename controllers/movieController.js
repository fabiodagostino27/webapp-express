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
};

function storeReview(req, res) {
    const {id} = req.params;
    const {name, vote, text} = req.body;
    const sql = `INSERT INTO reviews (name, vote, text, movie_id) VALUES (?,?,?,?)`

    connection.query(sql, [name, vote, text, id], (err, results) => {
        if (err) return res.status(500).json({error: "Database error"});

        res.status(201).json({
            message: "Review added",
            id: results.insertId
        })
    })
};

function store(req, res) {
    const {title, director, genre, release_year, abstract} = req.body;
    const imageName = `${req.file.filename}`;
    const sql = `INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?,?,?,?,?)`;

    connection.query(sql, [title, director, genre, release_year, abstract, imageName], (err, results) => {
        if (err) return res.status(500).json({error: "Database error"});

        res.status(201).json({
            message: "Movie added",
            id: results.insertId
        });
    })
}

export {
    index,
    show,
    storeReview,
    store
}

