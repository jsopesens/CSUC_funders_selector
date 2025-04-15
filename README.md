Aquesta carpeta conté una web per provar el funcionament de l'API de ROR.

La programació ha sigut realitzada intentant usar el mínim d'elements possibles. 
Per comprovar el funcionament de l'aplicatiu, s'ha usat Live Server a Visual Studio Code.

Fitxers:
    index.css -------------- estils de la pàgina
    index.html ------------- pàgina per visualitzar el formulari. Consta de la importació de la resta de fitxers i d'un selector d'elements.
    main.js ---------------- consta de les funcions de crida a l'API de ROR i de emplenar el selector.
    most_used_funders.json - consta dels 10 elements més utilitzats pels curadors del CORA.RDR en el camp de funders
    test_ror_micinn.json --- una prova del contingut extret de l'API de ROR usant la url https://api.ror.org/v2/organizations/0472cxd90

La pàgina web utilitza un CDN de la llibreria Select2 per poder escriure dins el camp de selecció. 
El codi de l'script main.js s'adapta a aquesta llibreria, però si es considerés que no és necessari, es podria eliminar.

Per emplenar les opcions del selector, s'usa la llista d'elements del fitxer json.
Per cada element, es fa una crida a l'API pública de ROR.
Cada element disposa de diversos noms. 
    El valor que té com a "types" "ror_display" s'usa per a mostrar a l'usuari.
    La resta de noms (label, acronym, etc) s'usen com a noms alternatius que es poden consultar.
Un cop obtinguda aquesta informació, es formata i s'incorpora al selector.

El resultat, és un selector que permet la cerca d'elements tant "vernacles" com "alternatius". 

Es pot fer un test amb:
    "MICINN" i comprovant que retorna el valor "Ministerio de Ciencia, Innovación y Universidades"
    "Generalitat" i comprovant que retorna "Government of Catalonia"