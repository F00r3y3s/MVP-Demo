import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OrgRouteProvider, useOrgRoute } from '../../context/OrgRouteContext';
import { OrgEntity } from '../../types';
import OrgTopBar from './OrgTopBar';

const ministryOfInterior: OrgEntity = {
  id: 'moi',
  shortName: 'MOI',
  name: 'Ministry of Interior',
  subRole: 'guardian',
  sector: 'Security & Safety',
  emirate: 'Federal',
  mandates: [],
  defaultKpis: [],
  logoSeed: 'MOI',
};

const SelectedEntityHarness: React.FC = () => {
  const { setEntity } = useOrgRoute();

  useEffect(() => {
    setEntity(ministryOfInterior);
  }, [setEntity]);

  return <OrgTopBar />;
};

describe('OrgTopBar', () => {
  it('labels the command center with the selected entity short name', async () => {
    render(
      <OrgRouteProvider>
        <SelectedEntityHarness />
      </OrgRouteProvider>
    );

    expect(await screen.findByText('MOI Command Center')).toBeInTheDocument();
    expect(screen.queryByText('MoEI Command')).not.toBeInTheDocument();
  });
});
