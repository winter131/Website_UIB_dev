import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowDownToLine } from 'lucide-react';

const DownloadCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="max-w-sm mx-auto p-6"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #e8722a 0%, #d4621a 100%)',
          borderRadius: '20px',
          padding: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(232, 114, 42, 0.35), 0 4px 16px rgba(0,0,0,0.12)',
          color: 'white',
        }}
      >
        {/* Subtle decorative circle */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              opacity: 0.65,
              marginBottom: '4px',
              fontWeight: 500,
            }}
          >
            Dokumen
          </p>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              lineHeight: 1.1,
            }}
          >
            Downloads
          </h2>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.15)',
            marginBottom: '16px',
          }}
        />

        {/* Accordion */}
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              padding: '4px 0',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.45,
                opacity: 0.92,
                flex: 1,
              }}
            >
              Buku Panduan Beasiswa Kerjasama Khusus Keolahragaan
            </span>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              <ChevronDown size={14} strokeWidth={2.5} />
            </motion.div>
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '14px' }}>
                  <a
                    href="/files/buku-panduan.pdf"
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(6px)',
                      color: 'white',
                      borderRadius: '10px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.2px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')
                    }
                  >
                    <ArrowDownToLine size={15} strokeWidth={2.2} />
                    Download Here
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DownloadCard;
