const API_BASE_URL = 
window.location.hostname === 'localhost'
  ? 'http://localhost:3000' // Pour le développement local
  : 'https://express-mm.vercel.app/'; // Pour la production


document.addEventListener('DOMContentLoaded', () => {

    
  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      // Envoyer la requête au backend pour le login
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Définir le type de contenu
        },
        body: JSON.stringify({ username, password }), // Envoyer les identifiants
        credentials: 'include', // Indique que les cookies doivent être inclus dans la requête
      });

      if (!response.ok) {
        // Récupérer le message d'erreur du backend
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la connexion.");
      }

      const data = await response.json(); // Récupération de la réponse JSON
      console.log("Données reçues du backend :", data);

      // Redirection vers la page du tableau de bord
      window.location.href = '/tableau';
      
    } catch (error) {
      // Gestion des erreurs
      alert(error.message);
    }
  });
});

e=true;
function passWord() {
  if(e){
    document.getElementById('password').setAttribute('type', "text");
    document.getElementById('pass-icon').src = '/image/eye.png';
    e = false;
  }
  else {
    document.getElementById('password').setAttribute('type', "password");
    document.getElementById('pass-icon').src = '/image/hide.png';
    e = true;
  }
  
}

// Fonction de déconnexion
window.logout = async () => {
  try {
    // Envoyer une requête POST au backend
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include', // Inclure les cookies
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la déconnexion.');
    }

    // Envoyer l'utilisateur vers une page publique
    window.location.href = '/';
  } catch (error) {
    alert('Impossible de se déconnecter.');
  }
};