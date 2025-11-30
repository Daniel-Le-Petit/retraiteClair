import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { trackEvent } from '../utils/tracking';
import styles from './CalculationDetails.module.css';

const CalculationDetails = ({ calculationData, formulaVersion }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!calculationData) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleButton}
        onClick={() => {
          const newExpanded = !isExpanded;
          setIsExpanded(newExpanded);
          
          // Track le clic sur "Voir le détail du calcul"
          if (newExpanded) {
            trackEvent('cta_clicked', {
              cta_name: 'voir_detail_calcul',
              cta_location: 'results_page',
              page: 'resultats',
              action: 'expanded'
            });
          }
        }}
      >
        <Calculator size={18} />
        <span>Voir le détail du calcul</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isExpanded && (
        <div className={styles.details}>
          <div className={styles.section}>
            <h4>1. Calcul du salaire net temps partiel</h4>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Salaire brut temps plein :</div>
              <div className={styles.stepValue}>{formatCurrency(calculationData.salaireBrutTempsPlein || 0)}</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Temps partiel :</div>
              <div className={styles.stepValue}>{calculationData.tempsPartiel || 0}%</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Salaire brut temps partiel :</div>
              <div className={styles.stepValue}>
                {formatCurrency(calculationData.salaireBrutTempsPlein || 0)} × {formatNumber((calculationData.tempsPartiel || 0) / 100)} = {formatCurrency(calculationData.salaireBrutTempsPartiel || 0)}
              </div>
            </div>
            {calculationData.cotisationSur100Pourcent ? (
              <>
                <div className={styles.step}>
                  <div className={styles.stepLabel}>⚠️ Cotisations sur 100% du salaire :</div>
                  <div className={styles.stepValue} style={{ color: '#2563eb', fontWeight: 'bold' }}>Activé</div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepLabel}>Cotisations sur salaire plein :</div>
                  <div className={styles.stepValue}>
                    {formatCurrency(calculationData.salaireBrutTempsPlein || 0)} × 23,02% = {formatCurrency((calculationData.salaireBrutTempsPlein || 0) * 0.2302)}
                  </div>
                </div>
                <div className={styles.stepResult}>
                  <div className={styles.stepLabel}>Salaire net temps partiel :</div>
                  <div className={styles.stepValue}>
                    {formatCurrency(calculationData.salaireBrutTempsPartiel || 0)} - {formatCurrency((calculationData.salaireBrutTempsPlein || 0) * 0.2302)} = <strong>{formatCurrency(calculationData.salaireNetTempsPartiel || 0)}</strong>
                  </div>
                </div>
                
                {/* Comparaison avec/sans cotisation sur 100% */}
                <div className={styles.comparisonBox}>
                  <div className={styles.comparisonTitle}>📊 Comparaison des modes de calcul</div>
                  <div className={styles.comparisonGrid}>
                    <div className={styles.comparisonColumn}>
                      <div className={styles.comparisonHeader} style={{ background: '#dbeafe', color: '#1e40af' }}>
                        Avec cotisation sur 100%
                      </div>
                      <div className={styles.comparisonContent}>
                        <div className={styles.comparisonRow}>
                          <span>Salaire brut temps partiel :</span>
                          <strong>{formatCurrency(calculationData.salaireBrutTempsPartiel || 0)}</strong>
                        </div>
                        <div className={styles.comparisonRow}>
                          <span>Cotisations (sur 100%) :</span>
                          <strong style={{ color: '#dc2626' }}>- {formatCurrency((calculationData.salaireBrutTempsPlein || 0) * 0.2302)}</strong>
                        </div>
                        <div className={styles.comparisonRow} style={{ borderTop: '2px solid #2563eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                          <span><strong>Salaire net :</strong></span>
                          <strong style={{ color: '#2563eb', fontSize: '1.1em' }}>{formatCurrency(calculationData.salaireNetTempsPartiel || 0)}</strong>
                        </div>
                      </div>
                    </div>
                    <div className={styles.comparisonColumn}>
                      <div className={styles.comparisonHeader} style={{ background: '#f3f4f6', color: '#374151' }}>
                        Sans cotisation sur 100%
                      </div>
                      <div className={styles.comparisonContent}>
                        <div className={styles.comparisonRow}>
                          <span>Salaire brut temps partiel :</span>
                          <strong>{formatCurrency(calculationData.salaireBrutTempsPartiel || 0)}</strong>
                        </div>
                        <div className={styles.comparisonRow}>
                          <span>Cotisations (sur temps partiel) :</span>
                          <strong style={{ color: '#dc2626' }}>- {formatCurrency((calculationData.salaireBrutTempsPartiel || 0) * 0.2302)}</strong>
                        </div>
                        <div className={styles.comparisonRow} style={{ borderTop: '2px solid #6b7280', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                          <span><strong>Salaire net :</strong></span>
                          <strong style={{ color: '#6b7280', fontSize: '1.1em' }}>{formatCurrency((calculationData.salaireBrutTempsPartiel || 0) * 0.7698)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.comparisonDifference}>
                    <div className={styles.comparisonDifferenceLabel}>💡 Différence :</div>
                    <div className={styles.comparisonDifferenceValue}>
                      {formatCurrency(calculationData.salaireNetTempsPartiel - ((calculationData.salaireBrutTempsPartiel || 0) * 0.7698))}
                      <span className={styles.comparisonDifferenceNote}>
                        (Vous payez {formatCurrency(((calculationData.salaireBrutTempsPlein || 0) * 0.2302) - ((calculationData.salaireBrutTempsPartiel || 0) * 0.2302))} de cotisations supplémentaires pour maintenir vos droits à la retraite)
                      </span>
                    </div>
                  </div>
                  
                  {/* Explication des avantages et inconvénients */}
                  <div className={styles.explanationBox}>
                    <div className={styles.explanationTitle}>📚 Pourquoi choisir ou ne pas choisir cette option ?</div>
                    
                    <div className={styles.explanationGrid}>
                      <div className={styles.explanationColumn}>
                        <div className={styles.explanationHeader} style={{ background: '#dbeafe', color: '#1e40af' }}>
                          ✅ Avantages (Cotisation sur 100%)
                        </div>
                        <div className={styles.explanationContent}>
                          <div className={styles.explanationItem}>
                            <strong>💰 Pension définitive augmentée</strong>
                            <p>Votre pension à vie peut être augmentée de <strong>150€ à 300€/mois</strong> selon votre situation. Sur 20 ans de retraite, cela représente <strong>36 000€ à 72 000€</strong> supplémentaires.</p>
                          </div>
                          <div className={styles.explanationItem}>
                            <strong>📈 Maintien du niveau de cotisation</strong>
                            <p>Vos trimestres et votre SAM (Salaire Annuel Moyen) continuent d'être calculés sur votre salaire plein, préservant votre niveau de retraite.</p>
                          </div>
                          <div className={styles.explanationItem}>
                            <strong>🔄 Transition progressive</strong>
                            <p>Idéal si vous prévoyez de repasser à temps plein ou si vous voulez maximiser votre retraite future sans perdre vos droits.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.explanationColumn}>
                        <div className={styles.explanationHeader} style={{ background: '#f3f4f6', color: '#374151' }}>
                          ❌ Inconvénients (Cotisation sur 100%)
                        </div>
                        <div className={styles.explanationContent}>
                          <div className={styles.explanationItem}>
                            <strong>💸 Revenu net réduit maintenant</strong>
                            <p>Vous payez des cotisations sur la partie temps plein que vous ne travaillez pas, ce qui réduit votre salaire net mensuel actuel de <strong>{formatCurrency(((calculationData.salaireBrutTempsPlein || 0) * 0.2302) - ((calculationData.salaireBrutTempsPartiel || 0) * 0.2302))}</strong>.</p>
                          </div>
                          <div className={styles.explanationItem}>
                            <strong>📉 Impact sur votre budget</strong>
                            <p>Cette différence peut représenter une baisse significative de vos revenus disponibles immédiats, à prendre en compte dans votre budget mensuel.</p>
                          </div>
                          <div className={styles.explanationItem}>
                            <strong>⏰ Moins intéressant si proche retraite</strong>
                            <p>Si vous partez en retraite définitive dans moins de 5 ans, l'impact sur votre pension sera moindre et peut ne pas compenser la perte de revenus actuels.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.explanationConclusion}>
                      <strong>💡 Notre conseil :</strong>
                      <p>Choisissez cette option si vous avez encore <strong>plusieurs années avant la retraite définitive</strong> et que vous pouvez vous permettre de réduire légèrement vos revenus actuels. C'est un investissement dans votre retraite future qui peut être très rentable sur le long terme.</p>
                      <p>Ne choisissez pas cette option si vous avez <strong>besoin de liquidités immédiates</strong> pour vos projets ou votre quotidien, ou si vous êtes très proche de la retraite définitive.</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.step}>
                  <div className={styles.stepLabel}>Taux de conversion net/brut :</div>
                  <div className={styles.stepValue}>76,98%</div>
                </div>
                <div className={styles.stepResult}>
                  <div className={styles.stepLabel}>Salaire net temps partiel :</div>
                  <div className={styles.stepValue}>
                    {formatCurrency(calculationData.salaireBrutTempsPartiel || 0)} × 0,7698 = <strong>{formatCurrency(calculationData.salaireNetTempsPartiel || 0)}</strong>
                  </div>
                </div>
                
                {/* Info sur l'option cotisation sur 100% */}
                <div className={styles.infoBox}>
                  <div className={styles.infoBoxTitle}>💡 Option disponible : Cotisation sur 100% du salaire</div>
                  <div className={styles.infoBoxContent}>
                    <p>Vous pouvez choisir de payer vos cotisations sur 100% de votre salaire brut (temps plein) même en travaillant à temps partiel.</p>
                    <div className={styles.infoBoxComparison}>
                      <div className={styles.infoBoxRow}>
                        <span><strong>Avec cette option :</strong></span>
                        <span style={{ color: '#2563eb' }}>Salaire net = {formatCurrency(calculationData.salaireBrutTempsPartiel || 0)} - {formatCurrency((calculationData.salaireBrutTempsPlein || 0) * 0.2302)} = {formatCurrency((calculationData.salaireBrutTempsPartiel || 0) - ((calculationData.salaireBrutTempsPlein || 0) * 0.2302))}</span>
                      </div>
                      <div className={styles.infoBoxRow}>
                        <span><strong>Sans cette option :</strong></span>
                        <span style={{ color: '#6b7280' }}>Salaire net = {formatCurrency(calculationData.salaireBrutTempsPartiel || 0)} × 76,98% = {formatCurrency(calculationData.salaireNetTempsPartiel || 0)}</span>
                      </div>
                      <div className={styles.infoBoxRow} style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
                        <span><strong>Différence :</strong></span>
                        <span style={{ color: '#dc2626', fontWeight: 'bold' }}>
                          {formatCurrency(((calculationData.salaireBrutTempsPartiel || 0) - ((calculationData.salaireBrutTempsPlein || 0) * 0.2302)) - (calculationData.salaireNetTempsPartiel || 0))} de moins par mois
                        </span>
                      </div>
                      <div className={styles.infoBoxNote}>
                        <strong>💡 Pourquoi choisir ou ne pas choisir ?</strong>
                        <div style={{ marginTop: '0.5rem' }}>
                          <p><strong>✅ Choisir :</strong> Augmente votre pension définitive de 150€ à 300€/mois à vie. Idéal si vous avez encore plusieurs années avant la retraite et que vous pouvez réduire vos revenus actuels.</p>
                          <p style={{ marginTop: '0.5rem' }}><strong>❌ Ne pas choisir :</strong> Vous gardez plus de revenus nets maintenant. Préférable si vous avez besoin de liquidités ou si vous êtes proche de la retraite définitive.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.section}>
            <h4>2. Calcul de la pension progressive</h4>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Ratio pension/salaire brut :</div>
              <div className={styles.stepValue}>17,33%</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Pension progressive brute :</div>
              <div className={styles.stepValue}>
                {formatCurrency(calculationData.salaireBrutTempsPlein || 0)} × 0,1733 = {formatCurrency(calculationData.pensionProgressiveBrut || 0)}
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Taux de conversion net/brut :</div>
              <div className={styles.stepValue}>76,98%</div>
            </div>
            <div className={styles.stepResult}>
              <div className={styles.stepLabel}>Pension progressive nette :</div>
              <div className={styles.stepValue}>
                {formatCurrency(calculationData.pensionProgressiveBrut || 0)} × 0,7698 = <strong>{formatCurrency(calculationData.pensionProgressiveNet || 0)}</strong>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4>3. Calcul du revenu total net</h4>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Salaire net temps partiel :</div>
              <div className={styles.stepValue}>{formatCurrency(calculationData.salaireNetTempsPartiel || 0)}</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLabel}>Pension progressive nette :</div>
              <div className={styles.stepValue}>{formatCurrency(calculationData.pensionProgressiveNet || 0)}</div>
            </div>
            {calculationData.revenusComplementaires > 0 && (
              <div className={styles.step}>
                <div className={styles.stepLabel}>Revenus complémentaires :</div>
                <div className={styles.stepValue}>{formatCurrency(calculationData.revenusComplementaires || 0)}</div>
              </div>
            )}
            <div className={styles.stepResult}>
              <div className={styles.stepLabel}>Revenu total net :</div>
              <div className={styles.stepValue}>
                <strong>{formatCurrency(calculationData.totalNet || 0)}</strong>
              </div>
            </div>
          </div>

          {calculationData.impactFiscal && (
            <div className={styles.section}>
              <h4>4. Calcul de l'impact fiscal</h4>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Revenu imposable avant RP :</div>
                <div className={styles.stepValue}>{formatCurrency(calculationData.impactFiscal.revenuAvant || 0)}</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Revenu imposable avec RP :</div>
                <div className={styles.stepValue}>{formatCurrency(calculationData.impactFiscal.revenuApres || 0)}</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Tranche d'imposition avant :</div>
                <div className={styles.stepValue}>{calculationData.impactFiscal.trancheAvant || 0}%</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepLabel}>Tranche d'imposition après :</div>
                <div className={styles.stepValue}>{calculationData.impactFiscal.trancheApres || 0}%</div>
              </div>
              <div className={styles.stepResult}>
                <div className={styles.stepLabel}>Économie d'impôts :</div>
                <div className={styles.stepValue}>
                  <strong>{formatCurrency(calculationData.impactFiscal.economie || 0)}/mois</strong>
                </div>
              </div>
            </div>
          )}

          <div className={styles.formulaVersion}>
            <strong>Formule v{formulaVersion}</strong> – {new Date().getFullYear()}/{String(new Date().getMonth() + 1).padStart(2, '0')}
          </div>
        </div>
      )}

      <div className={styles.disclaimer}>
        <strong>⚠️ Résultat indicatif, non contractuel.</strong> Vérifiez avec l'
        <a 
          href="https://www.lassuranceretraite.fr" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.disclaimerLink}
        >
          Assurance Retraite
        </a>
      </div>
    </div>
  );
};

export default CalculationDetails;








