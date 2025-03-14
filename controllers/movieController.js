import connection from "../data/db.js";

function index(req, res) {
    const sql = "SELECT * FROM `movies`";

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: "Database error"});

        res.json(results);
    })
};

export {
    index
}

