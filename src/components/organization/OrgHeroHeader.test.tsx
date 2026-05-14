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
  it('shows the selected ministry state with entity-specific filters', async () => {
    render(
      <OrgRouteProvider>
        <SelectedEntityHarness />
      </OrgRouteProvider>
    );

    expect((await screen.findAllByText('MOEI')).length).toBeGreaterThan(0);
    expect(screen.getByText('Guardian')).toBeInTheDocument();
    expect(screen.getByText('Ministry of Energy & Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('All Departments')).toBeInTheDocument();
    expect(screen.getByText('20 May 2025')).toBeInTheDocument();
    expect(screen.queryByText('All Emirates')).not.toBeInTheDocument();
    expect(screen.queryByText('All Sectors')).not.toBeInTheDocument();
  });
});
