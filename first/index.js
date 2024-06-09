document.getElementById('calculate').addEventListener('click', function() {
    const numAbonnes = parseFloat(document.getElementById('num_abonnes').value);
    const tauxCongestion = parseFloat(document.getElementById('taux_congestion').value) / 100;
    const capaciteIt = parseFloat(document.getElementById('capacite_it').value);
    const porteusesCellule = parseFloat(document.getElementById('porteuses_cellule').value);
    const itsTch = parseFloat(document.getElementById('its_tch').value);
    const erlangsIt = parseFloat(document.getElementById('erlangs_it').value);
    const secteursSite = parseFloat(document.getElementById('secteurs_site').value);
    const augmentationTrafic = parseFloat(document.getElementById('augmentation_trafic').value) / 100;

    if (!isNaN(numAbonnes) && !isNaN(tauxCongestion) && !isNaN(capaciteIt) && !isNaN(porteusesCellule) && !isNaN(itsTch) && !isNaN(erlangsIt) && !isNaN(secteursSite) && !isNaN(augmentationTrafic)) {
        const traficTotal = numAbonnes * tauxCongestion * erlangsIt;
        const traficMaxCellule = itsTch * capaciteIt;
        const nombreCellules = traficTotal / traficMaxCellule;
        const nombreSites = nombreCellules / secteursSite;

        const traficTotalAugmente = traficTotal * (1 + augmentationTrafic);
        const nombreCellulesAugmente = traficTotalAugmente / traficMaxCellule;
        const nombreSitesAugmente = nombreCellulesAugmente / secteursSite;

        document.getElementById('resultat').innerHTML = `
            <p>Trafic total à écouler à l'heure de pointe : ${traficTotal.toFixed(2)} Erlangs</p>
            <p>Trafic maximum par cellule : ${traficMaxCellule.toFixed(2)} Erlangs</p>
            <p>Nombre de cellules nécessaires : ${nombreCellules.toFixed(2)}</p>
            <p>Nombre de sites nécessaires : ${nombreSites.toFixed(2)}</p>
            <p>Trafic total avec augmentation : ${traficTotalAugmente.toFixed(2)} Erlangs</p>
            <p>Nombre de cellules nécessaires avec augmentation : ${nombreCellulesAugmente.toFixed(2)}</p>
            <p>Nombre de sites nécessaires avec augmentation : ${nombreSitesAugmente.toFixed(2)}</p>
        `;
    } else {
        document.getElementById('resultat').innerHTML = `
            <p class="red-text">Veuillez remplir tous les champs.</p>
        `;
    }
});