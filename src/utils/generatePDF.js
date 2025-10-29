import jsPDF from 'jspdf';

export const generateSimulationPDF = (simulationData) => {
  const doc = new jsPDF();
  
  // Couleurs
  const primaryColor = [0, 102, 204];
  const secondaryColor = [16, 185, 129];
  const grayColor = [107, 114, 128];
  
  // Fonction de formatage personnalisée - format avec espaces insécables
  const formatCurrency = (amount) => {
    const rounded = Math.round(amount);
    const str = rounded.toString();
    // Utiliser des espaces insécables (caractère Unicode \u00A0) qui ne seront pas coupés
    const formatted = str.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    return formatted + '\u00A0€'; // Espace insécable aussi avant le symbole
  };
  
  // Format compact SANS espaces pour éviter absolument les coupures dans jsPDF
  const formatCurrencyCompact = (amount) => {
    const rounded = Math.round(amount);
    // Format simple : chiffres + € sans aucun espace
    return rounded.toString() + '€';
  };
  
  // Fonction pour afficher du texte monospace pour les montants
  const addCurrency = (doc, amount, x, y, options = {}) => {
    // Utiliser le format compact sans espaces pour éviter les coupures
    const formatted = formatCurrencyCompact(amount);
    const fontSize = options.fontSize || doc.internal.getFontSize();
    const align = options.align || 'left';
    const textColor = options.textColor;
    
    // Sauvegarder l'état actuel
    const currentFont = doc.internal.getFont();
    const currentFontSize = doc.internal.getFontSize();
    
    // Sauvegarder la couleur actuelle depuis le contexte interne
    const currentColor = doc.internal.getTextColor();
    
    // Définir la police monospace et la taille
    doc.setFont('courier', 'bold');
    doc.setFontSize(fontSize);
    if (textColor && Array.isArray(textColor) && textColor.length >= 3) {
      doc.setTextColor(...textColor);
    }
    
    doc.text(formatted, x, y, { align });
    
    // Restaurer la police, taille et couleur précédentes
    doc.setFont(currentFont.fontName, currentFont.fontStyle);
    doc.setFontSize(currentFontSize);
    if (currentColor && Array.isArray(currentColor) && currentColor.length >= 3) {
      doc.setTextColor(...currentColor);
    }
  };
  
  let yPosition = 20;
  
  // En-tête
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Rapport de Simulation', 105, 25, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Retraite Progressive', 105, 35, { align: 'center' });
  
  yPosition = 50;
  
  // Date
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })}`, 105, yPosition, { align: 'center' });
  
  yPosition = 65;
  
  // Section 1 : Revenu total net
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Votre revenu total net', 105, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFillColor(...secondaryColor);
  doc.rect(40, yPosition - 8, 130, 20, 'F');
  
  doc.setFontSize(28);
  const totalNet = simulationData?.revenusNets?.total || 0;
  addCurrency(doc, totalNet, 105, yPosition + 8, { 
    align: 'center', 
    fontSize: 28,
    textColor: [255, 255, 255]
  });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('/ mois', 105, yPosition + 15, { align: 'center' });
  
  yPosition += 35;
  
  // Section 2 : Détail des revenus
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Détail de vos revenus', 20, yPosition);
  
  yPosition += 10;
  
  const revenusDetails = [
    {
      label: 'Salaire temps partiel',
      valeur: simulationData?.revenusNets?.tempsPartiel || 0
    },
    {
      label: 'Pension retraite progressive',
      valeur: simulationData?.revenusNets?.pension || 0
    }
  ];
  
  if (simulationData?.revenusNets?.revenusComplementaires > 0) {
    revenusDetails.push({
      label: 'Revenus complémentaires',
      valeur: simulationData.revenusNets.revenusComplementaires
    });
  }
  
  revenusDetails.forEach((item, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Ligne avec fond alterné
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(20, yPosition - 5, 170, 8, 'F');
    }
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(item.label, 25, yPosition);
    
    addCurrency(doc, item.valeur, 190, yPosition, { align: 'right', fontSize: 11 });
    
    yPosition += 10;
  });
  
  yPosition += 5;
  
  // Séparateur
  doc.setDrawColor(229, 231, 235);
  doc.line(20, yPosition, 190, yPosition);
  
  yPosition += 10;
  
  // Total
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total', 25, yPosition);
  addCurrency(doc, totalNet, 190, yPosition, { align: 'right', fontSize: 12 });
  
  yPosition += 15;
  
  // Section 3 : Impact fiscal
  if (simulationData?.impactFiscal && (simulationData.impactFiscal.economie > 0 || simulationData.impactFiscal.economieAnnuelle > 0)) {
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Utiliser economieAnnuelle si disponible, sinon convertir economie (mensuel) en annuel
    const economieAnnuelle = simulationData.impactFiscal.economieAnnuelle || 
                             (simulationData.impactFiscal.economie ? simulationData.impactFiscal.economie * 12 : 0);
    const mensuel = simulationData.impactFiscal.economie || (economieAnnuelle / 12);
    
    // Cadre élargi pour contenir tous les détails
    const cadreHeight = 55; // Hauteur augmentée pour contenir tous les détails
    doc.setFillColor(...secondaryColor);
    doc.rect(20, yPosition - 5, 170, cadreHeight, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Économie fiscale annuelle', 105, yPosition + 5, { align: 'center' });
    
    doc.setFontSize(20);
    addCurrency(doc, economieAnnuelle, 105, yPosition + 16, { align: 'center', fontSize: 20, textColor: [255, 255, 255] });
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const mensuelText = formatCurrencyCompact(mensuel);
    doc.text(`Soit ${mensuelText} par mois`, 105, yPosition + 24, { align: 'center' });
    
    // Ajout des détails : impôt avant et après
    yPosition += 32;
    
    doc.setFontSize(9);
    const impotAvant = (simulationData.impactFiscal.avant || 0) * 12;
    const impotApres = (simulationData.impactFiscal.apres || 0) * 12;
    
    doc.text('Impôt sur le revenu (temps plein)', 30, yPosition);
    addCurrency(doc, impotAvant, 165, yPosition, { align: 'right', fontSize: 9, textColor: [255, 255, 255] });
    
    yPosition += 8;
    doc.text('Impôt sur le revenu (retraite progressive)', 30, yPosition);
    addCurrency(doc, impotApres, 165, yPosition, { align: 'right', fontSize: 9, textColor: [255, 255, 255] });
    
    yPosition += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Économie réalisée', 30, yPosition);
    addCurrency(doc, economieAnnuelle, 165, yPosition, { align: 'right', fontSize: 9, textColor: [255, 255, 255] });
    
    yPosition += 15; // Espace après le cadre
  }
  
  // Section 4 : Comparaison avec temps plein
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Comparaison avec temps plein', 20, yPosition);
  
  yPosition += 10;
  
  const revenusTempsPlein = simulationData?.revenusNets?.tempsPlein || 0;
  const difference = totalNet - revenusTempsPlein;
  const pourcentage = revenusTempsPlein > 0 ? ((difference / revenusTempsPlein) * 100).toFixed(1) : 0;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('Revenus temps plein', 25, yPosition);
  addCurrency(doc, revenusTempsPlein, 190, yPosition, { align: 'right', fontSize: 11 });
  
  yPosition += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('Revenus retraite progressive', 25, yPosition);
  addCurrency(doc, totalNet, 190, yPosition, { align: 'right', fontSize: 11 });
  
  yPosition += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(`Différence (${pourcentage > 0 ? '+' : ''}${pourcentage}%)`, 25, yPosition);
  if (difference >= 0) {
    doc.setTextColor(...secondaryColor);
  } else {
    doc.setTextColor(239, 68, 68);
  }
  addCurrency(doc, difference, 190, yPosition, { align: 'right', fontSize: 11 });
  
  yPosition += 20;
  
  // Section : Clause de décharge de responsabilité
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setDrawColor(229, 231, 235);
  doc.line(20, yPosition, 190, yPosition);
  
  yPosition += 10;
  
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  
  const disclaimerText = [
    'DISCLAIMER : Ce rapport est fourni à titre indicatif uniquement. Les calculs présentés',
    'sont des estimations basées sur les informations fournies et ne constituent pas un',
    'conseil en gestion de patrimoine ou fiscal. En cas d\'erreur, RetraiteClair ne saurait',
    'être tenu responsable. Pour des calculs précis et officiels, consultez le simulateur',
    'M@rel (www.marel.fr), qui est la référence officielle en la matière.'
  ];
  
  disclaimerText.forEach((line) => {
    if (yPosition > 275) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(line, 105, yPosition, { align: 'center' });
    yPosition += 5;
  });
  
  // Pied de page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setTextColor(...grayColor);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'RetraiteClair - Simulateur Retraite Progressive',
      105,
      290,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} / ${pageCount}`,
      105,
      295,
      { align: 'center' }
    );
  }
  
  // Télécharger le PDF
  const fileName = `simulation-retraite-progressive-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

