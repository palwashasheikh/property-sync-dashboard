import { Database, Check, AlertCircle, RefreshCw } from 'lucide-react';

export function StatsCard({ icon: Icon, label, value, subtext }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = '#3b82f6';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = '#e2e8f0';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {label}
          </p>
          <p style={{ fontSize: '40px', fontWeight: '900', color: '#0f172a', marginTop: '12px', lineHeight: '1' }}>
            {value}
          </p>
          {subtext && <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>{subtext}</p>}
        </div>
        <div style={{
          marginLeft: '16px',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
        </div>
      </div>
    </div>
  );
}

export function StatsDashboard({ data, loading }) {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>Loading stats...</div>;
  }

  if (!data) {
    return <div style={{ textAlign: 'center', padding: '48px 0', color: '#ef4444' }}>Failed to load stats</div>;
  }

  const { listings, duplicates, sync, by_source } = data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>Dashboard</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          <StatsCard
            icon={Database}
            label="Total Listings"
            value={listings?.total_listings || 0}
            subtext="All sources combined"
          />
          <StatsCard
            icon={Check}
            label="Unique Listings"
            value={listings?.unique_listings || 0}
            subtext="Non-duplicate only"
          />
          <StatsCard
            icon={AlertCircle}
            label="Duplicates Found"
            value={listings?.duplicate_listings || 0}
            subtext={`${duplicates?.total_pairs || 0} duplicate pairs`}
          />
          <StatsCard
            icon={RefreshCw}
            label="Last Sync"
            value={sync?.last_sync ? new Date(sync.last_sync).toLocaleTimeString() : 'Never'}
            subtext={`${sync?.total_runs || 0} total runs`}
          />
        </div>
      </div>

      {/* By Type */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>By Type</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '14px' }}>For Sale</p>
            <p style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>{listings?.for_sale || 0}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '14px' }}>For Rent</p>
            <p style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>{listings?.for_rent || 0}</p>
          </div>
        </div>
      </div>

      {/* By Source */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>By Source</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {by_source?.map((source) => (
            <div key={source.source} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: '#374151', fontWeight: '600', textTransform: 'capitalize' }}>
                {source.source.replace('_', ' ')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '128px',
                  height: '8px',
                  background: '#e2e8f0',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #3b82f6, #1e40af)',
                    width: `${(source.count / (listings?.unique_listings || 1)) * 100}%`,
                    borderRadius: '999px'
                  }} />
                </div>
                <p style={{ color: '#0f172a', fontWeight: '600', minWidth: '32px', textAlign: 'right' }}>
                  {source.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}