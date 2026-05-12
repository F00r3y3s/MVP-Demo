import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OrgRouteProvider, useOrgRoute } from '../../context/OrgRouteContext';
import { OrgEntity } from '../../types';
import OrgHeroHeader from './OrgHeroHeader';

const ministryOfEnergy: OrgEntity = {
  id: 'moei',
  shortName: 'MOEI',
  name: 'Ministry of Energy & Infrastructure',
  subRole: 'guardian',
  sector: 'Federal · Energy & Infrastructure',
  emirate: 'Abu Dhabi',
  mandates: [],
  defaultKpis: [],
  logoSeed: 'MOEI',
};

const SelectedEntityHarness: React.FC = () => {
  const { setEntity } = useOrgRoute();

  useEffect(() => {
    setEntity(ministryOfEnergy);
  }, [setEntity]);

  return <OrgHeroHeader />;
};

describe('OrgHeroHeader', () => {
  it('shows the selected ministry mark and Guardian badge', async () => {
    render(
      <OrgRouteProvider>
        <SelectedEntityHarness />
      </OrgRouteProvider>
    );

    expect(await screen.findByText('MOEI')).toBeInTheDocument();
    expect(screen.getByText('Guardian')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ministry of Energy & Infrastructure' })).toBeInTheDocument();
  });
});
