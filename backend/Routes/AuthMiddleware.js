import jwt from "jsonwebtoken";

const Authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Non autorisé : aucun token fourni" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.userId }; // tu récupères l'ID de l'utilisateur
        next();
    } catch (err) {
        console.error("Erreur de token :", err);
        return res.status(401).json({ message: "Token invalide" });
    }
};

export default Authenticate;
