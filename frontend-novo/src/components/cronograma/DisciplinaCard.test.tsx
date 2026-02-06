import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import DisciplinaCard from "./DisciplinaCard";

const mockDisciplina = {
  id: '1',
  nome: 'Matemática',
  tutor: 'Prof. Silva',
  periodo: '1',
  dia_semana: 'SEGUNDA',
  horario_inicio: '19:00',
  horario_fim: '22:00',
  tipo: 'teorica',
  sala: 'Sala 101',
  sem_aula: false,
}

describe('DisciplinaCard', () => {
  it('renders disciplina information', () => {
    render(<DisciplinaCard disciplina={mockDisciplina} onClick={() => {}} />)
    
    expect(screen.getByText('Matemática')).toBeInTheDocument()
    expect(screen.getByText('19:00 - 22:00')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Detalhes da disciplina Matemática')
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn()
    render(<DisciplinaCard disciplina={mockDisciplina} onClick={mockOnClick} />)
    
    const card = screen.getByRole('button')
    card.click()
    
    expect(mockOnClick).toHaveBeenCalled()
  })
})