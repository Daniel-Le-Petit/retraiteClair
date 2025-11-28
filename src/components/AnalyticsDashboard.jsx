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
    recentEvents: [],
    // Statistiques de l'admin (moi)
    myEvents: 0,
    myCalculationsCompleted: 0,
    myScenariosSelected: 0,
    myEventsToday: 0,
    myUniqueUsers: 0,
    // Statistiques des autres utilisateurs
    otherUsersEvents: 0,
    otherUsersCount: 0,
    otherUsersStats: []
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
        default:
          startDate.setDate(now.getDate() - 7); // Par défaut 7 jours
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

      // Récupérer le user_id de l'utilisateur actuel (admin)
      const currentUserId = localStorage.getItem('retraiteClair_userId');
      console.log('🔍 [STATS] Current user ID:', currentUserId);

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

      // Statistiques pour l'admin (moi)
      let myEvents = 0;
      let myCalculationsCompleted = 0;
      let myScenariosSelected = 0;
      let myEventsToday = 0;
      const myUniqueUsers = new Set();
      if (currentUserId) {
        myUniqueUsers.add(currentUserId);
      }

      events.forEach(event => {
        // Vérifier si l'événement appartient à l'admin
        const isMyEvent = currentUserId && event.user_id === currentUserId;

        // Comptage par type
        eventsByType[event.event_name] = (eventsByType[event.event_name] || 0) + 1;
        
        // Utilisateurs uniques
        if (event.user_id) {
          uniqueUsers.add(event.user_id);
        }

        // Événements spécifiques
        if (event.event_name === 'calculation_completed') {
          calculationsCompleted++;
          if (isMyEvent) myCalculationsCompleted++;
        }
        if (event.event_name === 'scenario_selected') {
          scenariosSelected++;
          if (isMyEvent) myScenariosSelected++;
        }
        if (event.event_name === 'time_on_page' && event.properties?.time_seconds) {
          totalTimeOnPage += event.properties.time_seconds;
          timeOnPageCount++;
        }

        // Événements aujourd'hui
        const eventDate = new Date(event.created_at);
        if (eventDate >= today) {
          eventsToday++;
          if (isMyEvent) myEventsToday++;
        }

        // Comptage des événements de l'admin
        if (isMyEvent) {
          myEvents++;
        }
      });

      const avgTimeOnPage = timeOnPageCount > 0 
        ? Math.round(totalTimeOnPage / timeOnPageCount) 
        : 0;

      // Séparer les événements de l'admin et des autres utilisateurs
      const otherUsersEvents = events.filter(event => !currentUserId || event.user_id !== currentUserId);
      const otherUsersStats = {};
      const otherUsersSet = new Set();
      
      otherUsersEvents.forEach(event => {
        if (event.user_id) {
          otherUsersSet.add(event.user_id);
          if (!otherUsersStats[event.user_id]) {
            // Détecter le type d'appareil depuis user_agent
            const userAgent = event.user_agent || '';
            let deviceType = 'Ordinateur';
            let deviceInfo = userAgent;
            
            if (userAgent.includes('iPhone')) {
              deviceType = 'iPhone';
              deviceInfo = 'iPhone';
            } else if (userAgent.includes('iPad')) {
              deviceType = 'iPad';
              deviceInfo = 'iPad';
            } else if (userAgent.includes('Android')) {
              deviceType = 'Android';
              deviceInfo = 'Android';
            } else if (userAgent.includes('Mobile')) {
              deviceType = 'Mobile';
              deviceInfo = 'Mobile';
            } else if (userAgent.includes('Mac')) {
              deviceType = 'Mac';
              deviceInfo = 'Mac';
            } else if (userAgent.includes('Windows')) {
              deviceType = 'Windows';
              deviceInfo = 'Windows';
            }
            
            otherUsersStats[event.user_id] = {
              userId: event.user_id,
              eventCount: 0,
              events: [],
              deviceType: deviceType,
              deviceInfo: deviceInfo,
              userAgent: userAgent,
              firstSeen: event.created_at,
              lastSeen: event.created_at
            };
          }
          otherUsersStats[event.user_id].eventCount++;
          otherUsersStats[event.user_id].events.push(event);
          // Mettre à jour les dates
          const eventDate = new Date(event.created_at);
          const firstSeenDate = new Date(otherUsersStats[event.user_id].firstSeen);
          const lastSeenDate = new Date(otherUsersStats[event.user_id].lastSeen);
          if (eventDate < firstSeenDate) {
            otherUsersStats[event.user_id].firstSeen = event.created_at;
          }
          if (eventDate > lastSeenDate) {
            otherUsersStats[event.user_id].lastSeen = event.created_at;
          }
        }
      });

      setStats({
        totalEvents,
        eventsByType,
        calculationsCompleted,
        scenariosSelected,
        avgTimeOnPage,
        uniqueUsers: uniqueUsers.size,
        eventsToday,
        recentEvents: events.slice(0, 10),
        // Statistiques de l'admin
        myEvents,
        myCalculationsCompleted,
        myScenariosSelected,
        myEventsToday,
        myUniqueUsers: myUniqueUsers.size,
        // Statistiques des autres utilisateurs
        otherUsersEvents: otherUsersEvents.length,
        otherUsersCount: otherUsersSet.size,
        otherUsersStats: Object.values(otherUsersStats)
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
            <div className={styles.statValue}>
              {formatNumber(stats.totalEvents)}
              {stats.myEvents > 0 && (
                <span style={{ fontSize: '0.7em', color: '#64748b', marginLeft: '0.5rem' }}>
                  (dont {formatNumber(stats.myEvents)} <span style={{ color: '#3b82f6' }}>[moi]</span>)
                </span>
              )}
            </div>
            <div className={styles.statLabel}>Événements totaux</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {formatNumber(stats.uniqueUsers)}
              {stats.myUniqueUsers > 0 && (
                <span style={{ fontSize: '0.7em', color: '#64748b', marginLeft: '0.5rem' }}>
                  (dont {formatNumber(stats.myUniqueUsers)} <span style={{ color: '#3b82f6' }}>[moi]</span>)
                </span>
              )}
            </div>
            <div className={styles.statLabel}>Utilisateurs uniques</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calculator size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {formatNumber(stats.calculationsCompleted)}
              {stats.myCalculationsCompleted > 0 && (
                <span style={{ fontSize: '0.7em', color: '#64748b', marginLeft: '0.5rem' }}>
                  (dont {formatNumber(stats.myCalculationsCompleted)} <span style={{ color: '#3b82f6' }}>[moi]</span>)
                </span>
              )}
            </div>
            <div className={styles.statLabel}>Calculs effectués</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MousePointer size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {formatNumber(stats.scenariosSelected)}
              {stats.myScenariosSelected > 0 && (
                <span style={{ fontSize: '0.7em', color: '#64748b', marginLeft: '0.5rem' }}>
                  (dont {formatNumber(stats.myScenariosSelected)} <span style={{ color: '#3b82f6' }}>[moi]</span>)
                </span>
              )}
            </div>
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
            <div className={styles.statValue}>
              {formatNumber(stats.eventsToday)}
              {stats.myEventsToday > 0 && (
                <span style={{ fontSize: '0.7em', color: '#64748b', marginLeft: '0.5rem' }}>
                  (dont {formatNumber(stats.myEventsToday)} <span style={{ color: '#3b82f6' }}>[moi]</span>)
                </span>
              )}
            </div>
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

      {/* Identifiant de l'appareil actuel */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🔍 Identifiant de cet appareil</h3>
        <div style={{ 
          background: '#f0fdf4', 
          border: '1px solid #10b981', 
          borderRadius: '8px', 
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#1e3a8a' }}>Votre identifiant actuel :</strong>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '0.75rem', 
            borderRadius: '6px', 
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: '#1e3a8a',
            border: '1px solid #d1d5db',
            wordBreak: 'break-all'
          }}>
            {localStorage.getItem('retraiteClair_userId') || 'Non défini'}
          </div>
          <div style={{ 
            marginTop: '0.75rem', 
            fontSize: '0.85rem', 
            color: '#64748b' 
          }}>
            📱 Type d'appareil : <strong>{navigator.userAgent.includes('iPhone') ? 'iPhone' : navigator.userAgent.includes('iPad') ? 'iPad' : navigator.userAgent.includes('Android') ? 'Android' : 'Ordinateur'}</strong>
          </div>
          <div style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.8rem', 
            color: '#9ca3af',
            fontStyle: 'italic'
          }}>
            Utilisez cet identifiant pour comparer avec les autres utilisateurs ci-dessous
          </div>
        </div>
      </div>

      {/* Événements des autres utilisateurs */}
      {stats.otherUsersCount > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            👥 Événements des autres utilisateurs ({stats.otherUsersCount} utilisateur{stats.otherUsersCount > 1 ? 's' : ''})
          </h3>
          <div style={{ 
            background: '#e0f2fe', 
            border: '1px solid #3b82f6', 
            borderRadius: '8px', 
            padding: '0.75rem 1rem', 
            marginBottom: '1rem',
            fontSize: '0.85rem',
            color: '#1e40af'
          }}>
            <strong>💡 Note :</strong> Chaque appareil (ordinateur, iPhone, iPad, etc.) a un identifiant unique. 
            Si vous utilisez plusieurs appareils, ils apparaîtront comme des "autres utilisateurs". 
            Comparez l'identifiant ci-dessus avec ceux ci-dessous pour identifier vos propres connexions.
          </div>
          <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {stats.otherUsersEvents} événement{stats.otherUsersEvents > 1 ? 's' : ''} effectué{stats.otherUsersEvents > 1 ? 's' : ''} par {stats.otherUsersCount} autre{stats.otherUsersCount > 1 ? 's' : ''} utilisateur{stats.otherUsersCount > 1 ? 's' : ''}
          </p>
          <div className={styles.recentEvents}>
            {stats.otherUsersStats && stats.otherUsersStats.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {stats.otherUsersStats.map((userStat, index) => {
                  const currentUserId = localStorage.getItem('retraiteClair_userId');
                  const isMyUser = currentUserId && userStat.userId === currentUserId;
                  
                  // Identifiants spécifiques
                  const isDanielsIPhone = userStat.userId === 'user_1764256139514_50smhm7zr';
                  const isProfessionalLaptop = userStat.userId === 'user_1764334474809_zwds2mv79';
                  
                  let displayName = 'Utilisateur';
                  if (isDanielsIPhone) {
                    displayName = 'iPhone-Daniel';
                  } else if (isProfessionalLaptop) {
                    displayName = 'Professional_Laptop';
                  }
                  
                  return (
                    <div key={userStat.userId || index} style={{
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <strong style={{ color: '#1e3a8a' }}>
                              {displayName}
                            </strong>
                            {isMyUser && (
                              <span style={{ 
                                background: '#3b82f6',
                                color: 'white',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                [CET APPAREIL]
                              </span>
                            )}
                            {isDanielsIPhone && (
                              <span style={{ 
                                background: '#10b981',
                                color: 'white',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                [Votre iPhone]
                              </span>
                            )}
                            {isProfessionalLaptop && (
                              <span style={{ 
                                background: '#3b82f6',
                                color: 'white',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                [Votre Laptop]
                              </span>
                            )}
                            {!isMyUser && !isDanielsIPhone && !isProfessionalLaptop && userStat.deviceType === 'iPhone' && (
                              <span style={{ 
                                background: '#f59e0b',
                                color: 'white',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                [Peut-être votre iPhone ?]
                              </span>
                            )}
                          </div>
                          <div style={{ 
                            background: '#f8f9fa', 
                            padding: '0.5rem', 
                            borderRadius: '6px', 
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            color: '#1e3a8a',
                            border: '1px solid #e5e7eb',
                            wordBreak: 'break-all',
                            marginBottom: '0.5rem'
                          }}>
                            {userStat.userId}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <div>
                              📱 <strong>{userStat.deviceType || 'Appareil inconnu'}</strong>
                            </div>
                            {userStat.firstSeen && (
                              <div>
                                🕐 Première connexion : <strong>{formatDate(userStat.firstSeen)}</strong>
                              </div>
                            )}
                            {userStat.lastSeen && (
                              <div>
                                🕐 Dernière connexion : <strong>{formatDate(userStat.lastSeen)}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                        <span style={{ 
                          background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: '600'
                        }}>
                          {userStat.eventCount} événement{userStat.eventCount > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Derniers événements :</strong>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {userStat.events.slice(0, 5).map((event, eventIndex) => (
                            <div key={eventIndex} style={{ 
                              display: 'flex', 
                              gap: '1rem',
                              padding: '0.25rem 0',
                              borderBottom: eventIndex < Math.min(4, userStat.events.length - 1) ? '1px solid #e5e7eb' : 'none'
                            }}>
                              <span style={{ minWidth: '80px', color: '#9ca3af' }}>
                                {formatDate(event.created_at)}
                              </span>
                              <span style={{ 
                                background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                                color: 'white',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                {event.event_name}
                              </span>
                              {event.page_url && (
                                <span style={{ color: '#3b82f6', fontSize: '0.75rem' }}>
                                  {new URL(event.page_url).pathname}
                                </span>
                              )}
                            </div>
                          ))}
                          {userStat.events.length > 5 && (
                            <div style={{ 
                              marginTop: '0.5rem', 
                              fontSize: '0.8rem', 
                              color: '#9ca3af',
                              fontStyle: 'italic'
                            }}>
                              ... et {userStat.events.length - 5} autre{userStat.events.length - 5 > 1 ? 's' : ''} événement{userStat.events.length - 5 > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={styles.noData}>Aucun événement d'autres utilisateurs</p>
            )}
          </div>
        </div>
      )}

      {/* Événements récents */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Événements récents (tous utilisateurs)</h3>
        <div className={styles.recentEvents}>
          {stats.recentEvents.length > 0 ? (
            <table className={styles.eventsTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Événement</th>
                  <th>Page</th>
                  <th>Utilisateur</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEvents.map((event) => {
                  const currentUserId = localStorage.getItem('retraiteClair_userId');
                  const isMyEvent = currentUserId && event.user_id === currentUserId;
                  
                  return (
                    <tr key={event.id}>
                      <td>{formatDate(event.created_at)}</td>
                      <td>
                        <span className={styles.eventBadge}>{event.event_name}</span>
                      </td>
                      <td className={styles.pageUrl}>
                        {event.page_url ? new URL(event.page_url).pathname : '-'}
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {isMyEvent ? (
                          <span style={{ color: '#3b82f6', fontWeight: '600' }}>[moi]</span>
                        ) : (
                          <span style={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                            {event.user_id ? event.user_id.substring(0, 8) + '...' : '-'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
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

