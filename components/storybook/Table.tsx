import React from 'react';
import { tokens } from '@/lib/tokens';
import { Skeleton } from './Skeleton';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  sortable?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  size?: 'compact' | 'normal' | 'spacious';
  loading?: boolean;
  emptyText?: string;
  className?: string;
  skeleton?: boolean;
  skeletonRows?: number;
}

export function Table<T = any>({
  columns,
  data,
  striped = true,
  bordered = true,
  hoverable = true,
  size = 'normal',
  loading = false,
  emptyText = 'No data available',
  className,
  skeleton = false,
  skeletonRows = 5,
}: TableProps<T>) {
  const rotation = React.useMemo(() => Math.random() * 0.5 - 0.25, []);

  const getContainerStyles = (): React.CSSProperties => {
    return {
      position: 'relative',
      overflow: 'auto',
      border: bordered ? '2px solid var(--border-color, #e5e7eb)' : 'none',
      borderRadius: '8px',
      transform: `rotate(${rotation}deg)`,
      opacity: loading ? 0.6 : 1,
      pointerEvents: loading ? 'none' : 'auto',
      background: 'var(--surface-color, #fafafa)',
    };
  };

  const getTableStyles = (): React.CSSProperties => {
    const fontSize = size === 'compact' ? '0.875rem' : size === 'spacious' ? '1.125rem' : '1rem';
    
    return {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      fontFamily: tokens.typography.fontFamily.sketch,
      fontSize,
    };
  };

  const getCellPadding = () => {
    switch (size) {
      case 'compact': return '0.5rem 0.75rem';
      case 'spacious': return '1rem 1.25rem';
      default: return '0.75rem 1rem';
    }
  };

  const getHeaderCellStyles = (column: TableColumn): React.CSSProperties => {
    const cellRotation = Math.random() * 0.3 - 0.15;
    
    return {
      padding: getCellPadding(),
      textAlign: column.align || 'left',
      borderBottom: '2px solid var(--border-color, #e5e7eb)',
      borderRight: '1px solid var(--border-color, #e5e7eb)',
      fontWeight: 600,
      color: 'var(--text-primary, #1a1a1a)',
      position: 'relative',
      transform: `rotate(${cellRotation}deg)`,
      background: 'var(--surface-color, #fafafa)',
    };
  };

  const getCellStyles = (column: TableColumn): React.CSSProperties => {
    return {
      padding: getCellPadding(),
      textAlign: column.align || 'left',
      borderBottom: '1px solid var(--border-color, #e5e7eb)',
      borderRight: '1px solid var(--border-color, #e5e7eb)',
      color: 'var(--text-primary, #1a1a1a)',
    };
  };

  const getRowStyles = (index: number): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {};
    
    if (striped && index % 2 === 1) {
      baseStyles.background = 'rgba(0, 0, 0, 0.02)';
    }
    
    if (hoverable) {
      baseStyles.transition = 'all 0.2s ease';
    }
    
    return baseStyles;
  };

  const renderSkeletonTable = () => {
    return (
      <div style={getContainerStyles()} className={className}>
        <table style={getTableStyles()}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column.key} style={getHeaderCellStyles(column)}>
                  <Skeleton variant="text" width="80%" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: skeletonRows }, (_, rowIndex) => (
              <tr key={rowIndex} style={getRowStyles(rowIndex)}>
                {columns.map((column) => (
                  <td key={column.key} style={getCellStyles(column)}>
                    <Skeleton variant="text" width={`${70 + Math.random() * 30}%`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (skeleton) {
    return renderSkeletonTable();
  }

  return (
    <div style={getContainerStyles()} className={className}>
      <table style={getTableStyles()}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={getHeaderCellStyles(column)}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  textAlign: 'center',
                  padding: '3rem 2rem',
                  color: 'var(--text-secondary, #6b7280)',
                  fontStyle: 'italic',
                  transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
                }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                style={getRowStyles(index)}
                onMouseEnter={(e) => {
                  if (hoverable) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.transform = 'translateX(1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (hoverable) {
                    e.currentTarget.style.background = striped && index % 2 === 1 ? 'rgba(0, 0, 0, 0.02)' : '';
                    e.currentTarget.style.transform = '';
                  }
                }}
              >
                {columns.map((column) => (
                  <td key={column.key} style={getCellStyles(column)}>
                    {column.render
                      ? column.render((row as any)[column.key], row)
                      : (row as any)[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(250, 250, 250, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      )}
    </div>
  );
}