import { useEffect, useState } from 'react';
import { listingsAPI, syncAPI } from './services/api';
import { StatsDashboard } from './components/cards/StatsCard';
import { ListingsTable } from './components/tables/ListingsTable';
import { DuplicatesSection } from './components/sections/DuplicatesSection';
import { SyncLogsSection } from './components/sections/SyncLogsSection';
import './App.css';

function App() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [listingsPagination, setListingsPagination] = useState(null);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [listingsFilters, setListingsFilters] = useState({});
  const [duplicates, setDuplicates] = useState([]);
  const [duplicatesLoading, setDuplicatesLoading] = useState(true);
  const [syncLogs, setSyncLogs] = useState([]);
  const [syncLogsLoading, setSyncLogsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchListings();
  }, [listingsFilters]);

  useEffect(() => {
    fetchDuplicates();
    fetchSyncLogs();
  }, []);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await syncAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error.message);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      setListingsLoading(true);
      const params = { limit: 20, page: 1, ...listingsFilters };
      const response = await listingsAPI.getListings(params);
      setListings(response.data.data || []);
      setListingsPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching listings:', error.message);
    } finally {
      setListingsLoading(false);
    }
  };

  const fetchDuplicates = async () => {
    try {
      setDuplicatesLoading(true);
      const response = await syncAPI.getDuplicates({ limit: 50 });
      setDuplicates(response.data.data || []);
    } catch (error) {
      console.error('Error fetching duplicates:', error.message);
    } finally {
      setDuplicatesLoading(false);
    }
  };

  const fetchSyncLogs = async () => {
    try {
      setSyncLogsLoading(true);
      const response = await syncAPI.getLogs({ limit: 20 });
      setSyncLogs(response.data || []);
    } catch (error) {
      console.error('Error fetching sync logs:', error.message);
    } finally {
      setSyncLogsLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    setListingsFilters(filters);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 24px'
        }}>
          <h1 style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '42px',
            fontWeight: '900',
            letterSpacing: '-1px',
            margin: 0,
            marginBottom: '8px'
          }}>
            Property Sync Dashboard
          </h1>
          <p style={{
            color: '#64748b',
            fontSize: '16px',
            margin: 0
          }}>
            Real estate listings aggregation & deduplication
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        {/* Stats Section */}
        <section style={{ marginBottom: '60px' }}>
          <StatsDashboard data={stats} loading={statsLoading} />
        </section>

        {/* Listings Section */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#0f172a',
              margin: 0,
              paddingBottom: '12px',
              borderBottom: '3px solid #3b82f6'
            }}>
              All Listings
            </h2>
          </div>
          <ListingsTable
            listings={listings}
            pagination={listingsPagination}
            loading={listingsLoading}
            onFilterChange={handleFilterChange}
          />
        </section>

        {/* Duplicates Section */}
        <section style={{ marginBottom: '60px' }}>
          <DuplicatesSection duplicates={duplicates} loading={duplicatesLoading} />
        </section>

        {/* Sync Logs Section */}
        <section style={{ marginBottom: '60px' }}>
          <SyncLogsSection logs={syncLogs} loading={syncLogsLoading} />
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderTop: '1px solid #e2e8f0',
        marginTop: '60px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '24px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0 }}>
            Property Sync Service • Backend syncs every 30 minutes • Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;