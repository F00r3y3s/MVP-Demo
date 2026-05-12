import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RoleSelectionScreen from './RoleSelection';
import { ScreenName } from '../types';

describe('RoleSelectionScreen', () => {
  it('routes organization users into the separate organization command path', async () => {
    const onNavigate = vi.fn();

    render(<RoleSelectionScreen onNavigate={onNavigate} onBack={vi.fn()} />);

    await userEvent.click(screen.getByText('Organization'));
    await userEvent.click(screen.getByText('Government'));

    expect(onNavigate).toHaveBeenCalledWith(ScreenName.ORG_ENTITY_PICKER, {
      role: 'organization',
      subRole: 'guardian',
    });
  });

  it('keeps individual users on the individual signup path', async () => {
    const onNavigate = vi.fn();

    render(<RoleSelectionScreen onNavigate={onNavigate} onBack={vi.fn()} />);

    await userEvent.click(screen.getByText('Individual'));

    expect(onNavigate).toHaveBeenCalledWith(ScreenName.SIGNUP, {
      role: 'individual',
      subRole: 'mentor',
    });
  });
});
