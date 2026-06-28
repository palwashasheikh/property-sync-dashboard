import { useState } from 'react';
import { Search } from 'lucide-react';

export function ListingsTable({ listings, pagination, loading, onFilterChange }) {
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    property_type: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '60px 24px',
        textAlign: 'center',
        color: '#94a3b8'
      }}>
        Loading listings...
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Filter Section */}
      <div style={{
        borderBottom: '2px solid #f1f5f9',
        padding: '32px 24px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <Search style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
          <h3 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            Filter Listings
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {/* City Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#475569',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              City
            </label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="e.g., Dubai"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Type Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#475569',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                background: 'white',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          {/* Property Type Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#475569',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Property Type
            </label>
            <select
              name="property_type"
              value={filters.property_type}
              onChange={handleFilterChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                background: 'white',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">All Properties</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Area</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Beds</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Source</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {listings && listings.length > 0 ? (
              listings.map((listing, idx) => (
                <tr key={listing.id} style={{
                  borderBottom: '1px solid #e2e8f0',
                  transition: 'background-color 0.2s',
                  background: idx % 2 === 0 ? '#ffffff' : '#f8fafc'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f4f8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#f8fafc'}
                >
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#0f172a', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.title}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#1e40af',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {listing.listing_type}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    {listing.price ? `${(listing.price / 1000000).toFixed(2)}M` : 'N/A'} {listing.currency}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>{listing.area_sqft || 'N/A'} sqft</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>{listing.bedrooms || '–'}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: '#f1f5f9',
                      color: '#475569',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {listing.source}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>{listing.location_area || listing.location_city}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '48px 24px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                  No listings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div style={{
          borderTop: '1px solid #e2e8f0',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f8fafc'
        }}>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} listings
          </p>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            Page {pagination.page}
          </div>
        </div>
      )}
    </div>
  );
}