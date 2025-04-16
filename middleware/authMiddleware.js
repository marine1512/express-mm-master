const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  // Ignorer l'authentification en mode test
  if (process.env.NODE_ENV === 'test') {
    console.log('Middleware auth ignoré en mode test');
    return next();
  }

  // Exclure les routes Swagger et les fichiers statiques
  if (
    req.path.startsWith('/api-docs') || 
    req.path.startsWith('/swagger.json') || 
    req.path.startsWith('/api-docs-static')
  ) {
    return next(); // Passer directement à la route suivante
  }

  const token = req.cookies.token; // Lire le token dans les cookies

  if (!token) {
    return res.status(401).render('404'); // Redirige vers la page 404
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKey); // Décoder le token
    req.user = decoded; // Attacher les infos utilisateur à req.user
    next(); // Continuer vers la prochaine étape (route)
  } catch (error) {
    return res.status(403).render('404'); // Redirige vers la page 404
  }
};

module.exports = authMiddleware;