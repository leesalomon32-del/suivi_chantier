// ==========================================
// BLOC 1 : LA BOÎTE DE RANGEMENT SÉCURISÉE
// ==========================================

// Cet outil range les données dans le navigateur.
// Si la mémoire est pleine, il prévient s'gentiment au lieu de tout casser !
function rangerDonneeSecurisee(cle, valeur) {
    try {
        localStorage.setItem(cle, valeur);
        return true;
    } catch (erreur) {
        if (erreur.name === 'QuotaExceededError' || erreur.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            alert("🚨 Oh non ! La mémoire de ton navigateur est complètement pleine.\n\nL'image ou le plan que tu essaies de mettre est trop lourd. Essaie avec une image plus petite !");
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
// BLOC 2 : LE COMPRESSEUR DE PHOTOS MAGIQUE
// ==========================================

// Cet outil prend une grande image en texte (Base64) et la rétrécit proprement.
// Il la limite à 900 pixels de large et la compresse pour qu'elle devienne toute légère.
function allégerEtCompresserPhoto(base64Str, largeurMax, callback) {
    let imageTemporaire = new Image();
    imageTemporaire.src = base64Str;
    
    imageTemporaire.onload = function() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        
        let largeur = imageTemporaire.width;
        let hauteur = imageTemporaire.height;
        
        // Si l'image est plus grande que la limite, on calcule sa nouvelle taille en gardant les proportions
        if (largeur > largeurMax) {
            hauteur = hauteur * (largeurMax / largeur);
            largeur = largeurMax;
        }
        
        canvas.width = largeur;
        canvas.height = hauteur;
        
        // On dessine l'image dans le Canvas (notre table de dessin invisible)
        ctx.drawImage(imageTemporaire, 0, 0, largeur, hauteur);
        
        // On transforme le dessin en texte léger (qualité JPEG à 70%)
        let texteImageAlégée = canvas.toDataURL('image/jpeg', 0.7);
        
        // On renvoie l'image toute neuve à celui qui l'a demandée
        callback(texteImageAlégée);
    };
    
    imageTemporaire.onerror = function() {
        console.error("Impossible de lire l'image à compresser.");
    };
}
