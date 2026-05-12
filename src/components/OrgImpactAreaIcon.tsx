import React from 'react';
import { motion } from 'framer-motion';

export type OrgImpactAreaKey =
  | 'climate'
  | 'energy'
  | 'water'
  | 'waste'
  | 'governance'
  | 'social'
  | 'supply-chain'
  | 'biodiversity';

interface IconPath {
  d: string;
}

const ICONS: Record<OrgImpactAreaKey, { paths: IconPath[]; viewBox?: string }> = {
  climate: {
    paths: [
      { d: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z' },
      { d: 'M12 6v1m0 10v1M6 12H5m14 0h-1' },
      { d: 'M8.5 8.5l-.7-.7M15.5 15.5l-.7-.7M15.5 8.5l.7-.7M8.5 15.5l.7-.7' },
      { d: 'M12 9a3 3 0 1 0 3 3A3 3 0 0 0 12 9z' },
    ],
  },
  energy: {
    paths: [
      { d: 'M13 2L4.09 12.96A1 1 0 0 0 5 14.5h5.5L11 22l8.91-10.96A1 1 0 0 0 19 9.5h-5.5z' },
    ],
  },
  water: {
    paths: [
      { d: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z' },
    ],
  },
  waste: {
    paths: [
      { d: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6' },
      { d: 'M10 11v6M14 11v6' },
    ],
  },
  governance: {
    paths: [
      { d: 'M12 2l10 7H2z' },
      { d: 'M4 9v13h16V9' },
      { d: 'M9 22V12h6v10' },
    ],
  },
  social: {
    paths: [
      { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
      { d: 'M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0' },
      { d: 'M23 21v-2a4 4 0 0 0-3-3.87' },
      { d: 'M16 3.13a4 4 0 0 1 0 7.75' },
    ],
  },
  'supply-chain': {
    paths: [
      { d: 'M18 8h1a4 4 0 0 1 0 8h-1' },
      { d: 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' },
      { d: 'M6 1v3M10 1v3M14 1v3' },
    ],
  },
  biodiversity: {
    paths: [
      { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    ],
  },
};

interface Props {
  iconKey: OrgImpactAreaKey;
  selected?: boolean;
  color?: string;
  size?: number;
}

const OrgImpactAreaIcon: React.FC<Props> = ({ iconKey, selected = false, color, size = 28 }) => {
  const icon = ICONS[iconKey] ?? ICONS.climate;
  const strokeColor = color ?? (selected ? '#fff' : 'var(--forest-light)');

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {icon.paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        />
      ))}
    </motion.svg>
  );
};

export default OrgImpactAreaIcon;
