import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';
import { BarChart3, TrendingUp, Users, Clock, Calculator, MousePointer } from 'lucide-react';
import styles from './AnalyticsDashboard.module.css';

const AnalyticsDashboard = ({ onLogout }) => {
  console.log('📊 [RENDER] AnalyticsDashboard: Component rendering!');
  console.log('📊 [RENDER] Supabase available?', typeof supabase !== 'undefined' && supabase !== null);
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    eventsByType: {},
    calculationsCompleted: 0,
    scenariosSelected: 0,
    avgTimeOnPage: 0,
    uniqueUsers: 0,
    eventsToday: 0,
    recentEvents: []
  });
  const [timeRange, setTimeRange] = useState('7d'); // 1d, 7d, 30d, all

  const loadStats = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);
    try {
      // Calculer la date de début selon la période
      const now = new Date();
      let startDate = new Date();
      
      switch (timeRange) {
        case '1d':
          startDate.setDate(now.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case 'all':
          startDate = new Date(0); // Toutes les dates
          break;
      }

      // Récupérer tous les événements
      console.log('📊 [LOAD] Querying events from Supabase...');
      console.log('📊 [LOAD] Start date:', startDate.toISOString());
      
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      console.log('📊 [LOAD] Query result - events:', events?.length || 0, 'error:', error);

      if (error) {
        console.error('❌ [LOAD] Error loading stats:', error);
        console.error('❌ [LOAD] Error details:', JSON.stringify(error, null, 2));
        setStats(prev => ({
          ...prev,
          error: error.message || 'Erreur lors du chargement des données'
        }));
        setLoading(false);
        return;
      }

      console.log('✅ [LOAD] Events loaded successfully:', events?.length || 0);

      // Calculer les statistiques
      const totalEvents = events.length;
      const eventsByType = {};
      let calculationsCompleted = 0;
      let scenariosSelected = 0;
      let totalTimeOnPage = 0;
      let timeOnPageCount = 0;
      const uniqueUsers = new Set();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let eventsToday = 0;

      events.forEach(event => {
        // Comptage par type
        eventsByType[event.event_name] = (eventsByType[event.event_name] || 0) + 1;
        
        // Utilisateurs uniques
        if (event.user_id) {
          uniqueUsers.add(event.user_id);
        }

        // Événements spécifiques
        if (event.event_name === 'calculation_completed') {
          calculationsCompleted++;
        }
        if (event.event_name === 'scenario_selected') {
          scenariosSelected++;
        }
        if (event.event_name === 'time_on_page' && event.properties?.time_seconds) {
          totalTimeOnPage += event.properties.time_seconds;
          timeOnPageCount++;
        }

        // Événements aujourd'hui
        const eventDate = new Date(event.created_at);
        if (eventDate >= today) {
          eventsToday++;
        }
      });

      const avgTimeOnPage = timeOnPageCount > 0 
        ? Math.round(totalTimeOnPage / timeOnPageCount) 
        : 0;

      setStats({
        totalEvents,
        eventsByType,
        calculationsCompleted,
        scenariosSelected,
        avgTimeOnPage,
        uniqueUsers: uniqueUsers.size,
        eventsToday,
        recentEvents: events.slice(0, 10)
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      // Afficher l'erreur dans l'UI
      setStats(prev => ({
        ...prev,
        error: error.message || 'Erreur lors du chargement des données'
      }));
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    console.log('📊 AnalyticsDashboard: Component mounted/updated');
    console.log('📊 AnalyticsDashboard: supabase available?', !!supabase);
    console.log('📊 AnalyticsDashboard: timeRange', timeRange);
    
    if (supabase) {
      console.log('📊 AnalyticsDashboard: Loading stats...');
      loadStats();
    } else {
      console.warn('⚠️ AnalyticsDashboard: Supabase not available');
      setLoading(false);
    }
  }, [timeRange, loadStats]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!supabase) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>⚠️ Supabase non configuré</h3>
          <p>Le dashboard nécessite Supabase pour fonctionner.</p>
          <p>Vérifiez que les variables d'environnement sont définies dans votre fichier <code>.env</code> :</p>
          <pre style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            REACT_APP_SUPABASE_URL=...{'\n'}
            REACT_APP_SUPABASE_ANON_KEY=...
          </pre>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Chargement des données depuis Supabase...</p>
        </div>
      </div>
    );
  }

  // Trier les événements par type (du plus fréquent au moins fréquent)
  const sortedEvents = Object.entries(stats.eventsByType)
    .sort((a, b) => b[1] - a[1]);

  // Afficher l'erreur si présente
  if (stats.error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>❌ Erreur de chargement</h3>
          <p>{stats.error}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
            Vérifiez :
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Que la table <code>events</code> existe dans Supabase</li>
              <li>Que les politiques RLS sont correctement configurées</li>
              <li>Que votre connexion internet fonctionne</li>
            </ul>
          </p>
          <button
            onClick={() => {
              setLoading(true);
              loadStats();
            }}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {onLogout && (
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          zIndex: 10000 
        }}>
          <button
            onClick={onLogout}
            style={{
              padding: '0.5rem 0.75rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
      <div className={styles.header}>
        <h2 className={styles.title}>📊 Dashboard Analytics</h2>
        <div className={styles.timeRangeSelector}>
          <button 
            className={timeRange === '1d' ? styles.active : ''}
            onClick={() => setTimeRange('1d')}
          >
            24h
          </button>
          <button 
            className={timeRange === '7d' ? styles.active : ''}
            onClick={() => setTimeRange('7d')}
          >
            7 jours
          </button>
          <button 
            className={timeRange === '30d' ? styles.active : ''}
            onClick={() => setTimeRange('30d')}
          >
            30 jours
          </button>
          <button 
            className={timeRange === 'all' ? styles.active : ''}
            onClick={() => setTimeRange('all')}
          >
            Tout
          </button>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <BarChart3 size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{formatNumber(stats.totalEvents)}</div>
            <div className={styles.statLabel}>Événements totaux</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{formatNumber(stats.uniqueUsers)}</div>
            <div className={styles.statLabel}>Utilisateurs uniques</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calculator size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{formatNumber(stats.calculationsCompleted)}</div>
            <div className={styles.statLabel}>Calculs effectués</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MousePointer size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{formatNumber(stats.scenariosSelected)}</div>
            <div className={styles.statLabel}>Scénarios sélectionnés</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{formatNumber(stats.avgTimeOnPage)}s</div>
            <div className={styles.statLabel}>Temps moyen / page</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{formatNumber(stats.eventsToday)}</div>
            <div className={styles.statLabel}>Événements aujourd'hui</div>
          </div>
        </div>
      </div>

      {/* Graphique des événements par type */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Événements par type</h3>
        <div className={styles.eventsChart}>
          {sortedEvents.length > 0 ? (
            sortedEvents.map(([eventName, count]) => {
              const maxCount = Math.max(...Object.values(stats.eventsByType));
              const percentage = (count / maxCount) * 100;
              
              return (
                <div key={eventName} className={styles.eventBar}>
                  <div className={styles.eventBarLabel}>
                    <span className={styles.eventName}>{eventName}</span>
                    <span className={styles.eventCount}>{formatNumber(count)}</span>
                  </div>
                  <div className={styles.eventBarContainer}>
                    <div 
                      className={styles.eventBarFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.noData}>Aucun événement enregistré pour cette période</p>
          )}
        </div>
      </div>

      {/* Événements récents */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Événements récents</h3>
        <div className={styles.recentEvents}>
          {stats.recentEvents.length > 0 ? (
            <table className={styles.eventsTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Événement</th>
                  <th>Utilisateur</th>
                  <th>Page</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{formatDate(event.created_at)}</td>
                    <td>
                      <span className={styles.eventBadge}>{event.event_name}</span>
                    </td>
                    <td className={styles.userId}>
                      {event.user_id ? event.user_id.substring(0, 8) + '...' : '-'}
                    </td>
                    <td className={styles.pageUrl}>
                      {event.page_url ? new URL(event.page_url).pathname : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noData}>Aucun événement récent</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

