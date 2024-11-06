const pool = require('../db');

// Controller untuk mendapatkan data ikankonsumsi
exports.getIkanKonsumsi = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ikankonsumsi');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getIkanHias = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ikanhias");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

