// ==========================================
// CONNECTEUR MASTER CLOUD SUPABASE
// ==========================================
// Vos identifiants uniques de connexion Supabase
const SUPABASE_URL = "https://mpejsdcxkumzolodbhdi.supabase.co";
// Remplissez cette variable avec votre clé récupérée dans l'onglet API Keys de Supabase
const SUPABASE_KEY = "sb_publishable_sgaqDZKA5v6LT128Pvon9w_HnziORIq";

if (typeof supabase !== 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("🔌 Connecteur Supabase Master actif !");
} else {
    console.error("❌ Erreur : La bibliothèque Supabase n'est pas chargée.");
}

// ==========================================
// BLOC 1 : LA BOÎTE DE RANGEMENT SÉCURISÉE
// ==========================================
// Cet outil range les données dans le navigateur.
// Si la mémoire est pleine, il prévient gentiment au lieu de tout casser !
function rangerDonneeSecurisee(cle, valeur) {
 try {
 localStorage.setItem(cle, valeur);
 return true;
 } catch (erreur) {
 if (erreur.name === 'QuotaExceededError' || erreur.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
 alert(" Oh non ! La mémoire de ton navigateur est complètement 🚨 pleine.\n\nL'image ou le plan que tu essaies de mettre est trop lourd. Essaie avec une image plus petite !");
 } else {
 console.error("Erreur bizarre de rangement :", erreur);
 }
 return false;
 }
}

// Cet outil fabrique un numéro de carte d'identité unique au monde pour chaque projet.
// Même si on crée 100 lignes d'un coup, elles auront toutes un numéro différent !
function fabriquerIdentifiantUnique() {
 return Date.now() + "_" + Math.floor(Math.random() * 1000000);
}
// ==========================================
// BLOC 2 : LE COMPRESSEUR DE PHOTOS UNIVERSEL (CORRIGÉ JPG/PNG)
// ==========================================
function allégerEtCompresserPhoto(base64Str, largeurMax, callback) {
 let imageTemporaire = new Image();
 imageTemporaire.src = base64Str;
 
 imageTemporaire.onload = function() {
   let canvas = document.createElement('canvas');
   let ctx = canvas.getContext('2d');
   
   let largeur = imageTemporaire.width;
   let hauteur = imageTemporaire.height;
   
   // Garde les proportions d'origine de la photo de chantier
   if (largeur > largeurMax) {
     hauteur = hauteur * (largeurMax / largeur);
     largeur = largeurMax;
   }
   
   canvas.width = largeur;
   canvas.height = hauteur;
   
   // Dessin de sécurité de la photo
   ctx.drawImage(imageTemporaire, 0, 0, largeur, hauteur);
   
   // CONVERSION UNIVERSELLE : Transforme n'importe quel format (PNG/JPG) 
   // en un fichier JPEG ultra-léger compressé à 70% pour le Cloud
   let texteImageAlégée = canvas.toDataURL('image/jpeg', 0.7);
   
   // Renvoie la photo propre au système
   callback(texteImageAlégée);
 };
 
 imageTemporaire.onerror = function() {
   console.error("Impossible de lire ou de compresser ce format d'image.");
   alert("⚠️ Format d'image non supporté ou corrompu. Réessayez avec une autre photo.");
 };
}

