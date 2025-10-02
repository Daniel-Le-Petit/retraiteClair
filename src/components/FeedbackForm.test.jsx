import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedbackForm from './FeedbackForm';

// Mock fetch pour simuler les appels API
global.fetch = jest.fn();

describe('FeedbackForm', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('affiche le formulaire avec tous les champs', () => {
    render(<FeedbackForm />);
    
    expect(screen.getByText('Votre avis nous intéresse')).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer le message/i })).toBeInTheDocument();
  });

  test('affiche les messages d\'aide pour chaque champ', () => {
    render(<FeedbackForm />);
    
    expect(screen.getByText('Reste anonyme si vous préférez')).toBeInTheDocument();
    expect(screen.getByText('Nous ne partagerons jamais votre email')).toBeInTheDocument();
    expect(screen.getByText(/minimum 10 caractères/)).toBeInTheDocument();
  });

  test('valide que l\'email est requis', async () => {
    render(<FeedbackForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    fireEvent.change(messageInput, { target: { value: 'Test message avec plus de 10 caractères' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('L\'adresse email est requise')).toBeInTheDocument();
    });
  });

  test('valide que le message est requis', async () => {
    render(<FeedbackForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Le message est requis')).toBeInTheDocument();
    });
  });

  test('valide la longueur minimale du message', async () => {
    render(<FeedbackForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Court' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Le message doit contenir au moins 10 caractères')).toBeInTheDocument();
    });
  });

  test('valide le format de l\'email', async () => {
    render(<FeedbackForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    fireEvent.change(emailInput, { target: { value: 'email-invalide' } });
    fireEvent.change(messageInput, { target: { value: 'Message de test avec plus de 10 caractères' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Veuillez saisir une adresse email valide')).toBeInTheDocument();
    });
  });

  test('envoie le formulaire avec succès', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' })
    });

    render(<FeedbackForm />);
    
    const nameInput = screen.getByLabelText(/nom/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    fireEvent.change(nameInput, { target: { value: 'Jean Dupont' } });
    fireEvent.change(emailInput, { target: { value: 'jean@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Message de test avec plus de 10 caractères' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Envoi en cours...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.getByText('Message envoyé avec succès ! Merci pour votre retour.')).toBeInTheDocument();
    });
    
    expect(fetch).toHaveBeenCalledWith('https://formspree.io/f/YOUR_FORMSPREE_ID', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'jean@example.com',
        message: 'Message de test avec plus de 10 caractères',
        name: 'Jean Dupont',
        _subject: 'Retour utilisateur - RetraiteClair'
      })
    });
  });

  test('gère les erreurs d\'envoi', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<FeedbackForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Message de test avec plus de 10 caractères' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue lors de l\'envoi du message')).toBeInTheDocument();
    });
  });

  test('gère les erreurs de réponse HTTP', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Server error' })
    });

    render(<FeedbackForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Message de test avec plus de 10 caractères' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  test('efface les erreurs quand l\'utilisateur tape', async () => {
    render(<FeedbackForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    // Déclencher une erreur
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('L\'adresse email est requise')).toBeInTheDocument();
    });
    
    // L'utilisateur commence à taper
    fireEvent.change(emailInput, { target: { value: 'test' } });
    
    await waitFor(() => {
      expect(screen.queryByText('L\'adresse email est requise')).not.toBeInTheDocument();
    });
  });

  test('affiche le compteur de caractères du message', () => {
    render(<FeedbackForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    
    fireEvent.change(messageInput, { target: { value: 'Test' } });
    
    expect(screen.getByText('Minimum 10 caractères (4/10)')).toBeInTheDocument();
  });

  test('affiche les attributs d\'accessibilité corrects', () => {
    render(<FeedbackForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
    
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(messageInput).toHaveAttribute('required');
    expect(messageInput).toHaveAttribute('minLength', '10');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});
