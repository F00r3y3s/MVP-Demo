import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OrgRouteProvider } from '../../context/OrgRouteContext';
import OrgOnboardingStrategicGoals from './OrgOnboardingStrategicGoals';

const renderScreen = () => {
  render(
    <OrgRouteProvider>
      <OrgOnboardingStrategicGoals onNavigate={vi.fn()} onBack={vi.fn()} />
    </OrgRouteProvider>
  );
};

describe('OrgOnboardingStrategicGoals', () => {
  it('preserves an existing strategic dream when a suggestion is added', async () => {
    renderScreen();

    const dreamInput = screen.getByPlaceholderText('In 10 years, our entity will have…');
    await userEvent.type(dreamInput, 'Cut facility emissions across every site');
    await userEvent.click(screen.getByRole('button', { name: '+ Achieve Net Zero by 2050' }));

    expect(dreamInput).toHaveValue('Cut facility emissions across every site; Achieve Net Zero by 2050');
  });
});
