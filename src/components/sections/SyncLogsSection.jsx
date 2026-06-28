import { Check, AlertCircle } from 'lucide-react';

export function SyncLogsSection({ logs, loading }) {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>Loading sync logs...</div>;
  }

  if (!logs || logs.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#64748b' }}>No sync history</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '24px', paddingBottom: '12px', borderBottom: '3px solid #3b82f6' }}>
        Sync History
      </h2>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Source</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Fetched</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Inserted</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Updated</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Duplicates</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textTransform: 'capitalize' }}>
                    {log.source.replace('_', ' ')}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {log.status === 'success' ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#065f46',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        <Check style={{ width: '16px', height: '16px' }} />
                        Success
                      </span>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#7f1d1d',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        <AlertCircle style={{ width: '16px', height: '16px' }} />
                        Failed
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{log.total_fetched}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{log.total_inserted}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{log.total_updated}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#f59e0b' }}>{log.total_duplicates}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>
                    {new Date(log.started_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}