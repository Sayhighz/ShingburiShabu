import mysql from 'mysql'

const con = mysql.createConnection({
    host: "th260.ruk-com.in.th",
    user: "shingbur_spushabu",
    password: "PCUcKMRwsw26K3KBsVHS",
    database: "shingbur_spu"
})

con.connect(function (err) {
    if (err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con