import { AlertCircle } from 'lucide-react';

export function DuplicatesSection({ duplicates, loading }) {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>Loading duplicates...</div>;
  }

  if (!duplicates || duplicates.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#64748b' }}>No duplicates found</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '24px', paddingBottom: '12px', borderBottom: '3px solid #3b82f6' }}>
        Detected Duplicates
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {duplicates.map((dup) => (
          <div key={dup.id} style={{
            background: 'white',
            borderRadius: '12px',
            border: '2px solid #fbbf24',
            boxShadow: '0 4px 12px rgba(251, 191, 36, 0.1)',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(251, 191, 36, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05))',
              borderBottom: '1px solid rgba(251, 191, 36, 0.2)',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <AlertCircle style={{ width: '20px', height: '20px', color: '#f59e0b', flexShrink: 0 }} />
              <p style={{ fontWeight: '700', color: '#92400e', fontSize: '14px' }}>
                {dup.source.toUpperCase()} #{dup.external_id} → {dup.original_source?.toUpperCase()} #{dup.original_external_id}
              </p>
              <span style={{
                marginLeft: 'auto',
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                color: 'white',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}>
                {dup.duplicate_score}% match
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px'
              }}>
                {/* Duplicate Listing */}
                <div>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                    ⚠️ Detected As Duplicate
                  </p>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>
                    {dup.title}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Price</p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                        {dup.price ? `${(dup.price / 1000000).toFixed(2)}M` : 'N/A'} AED
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Area</p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                        {dup.area_sqft || 'N/A'} sqft
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Beds</p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                        {dup.bedrooms || '–'}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Location</p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                        {dup.location_area}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Original Listing */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.02))',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                    ✓ Original Listing (Kept)
                  </p>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>
                    {dup.original_title}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Source</p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', textTransform: 'capitalize' }}>
                        {dup.original_source}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>ID</p>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', fontFamily: 'monospace' }}>
                        {dup.original_external_id}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#065f46',
                    fontWeight: '600'
                  }}>
                    ✓ This listing is kept in the database
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}