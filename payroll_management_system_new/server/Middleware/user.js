import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userauthenticate = (req, res, next) => {
    const cookie = req.headers.cookie;
    console.log(cookie, 'fg');

    if (cookie) {
        const [name, token] = cookie.trim().split('=');
        console.log(name);
        console.log(token);

        if (name == 'payrollToken1') {
            const verified = jwt.verify(token, process.env.SECRET_KEY);
            console.log(verified);
            req.user = verified.EMPID;
            req.Name = verified.Name;
            next();
        }
        else {
            res.status(401).send("Unauthorized access");
        }
    }
    else {
        res.status(401).send("Unauthorized access");
    }
}

export default userauthenticate;