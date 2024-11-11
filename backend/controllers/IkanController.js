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

// Controller untuk mendapatkan data ikankonsumsi berdasarkan id
exports.getIkanKonsumsiById = async (req, res) => {
  const { id } = req.params;  
  try {
      const result = await pool.query(`SELECT * FROM ikankonsumsi WHERE id = $1`, [id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ message: "Product not found" });
      }
      res.json(result.rows[0]);
  } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Server error" });
  }
};

// Controller untuk mendapatkan data ikanhias berdasarkan id
exports.getIkanHiasById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM ikanhias WHERE id = $1`, [id]);  
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

