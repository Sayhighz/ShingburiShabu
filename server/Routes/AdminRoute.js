import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const router = express.Router()


router.post('/adminlogin', (req, res) => {
    const sql = "SELECT id, email, role FROM admin WHERE email = ? AND password = ?";
    
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err)
            return res.json({ loginStatus: false, Error: "Query error" });

        if (result.length > 0) {
            const { id, email, role } = result[0];
            const token = jwt.sign({ id, role, email }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie('token', token);
            return res.json({ loginStatus: true, role });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    });
});

router.get("/category", (req, res) => {
    const sql = "SELECT * FROM category"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})



router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true })
    })
})

//image upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
//end upload

router.post('/add_menu', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO menu (`name`,`type`,`price`,`image`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.type,
        req.body.price,
        req.file.filename
    ]
    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true })
    })
})

router.get('/order', (req, res) => {
    const tableNo = req.query.tableNo || 1;
    const sql = `
    SELECT * FROM \`order\`
    INNER JOIN menu ON \`order\`.food_no = menu.id
    WHERE table_no = ${tableNo}
  `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/menu', (req, res) => {
    const sql = "SELECT * FROM menu"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM admin"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM admin WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE admin set email = ?, password = ?, role = ? WHERE id = ?`
    const values = [
        req.body.email,
        req.body.password,
        req.body.role
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_employee', (req, res) => {
    const sql = "INSERT INTO admin (`email`, `password`, `role`) VALUES (?)";
    const values = [
        req.body.email,
        req.body.password,
        req.body.role
    ];

    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message });
        return res.json({ Status: true });
    });
});



router.get('/menu/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM menu WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})


router.put('/edit_menu/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE menu set name = ?, type = ?, price = ? WHERE id = ?`
    const values = [
        req.body.name,
        req.body.type,
        req.body.price
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_menu/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from menu where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from admin where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/admin_count', (req,res) =>{
    const sql = "SELECT count(id) as admin from admin"
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
    }
)

router.get('/employee_count', (req,res) =>{
    const sql = "SELECT count(id) as employee from employee"
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
    }
)

router.get('/menu_count', (req,res) =>{
    const sql = "SELECT count(id) as menu from menu"
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: err.message })
        return res.json({ Status: true, Result: result })
    })
    }
)


router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status:true})
})



export { router as adminRouter }