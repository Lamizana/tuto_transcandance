# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    README.md                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: alamizan <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/04/16 10:32:43 by alamizan          #+#    #+#              #
#    Updated: 2024/04/16 14:34:56 by alamizan         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

1. HTML: permet de creer et structurer du contenu.
- Utilisation de balise qui permettent de decrire le contenu, s'ecrit entre chevrons < >.
- Fichier HTML -> file.html

2. CSS:  permet de faire la mise en forme visuel et dynamique.
Utilisation de proprietes qui permettent d'appliquer du style a des element HTML.
S ecrit entre accolades {  }.
- Fichier CSS -> file.css

----------------------------------------------------------------
OBJECTIFS:
- Maitriser les base de HTML5.
- Faire de la mise en forme avec CSS3.
- Agencer  le contenue des pages.
- Utiliser des fonctionnalitees avancee de HTML et CSS.

----------------------------------------------------------------
OUTILS:
- Fiche récap.
- CodePen.
- Balise Html.
- Propriété CSS.

----------------------------------------------------------------
# 1. Maitriser les bases de HTML5.

### Difference entre HTML et CSS:

- 1979: Le HTML (HyperText Markup language) apparait lors du lancement du Web:
	son role est de gérer et d'organiser du contenu.

- 1996: Invention CSS (Cascading Style Sheets):
	son role est de gérer l'apparence de la page web.
	il a besoin d'une base en HTML pour fonctionner.

- Le role du navigateur web est essentiel:
	il lit le code HTML et CSS  pour afficher un résultat visuel a l'écran.

- Tous les navigateurs embarquent des outils de développement:
	dont l'outil d'inspection qui permet d'accéder au HTML et au CSS d'une page.

### Creation d'une page Web:

- pour créer une page web on crée un fichier "file.html":
	elle peut etre ouvert dans le navigateur web.

- Le langage HTML utilise des balises:
	on les écrit entre chevrons < et >.

- Elles indiquent la nature du texte qu'elles encadrent:
	<title> </title>: "ceci et le titre de la page".

- Il existe 2 types de balises:
	balise en paires (une balise ouvrante et unue balise fermante).
	balise orpheline (une seul balise).

- les balise sont parfois accompagnées d'attributs:
	exemple: <img src="phot.jpg">

- une page web est constitué de 2 sections principales:
	<head> </head>: le contenu n'apparait pas a l'affichage de la page.
	<body> </body>: le corps, apparait a l'affichage de la page.

### Organiser son texte:

- Les paragraphes sont définits par des balise: <p> </p>

- Les sauts de lignes sont définis par une balise orpheline: <br>

- Il existe 6 niveaux de titre: de <h1> </h1> à <h6> </h6>
	à utiliser selon l'importance du titre.

- Ont peut mettre en valeur certains mots avec les balises:
	<strong>, <em>, <mark>.

- Pour créer des listes à puce non-ordonnées: <ul> </ul>
- Pour créer des listes à puce ordonnées: <ol> </ol>
	on insere les éléments avec <li> </li> pour chaque item.

### Créer un lien Hypertexte en HTML:

- Un lien Hypertexte permet de changer de page:
	on peut modifier son style en CSS.

- Lien hypertexte vers un site existant:
	on utilise la balise <a> avec l'attribut href pour indiquer l'adresse de la page cible.
	c'est un lien absolue.
	<a href="https://openclassroom.com">Site openclassroom</a>

- Lien hypertexte vers une autre page de notre site:
	on utilise la balise <a> avec l'attribut href pour indiquer le nom du fichier en local.
	c'est un lien relatif.
	<a href="a-propos.html">A-propos</a>

- Un lien Hypertexte peut aussi permettre d'amener vers un endroit precis d'une page:
	creation d'une ancre avec l'attribut id pour marquer l'endroit de la page.
	faire un lien vers l'ancre: <a href="#ancre">Ancre</a>

- si l'ancre est situe sur une autre page:
	<a href="index.html#ancre">Ancre</a>

### Inserer des images:

- Il existe plusieurs formats d'images adaptés au Web:
	PNG, JPEG,GIFS,...

- On insére les images avec la balise <img>, elle doit etre accompagne de 2 attributs:
	src: cet attribut permet d'indiquer la source de l'image.
	alt: permet de donner a l'image une description alternative.
