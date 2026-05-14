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
  it('hides strategic vision suggestions after manual input', async () => {
    renderScreen();

    const dreamInput = screen.getByPlaceholderText('In 10 years, our entity will have…');
    expect(screen.getByRole('button', { name: '+ Achieve Net Zero by 2050' })).toBeInTheDocument();

    await userEvent.type(dreamInput, 'Cut facility emissions across every site');

    expect(dreamInput).toHaveValue('Cut facility emissions across every site');
    expect(screen.queryByRole('button', { name: '+ Achieve Net Zero by 2050' })).not.toBeInTheDocument();
  });

  it('sets a single strategic vision from a suggestion', async () => {
    renderScreen();

    const dreamInput = screen.getByPlaceholderText('In 10 years, our entity will have…');
    await userEvent.click(screen.getByRole('button', { name: '+ Achieve Net Zero by 2050' }));

    expect(dreamInput).toHaveValue('Achieve Net Zero by 2050');
    expect(screen.queryByRole('button', { name: '+ UAE Energy Strategy 2050' })).not.toBeInTheDocument();
  });

  it('shows three rotating impact goal suggestions and hides them at the selection limit', async () => {
    renderScreen();

    expect(screen.getByRole('button', { name: '+ Infrastructure resilience' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+ Renewable energy transition' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+ Employee green upskilling' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '+ ESG-aligned investments' })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '+ Infrastructure resilience' }));

    expect(screen.getByRole('button', { name: '+ Zero-waste operations' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '+ Infrastructure resilience' })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '+ Renewable energy transition' }));

    expect(screen.queryByRole('button', { name: '+ Zero-waste operations' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '+ Employee green upskilling' })).not.toBeInTheDocument();
  });
});
