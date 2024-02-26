import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const router = express.Router();

// method post + check data login system
router.post("/adminlogin", (req, res) => {
  const sql =
    "SELECT id, email, role FROM admin WHERE email = ? AND password = ?";

  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });

    if (result.length > 0) {
      const { id, email, role } = result[0];
      const token = jwt.sign({ id, role, email }, "jwt_secret_key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ loginStatus: true, role });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true });
  });
});

//image upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
//end upload

router.post("/add_menu", upload.single("image"), (req, res) => {
  const sql = "INSERT INTO menu (`name`,`type`,`price`,`image`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.type,
    req.body.price,
    req.file.filename,
  ];
  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true });
  });
});

// req orderNo
router.get("/order", (req, res) => {
  const orderNo = req.query.orderNo || 1;
  const sql = `
    SELECT * FROM \`order\`
    INNER JOIN menu ON \`order\`.food_no = menu.id
    WHERE order_no = ${orderNo}
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// req year
router.get("/monthlysales", (req, res) => {
  const year = req.query.year || 2024;
  const sql = `
    SELECT YEAR(create_date) AS year, MONTH(create_date) AS month, SUM(price) AS total_sales
    FROM (
        SELECT o.food_no, SUM(o.food_amount * m.price) AS price, o.create_date
        FROM \`order\` o
        INNER JOIN menu m ON o.food_no = m.id
        WHERE o.create_date IS NOT NULL AND YEAR(o.create_date) = ${year}
        GROUP BY o.food_no, YEAR(o.create_date), MONTH(o.create_date)
    ) AS subquery
    GROUP BY YEAR(create_date), MONTH(create_date)
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// get annualsales
router.get("/annualsales", (req, res) => {
  const sql = `
    SELECT YEAR(create_date) AS year, SUM(price) AS total_sales
    FROM (
    SELECT o.food_no, SUM(o.food_amount * m.price) AS price, o.create_date
    FROM \`order\` o
    INNER JOIN menu m ON o.food_no = m.id
    WHERE o.create_date IS NOT NULL
    GROUP BY o.food_no, YEAR(o.create_date)
    ) AS subquery
    GROUP BY YEAR(create_date)
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// get popular menu
router.get("/popular", (req, res) => {
  const sql = `
    SELECT m.name, COUNT(o.order_no) AS order_count
    FROM \`order\` o
    JOIN menu m ON o.food_no = m.id
    WHERE o.create_date IS NOT NULL
    GROUP BY o.order_no 
    ORDER BY order_count DESC
    LIMIT 5;
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// get bill_detail
router.get("/bill_detail", (req, res) => {
  const sql = `
    SELECT MIN(o.order_no) AS order_no, 
    MIN(o.table_no) AS table_no, 
    CASE WHEN MIN(o.status) = 'paymented' THEN MIN(o.payment_date) ELSE MIN(o.create_date) END AS date,
    a.email AS create_by, 
    MIN(o.status) AS status
    FROM \`order\` o
    JOIN admin a ON o.create_by = a.id
    WHERE o.create_date IS NOT NULL
    GROUP BY o.order_no, o.table_no, o.create_by, a.email;
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// get all menu
router.get("/menu", (req, res) => {
  const sql = "SELECT * FROM menu";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// get all employee
router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

//show employee req
router.get("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM admin WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

//put employee req id and input data
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE admin set email = ?, password = ?, role = ? WHERE id = ?`;
  const values = [req.body.email, req.body.password, req.body.role];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// post employee
router.post("/add_employee", (req, res) => {
  const sql = "INSERT INTO admin (`email`, `password`, `role`) VALUES (?)";
  const values = [req.body.email, req.body.password, req.body.role];

  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true });
  });
});

// get data menu req id
router.get("/menu/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM menu WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/tables', (req,res) =>{
    const sql = "SELECT * FROM `table`"
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
    }
)

router.put('/updateTableStatus/:tb_number', (req, res) => {
    const tbNumber = req.params.tb_number;
    const newStatus = req.body.status;

    const sql = "UPDATE `table` SET tb_status = ? WHERE tb_number = ?";
    con.query(sql, [newStatus, tbNumber], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message });
        return res.json({ Status: true });
    });
});




router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status:true})
})

// put new data
router.put("/edit_menu/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE menu set name = ?, type = ?, price = ? WHERE id = ?`;
  const values = [req.body.name, req.body.type, req.body.price];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// delete menu req id
router.delete("/delete_menu/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from menu where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// delete employee req id
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from admin where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// income count
router.get("/income_count", (req, res) => {
  const sql = `SELECT SUM(o.food_amount * m.price) AS total_revenue
    FROM \`order\` o
    JOIN menu m ON o.food_no = m.id
    WHERE o.payment_date IS NOT NULL;`;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// order count
router.get("/order_count", (req, res) => {
  const sql = `SELECT COUNT(DISTINCT order_no) AS total_orders
    FROM \`order\`
    WHERE create_date IS NOT NULL;`;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// admin count
router.get("/admin_count", (req, res) => {
  const sql = "SELECT count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// employee count
router.get("/employee_count", (req, res) => {
  const sql = "SELECT count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// menu count
router.get("/menu_count", (req, res) => {
  const sql = "SELECT count(id) as menu from menu";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

// logout method
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
