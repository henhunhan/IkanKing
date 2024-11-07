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

exports.getIkanKonsumsiByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM ikankonsumsi WHERE category = $1`, [category]);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getIkanHiasByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM ikanhias WHERE category = $1`, [category]);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

